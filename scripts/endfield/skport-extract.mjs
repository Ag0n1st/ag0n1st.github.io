#!/usr/bin/env node
/**
 * SKPORT wiki snapshot -> inspectable, structured operator export.
 * Offline by design: accepts the response for a public item/info entry or
 * a user-provided network capture. Only the PUBLIC item is selected and used;
 * other requests including authentication responses are discarded.
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
    { descriptionId: "gIuAIUyt", contentId: "ENfCCHbD", name: "Wildlands Huntress", type: "Basic Attack" },
    { descriptionId: "0ctR1S1J", contentId: "fD8zxhWN", name: "Piercing Arrows of the Woods", type: "Battle Skill" },
    { descriptionId: "CqJxefHj", contentId: "1G405tY0", name: "Rampant Thorns", type: "Combo Skill" },
    { descriptionId: "tVlf3UYx", contentId: "mDY9OqqE", name: "Call of Ice Mountain", type: "Ultimate" },
  ],
};

const isObject = value => value !== null && typeof value === "object" && !Array.isArray(value);
const string = value => typeof value === "string" ? value : value == null ? "" : String(value);

/**
 * The supplied capture is a JSON array of several network responses. Extract
 * ONLY the matching public wiki item; NEVER carry account/token responses into
 * the output or its checksums.
 */
export function selectWikiItem(raw) {
  let response = raw;
  if (Array.isArray(raw)) {
    const records = raw.filter(entry =>
      typeof entry?.url === "string" &&
      /\/web\/v1\/wiki\/item\/info(?:\?|$)/.test(entry.url) &&
      new URL(entry.url).searchParams.get("id") === TYPHOEUS.itemId &&
      entry.status === 200
    );
    if (records.length !== 1) throw new Error("Genau eine öffentliche SKPORT-item/info-Antwort für Typhoeus erwartet.");
    response = records[0].response;
  }
  const item = response?.data?.item ?? response?.item ?? response;
  if (!isObject(item) || !isObject(item.document) || string(item.itemId) !== TYPHOEUS.itemId) {
    throw new Error("Typhoeus-Wiki-Eintrag 1173 mit document-Objekt nicht vorhanden.");
  }
  return item;
}

function wikiTag(item, typeId) {
  const selected = item.brief?.subTypeList?.find(tag => string(tag.subTypeId) === typeId)?.value;
  const group = item.subType?.filterTagTree?.find(node => string(node.id) === typeId);
  const candidate = group?.children?.find(child => string(child.id) === string(selected));
  return candidate ? { name: string(candidate.name), id: string(selected), code: string(candidate.value) } : null;
}

export function extractOperatorInfo(item) {
  return {
    id: string(item.itemId), slug: TYPHOEUS.operator, name: string(item.name),
    language: string(item.lang), rarity: wikiTag(item, "10000"),
    element: wikiTag(item, "10100"), class: wikiTag(item, "10200"),
    weaponType: wikiTag(item, "10213"), faction: wikiTag(item, "10219"),
    coverUrl: string(item.brief?.cover),
    illustrationUrl: string(item.document?.extraInfo?.illustration),
  };
}


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
  let item;
  try { item = selectWikiItem(raw); }
  catch (e) {
    return {
      schemaVersion: 2, operator: TYPHOEUS.operator, status: "needs-review",
      source: { provider: "skport-wiki", itemId: TYPHOEUS.itemId, sha256: null },
      diagnostics: { issues: [e.message], skillTabCount: 0, documentCount: 0, widgetCount: 0 },
      operatorInfo: null, skills: []
    };
  }
  const container = item.document;
  const documents = container.documentMap;
  const widgets = container.widgetCommonMap;
  const issues = [];
  if (!isObject(documents)) issues.push("documentMap fehlt.");
  if (!isObject(widgets)) issues.push("widgetCommonMap fehlt.");
  const skillWidget = widgets?.[TYPHOEUS.skillWidgetId];
  if (!skillWidget) issues.push("Skill-Widget " + TYPHOEUS.skillWidgetId + " fehlt.");
  const tabsList = skillWidget?.tabList ?? [];
  const tabDataMap = skillWidget?.tabDataMap ?? {};
  const listedIds = Array.isArray(tabsList) ? tabsList.map(tabIdOf).filter(Boolean) : [];
  const tabIds = [...new Set([...listedIds, ...Object.keys(tabDataMap)])];
  const availableKeys = new Set(Object.keys(documents ?? {}));
  const allDocumentOwners = new Map();
  const skills = tabIds.map((tabId, i) => {
    const tab = tabDataMap[tabId] ?? {};
    const intro = tab.intro ?? {};
    const name = string(intro.name ?? tab.name);
    const type = string(intro.type?.value ?? intro.type?.key ?? intro.type);
    const contentIds = findDocumentRefs(tab.content, availableKeys);
    const descriptionIds = findDocumentRefs(intro.description, availableKeys);
    const expected = TYPHOEUS.expectedTabs.find(skill => skill.name === name);
    if (!expected) issues.push("Unbekannter Skillname an Tab " + tabId + ": " + name);
    if (expected && (expected.contentId !== string(tab.content) || expected.descriptionId !== string(intro.description))) {
      issues.push("Die gespeicherte Referenzzuordnung für " + name + " hat sich geändert.");
    }
    if (expected && type !== expected.type) {
      issues.push("Skilltyp von " + name + " weicht ab: " + type);
    }
    if (contentIds.length !== 1) issues.push("Tab " + tabId + ": genau ein Leveltabellen-Dokument erwartet, gefunden " + contentIds.length);
    if (descriptionIds.length !== 1) issues.push("Tab " + tabId + ": genau ein Beschreibungs-Dokument erwartet, gefunden " + descriptionIds.length);
    for (const id of [...contentIds,...descriptionIds]) {
      const owners = allDocumentOwners.get(id) ?? [];
      owners.push(tabId);
      allDocumentOwners.set(id, owners);
    }

    const levelDocuments = contentIds.map(id => extractDocument(id, documents[id]));
    const descriptionDocuments = descriptionIds.map(id => extractDocument(id, documents[id]));
    const tables = levelDocuments.flatMap(doc => doc.sections.filter(s => s.kind === "table").map(s => ({
      documentId: doc.documentId, blockId: s.blockId, ...s.table
    })));
    if (tables.length !== 1) issues.push("Tab " + tabId + ": genau eine Skilllevel-Tabelle erwartet, gefunden " + tables.length);
    const descriptionSections = descriptionDocuments.flatMap(d =>
      d.sections.filter(s => s.kind === "text").map(section => ({
        documentId: d.documentId, text: section.text, entries: section.entries
      }))
    );
    if (!descriptionSections.length) issues.push("Tab " + tabId + ": Beschreibung ist leer.");

    // This wiki entry uses a 13-column grid: metric name, ranks 1–9, mastery I–III.
    // Retain the original grid AND expose a level-wise view for Astro.
    const sourceTable = tables[0];
    const headers = sourceTable?.rows[0]?.cells ?? [];
    const levels = headers.slice(1);
    if (sourceTable) {
      if (sourceTable.rows.length < 2) issues.push("Leere Leveltabelle bei " + name);
      if (headers.length !== 13 || levels.length !== 12 ||
          !/^RANK 1$/i.test(levels[0]) ||
          !/^Mastery III$/i.test(levels[11])) {
        issues.push("Unerwartete Level-Spalten bei " + name + ": " + JSON.stringify(levels));
      }
      if (sourceTable.rows.some(row => row.cells.length !== headers.length)) {
        issues.push("Unvollständige Tabellenzeilen bei " + name);
      }
    }
    const metrics = sourceTable ? sourceTable.rows.slice(1).map(row => ({
      name: row.cells[0], values: row.cells.slice(1),
      entriesByLevel: row.entries.slice(1)
    })) : [];
    const levelValues = levels.map((rank, column) => ({
      rank, stats: metrics.map(metric => ({
        name: metric.name, value: metric.values[column],
        entries: metric.entriesByLevel[column] ?? []
      }))
    }));
    return {
      tabId, name, type,
      iconUrl: string(skillWidget?.tabList?.find(t => tabIdOf(t) === tabId)?.icon),
      animationUrl: string(intro.imgUrl ?? intro.iconUrl),
      descriptionIds, contentIds,
      descriptionSections, description: descriptionSections.map(s => s.text).join("\n\n"),
      tables, metrics, levels: levelValues
    };
  });
  if (skills.length !== 4) issues.push("Erwartet: 4 Skills; gefunden: " + skills.length + ".");
  for (const expected of TYPHOEUS.expectedTabs) {
    if (!skills.some(skill => skill.name === expected.name)) issues.push("Erwartete Fertigkeit fehlt: " + expected.name);
  }
  for (const [id, owners] of allDocumentOwners.entries()) {
    if (owners.length > 1) issues.push("Dokument " + id + " mehreren Skills zugeordnet: " + owners.join(", "));
  }

  // SHA-256 covers only the selected PUBLIC item object, not other capture
  // records such as sign-in responses or personal account information.
  const sha256 = createHash("sha256").update(JSON.stringify(item)).digest("hex");
  return {
    schemaVersion: 2,
    source: {
      provider: "skport-wiki", itemId: TYPHOEUS.itemId,
      endpoint: "/web/v1/wiki/item/info?id=" + TYPHOEUS.itemId,
      capturedHash: sha256
    },
    operator: TYPHOEUS.operator,
    operatorInfo: extractOperatorInfo(item),
    status: issues.length ? "needs-review" : "validated-structure",
    diagnostics: {
      widgetCount: Object.keys(widgets ?? {}).length,
      documentCount: Object.keys(documents ?? {}).length,
      skillTabCount: tabIds.length,
      issues
    },
    skills
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
