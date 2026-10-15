import test from "node:test";
import assert from "node:assert/strict";
import { inspectSkport, extractTable, extractDocument, TYPHOEUS } from "./skport-extract.mjs";

function fixture() {
  const documentMap = {};
  const tabDataMap = {};
  const tabList = [];
  for (const [index, { tabId, linkedId, name }] of TYPHOEUS.expectedTabs.entries()) {
    tabList.push({ tabId });
    tabDataMap[tabId] = {
      intro: { name, type: { value: "type-" + index }, imgUrl: "https://example.test/" + index + ".png" },
      content: { documentId: linkedId }
    };
    const blocks = {
      intro: { text: { inlineElements: [{ text: { text: "Description: " + name } }] } },
      value: { text: { inlineElements: [{ text: { text: String(index + 1) } }] } },
      header: { text: { inlineElements: [{ text: { text: "Level" } }] } },
      entry: { text: { inlineElements: [{ entry: { id: 109, count: 2 } }] } },
      table: {
        table: {
          rowIds: ["r0", "r1"], columnIds: ["c0", "c1"],
          cellMap: {
            r0_c0: { childIds: ["header"] },
            r0_c1: { text: { inlineElements: [{ text: { text: "Damage" } }] } },
            r1_c0: { text: { inlineElements: [{ text: { text: "1" } }] } },
            r1_c1: { childIds: ["value", "entry"] }
          }
        }
      }
    };
    documentMap[linkedId] = { blockIds: ["intro", "table"], blockMap: blocks };
  }
  return { data: { documentMap, widgetCommonMap: { [TYPHOEUS.skillWidgetId]: { tabList, tabDataMap } } } };
}

test("groups four Typhoeus skill tabs by their own tab-linked document ID", () => {
  const output = inspectSkport(fixture());
  assert.equal(output.status, "validated-structure");
  assert.equal(output.skills.length, 4);
  assert.deepEqual(output.skills.map(s => s.name), TYPHOEUS.expectedTabs.map(s => s.name));
  for (let i = 0; i < output.skills.length; i++) {
    const skill = output.skills[i];
    assert.deepEqual(skill.documentIds, [TYPHOEUS.expectedTabs[i].linkedId]);
    assert.equal(skill.tables.length, 1);
    assert.deepEqual(skill.tables[0].columns, ["Level", "Damage"]);
    assert.equal(skill.tables[0].rows[1].cells[1], (i + 1) + "\n[item:109 x2]");
    assert.equal(skill.descriptionSections[0].text, "Description: " + skill.name);
  }
});

test("does not silently attach unrelated documents or invent missing skills", () => {
  const data = fixture();
  delete data.data.widgetCommonMap[TYPHOEUS.skillWidgetId].tabDataMap["gIuAIUyt"];
  const output = inspectSkport(data);
  assert.equal(output.status, "needs-review");
  assert.ok(output.diagnostics.issues.some(s => s.includes("keine eindeutig zugeordneten Dokumente")));
});

test("detects ambiguously shared source documents rather than misassigning tables", () => {
  const data = fixture();
  data.data.widgetCommonMap[TYPHOEUS.skillWidgetId].tabDataMap["0ctR1S1J"].content =
    { documentId: TYPHOEUS.expectedTabs[0].linkedId };
  const output = inspectSkport(data);
  assert.equal(output.status, "needs-review");
  assert.ok(output.diagnostics.issues.some(s => s.includes("mehreren Skills zugeordnet")));
});

test("does not accept unrelated payloads as validated game data", () => {
  const output = inspectSkport({ data: { unexpected: "value" } });
  assert.equal(output.status, "needs-review");
  assert.ok(output.diagnostics.issues.some(s => s.includes("documentMap fehlt")));
  assert.equal(output.skills.length, 0);
});

test("reads native table structure without deciding first row semantics", () => {
  const table = {
    rowIds: ["rowA"], columnIds: ["colX"],
    cellMap: { rowA_colX: { text: { inlineElements: [{ text: { text: "12.5%" } }] } } }
  };
  const result = extractTable(table, {});
  assert.deepEqual(result.columnIds, ["colX"]);
  assert.deepEqual(result.rows[0].cells, ["12.5%"]);
  assert.deepEqual(result.columns, ["12.5%"]);
  assert.deepEqual(extractDocument("doc", { blockIds: [], blockMap: {} }).sections, []);
});
