#!/usr/bin/env node
/**
 * SKPORT wiki snapshot -> inspectable, structured operator export.
 * Offline by design: accepts a saved PUBLIC wiki item/info JSON response.
 * Never uses cookies, player credentials or undocumented signing workarounds.
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";

export const TYPHOEUS = {
  operator: "typhoeus",
  itemId: "1173",
  skillWidgetId: "1SuOqtCW",
  expectedTabs: [
    { tabId: "gIuAIUyt", linkedId: "ENfCCHbD", name: "Wildlands Huntress" },
    { tabId: "0ctR1S1J", linkedId: "fD8zxhWN", name: "Piercing Arrows of the Woods" },
    { tabId: "CqJxefHj", linkedId: "1G405tY0", name: "Rampant Thorns" },
    { tabId: "tVlf3UYx", linkedId: "mDY9OqqE", name: "Call of Ice Mountain" },
  ],
};

const isObject = value => value !== null && typeof value === "object" && !Array.isArray(value);
const string = value => typeof value === "string" ? value : value == null ? "" : String(value);

function findMap(value, key) {
  const seen = new Set();
  const queue = [value];
  while (queue.length) {
    const current = queue.shift();
    if (!isObject(current) || seen.has(current)) continue;
    seen.add(current);
    if (isObject(current[key])) return current[key];
    if (seen.size > 5000) break;
    for (const [k, child] of Object.entries(current)) {
      if (k === key) continue;
      if (isObject(child)) queue.push(child);
      else if (Array.isArray(child)) queue.push(...child.filter(isObject).slice(0, 100));
    }
  }
  return null;
}

function getInlineElements(value) {
  if (Array.isArray(value?.inlineElements)) return value.inlineElements;
  if (Array.isArray(value?.text?.inlineElements)) return value.text.inlineElements;
  if (Array.isArray(value?.paragraph?.inlineElements)) return value.paragraph.inlineElements;
  return [];
}

function entryReference(element) {
  const entry = element?.entry;
  if (!isObject(entry)) return null;
  const id = entry.id ?? entry.itemId ?? entry.entryId;
  if (id === undefined || id === null) return null;
  return { id: string(id), count: entry.count ?? null };
}

function inlineText(elements) {
  const out = [];
  const entries = [];
  for (const element of elements) {
    const item = element?.text;
    if (typeof item === "string") out.push(item);
    else if (typeof item?.text === "string") out.push(item.text);
    const reference = entryReference(element);
    if (reference) {
      entries.push(reference);
      out.push("[item:" + reference.id + (reference.count == null ? "" : " x" + reference.count) + "]");
    }
  }
  return { text: out.join("").trim(), entries };
}

function readBlock(block, blockMap, seen = new Set()) {
  if (!isObject(block)) return { text: "", entries: [] };
  const parts = [];
  const entries = [];
  const elements = getInlineElements(block);
  if (elements.length) {
    const r = inlineText(elements);
    if (r.text) parts.push(r.text);
    entries.push(...r.entries);
  } else if (typeof block.text === "string") {
    parts.push(block.text);
  } else if (typeof block.text?.text === "string") {
    parts.push(block.text.text);
  }
  const ids = block.childIds ?? block.text?.childIds ?? [];
  if (Array.isArray(ids)) {
    for (const id of ids) {
      if (seen.has(string(id))) continue;
      seen.add(string(id));
      const child = readBlock(blockMap?.[string(id)], blockMap, seen);
      if (child.text) parts.push(child.text);
      entries.push(...child.entries);
    }
  }
  return { text: parts.join("\n").trim(), entries };
}

function readCell(cell, blockMap) {
  if (!isObject(cell)) return { text: typeof cell === "string" ? cell : "", entries: [] };
  const result = readBlock(cell, blockMap);
  if (result.text) return result;
  if (isObject(cell.content)) return readBlock(cell.content, blockMap);
  return result;
}

function resolveCell(cellMap, rowId, colId) {
  // SKPORT documents are known to use row_column keys; nested maps supported
  // for diagnostics if the source format changes.
  return cellMap?.[string(rowId) + "_" + string(colId)] ??
    cellMap?.[string(rowId)]?.[string(colId)] ??
    null;
}

export function extractTable(table, blockMap) {
  const rowIds = Array.isArray(table?.rowIds) ? table.rowIds : [];
  const columnIds = Array.isArray(table?.columnIds) ? table.columnIds : [];
  const cellMap = table?.cellMap ?? {};
  const rows = rowIds.map(rowId => {
    const cells = columnIds.map(colId => readCell(resolveCell(cellMap, rowId, colId), blockMap));
    return { rowId: string(rowId), cells: cells.map(c => c.text), entries: cells.map(c => c.entries) };
  });
  return {
    columnIds: columnIds.map(string),
    columns: rows.length ? rows[0].cells : [],
    // Keep the raw row IDs and all cells; header inference is NOT assumed.
    rows,
  };
}

export function extractDocument(documentId, rawDoc) {
  const document = rawDoc?.document ?? rawDoc;
  const blockMap = document?.blockMap ?? {};
  const ids = Array.isArray(document?.blockIds) ? document.blockIds : Object.keys(blockMap);
  const sections = [];
  for (const id of ids) {
    const block = blockMap[string(id)];
    if (!isObject(block)) continue;
    const table = block.table ?? block.tableBlock?.table;
    if (isObject(table)) {
      sections.push({ kind: "table", blockId: string(id), table: extractTable(table, blockMap) });
    } else {
      const r = readBlock(block, blockMap);
      if (r.text) sections.push({ kind: "text", blockId: string(id), text: r.text, entries: r.entries });
    }
  }
  return { documentId: string(documentId), sections };
}

function findDocumentRefs(value, availableKeys) {
  const result = new Set();
  const seen = new Set();
  function visit(node, depth = 0) {
    if (depth > 16 || node == null) return;
    if (typeof node === "string" || typeof node === "number") {
      const value = string(node);
      if (availableKeys.has(value)) result.add(value);
      return;
    }
    if (typeof node !== "object" || seen.has(node)) return;
    seen.add(node);
    if (Array.isArray(node)) {
      node.forEach(child => visit(child, depth + 1));
    } else {
      Object.entries(node).forEach(([key, child]) => {
        if (availableKeys.has(key)) result.add(key);
        visit(child, depth + 1);
      });
    }
  }
  visit(value);
  return [...result];
}

function tabIdOf(tab) {
  return string(typeof tab === "string" ? tab : tab?.tabId ?? tab?.id ?? tab?.key ?? "");
}

export function inspectSkport(raw, sourceBytes = "") {
  const documents = findMap(raw, "documentMap");
  const widgets = findMap(raw, "widgetCommonMap");
  const issues = [];
  if (!documents) issues.push("documentMap fehlt: SKPORT-Antwort oder Wrapper prüfen.");
  if (!widgets) issues.push("widgetCommonMap fehlt: SKPORT-Antwort oder Wrapper prüfen.");
  const skillWidget = widgets?.[TYPHOEUS.skillWidgetId];
  if (!skillWidget) issues.push("Skill-Widget " + TYPHOEUS.skillWidgetId + " fehlt.");
  const tabsList = skillWidget?.tabList ?? skillWidget?.tabs ?? [];
  const tabDataMap = skillWidget?.tabDataMap ?? {};
  const listedIds = Array.isArray(tabsList) ? tabsList.map(tabIdOf).filter(Boolean) : [];
  const tabIds = [...new Set([...listedIds, ...Object.keys(tabDataMap)])];
  const availableKeys = new Set(Object.keys(documents ?? {}));
  const usedDocs = new Map();
  const skills = tabIds.map((tabId, i) => {
    const tab = tabDataMap[tabId] ?? {};
    const intro = tab.intro ?? {};
    const expected = TYPHOEUS.expectedTabs.find(t => t.tabId === tabId);
    const name = intro.name ?? (typeof tab.name === "string" ? tab.name : "");
    const references = findDocumentRefs(tab.content ?? tab, availableKeys);
    if (expected && availableKeys.has(expected.linkedId) && !references.includes(expected.linkedId)) {
      // The second known ID is only a diagnostic hint, never force-attach it.
      issues.push("Tab " + tabId + ": bekannte Referenz " + expected.linkedId + " liegt in documentMap, aber nicht in diesem Tab verknüpft.");
    }
    if (!references.length) issues.push("Tab " + tabId + ": keine eindeutig zugeordneten Dokumente.");
    for (const id of references) {
      const owners = usedDocs.get(id) ?? [];
      owners.push(tabId);
      usedDocs.set(id, owners);
    }
    const extracted = references.map(id => extractDocument(id, documents[id]));
    const tables = extracted.flatMap(doc => doc.sections.filter(s => s.kind === "table").map(s => ({
      documentId: doc.documentId, blockId: s.blockId, ...s.table
    })));
    if (tables.length === 0) issues.push("Tab " + tabId + ": keine auswertbare Tabelle.");
    if (!name) issues.push("Tab " + tabId + ": Skillname fehlt in intro.name.");
    return {
      tabId, name: string(name), type: string(intro.type?.value ?? intro.type?.key ?? intro.type),
      iconUrl: string(intro.imgUrl ?? intro.iconUrl),
      animation: string(intro.animation ?? intro.animationUrl ?? tab.animation),
      introduction: typeof intro.description === "string" ? intro.description : "",
      descriptionSections: extracted.flatMap(d => d.sections.filter(s => s.kind === "text")
        .map(section => ({ documentId: d.documentId, text: section.text, entries: section.entries }))),
      documentIds: references, tables,
      expectedName: expected?.name ?? null,
      expectedTab: Boolean(expected)
    };
  });
  if (skills.length !== 4) issues.push("Erwartet: 4 Skills; gefunden: " + skills.length + ".");
  for (const [id, owners] of usedDocs.entries()) {
    if (owners.length > 1) issues.push("Dokument " + id + " mehreren Skills zugeordnet: " + owners.join(", "));
  }
  const knownIds = new Set(TYPHOEUS.expectedTabs.map(s => s.tabId));
  for (const id of knownIds) if (!tabIds.includes(id)) issues.push("Bekannter Typhoeus-Skill-Tab fehlt: " + id);
  for (const skill of skills) {
    if (skill.expectedName && skill.name && skill.name.trim().toLowerCase() !== skill.expectedName.toLowerCase()) {
      issues.push("Skillname bei " + skill.tabId + " abweichend: " + skill.name);
    }
  }
  const sha256 = sourceBytes ? createHash("sha256").update(sourceBytes).digest("hex") : null;
  return {
    schemaVersion: 1,
    source: { provider: "skport-wiki", itemId: TYPHOEUS.itemId,
      endpoint: "/web/v1/wiki/item/info?id=" + TYPHOEUS.itemId, sha256 },
    operator: TYPHOEUS.operator,
    status: issues.length ? "needs-review" : "validated-structure",
    diagnostics: {
      widgetCount: Object.keys(widgets ?? {}).length,
      documentCount: Object.keys(documents ?? {}).length,
      skillTabCount: tabIds.length,
      issues,
    },
    skills,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const arg = flag => args[args.indexOf(flag) + 1];
  const input = args.includes("--input") ? arg("--input") : null;
  const report = args.includes("--report") ? arg("--report") : null;
  const output = args.includes("--out") ? arg("--out") : null;
  if (!input) {
    console.error("Nutzung: node scripts/endfield/skport-extract.mjs --input path/to/item-info.json [--report path/to/report.json] [--out path/to/typhoeus.json]");
    process.exitCode = 1;
    return;
  }
  const rawBytes = await readFile(resolve(input));
  const result = inspectSkport(JSON.parse(rawBytes.toString("utf8")), rawBytes);
  console.log(JSON.stringify({
    source: result.source, status: result.status, diagnostics: result.diagnostics,
    skills: result.skills.map(s => ({
      tabId: s.tabId, name: s.name, documents: s.documentIds,
      tables: s.tables.map(t => ({ rows: t.rows.length, columns: t.columnIds.length }))
    }))
  }, null, 2));
  if (report) {
    await mkdir(dirname(resolve(report)), { recursive: true });
    await writeFile(resolve(report), JSON.stringify(result, null, 2) + "\n");
  }
  if (output) {
    if (result.status !== "validated-structure") {
      console.error("Kein Import: strukturelle Fehler vorhanden. Diagnostik prüfen.");
      process.exitCode = 2;
      return;
    }
    await mkdir(dirname(resolve(output)), { recursive: true });
    await writeFile(resolve(output), JSON.stringify(result, null, 2) + "\n");
    console.log("Validierter struktureller Export geschrieben: " + resolve(output));
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => {
    console.error("SKPORT-Export fehlgeschlagen:", error.message);
    process.exitCode = 1;
  });
}
