import { getButtonEdit } from "./CellFeature.js";
import { handleInputCrudTextArea, hanlePreRender } from "./TextAreaCrud.js";
import { $, $$, highlightNode } from "./Util.js";

function processRow(data) {
  if (!data) return;
  let tableRow = "";
  data.forEach((row) => {
    tableRow += `<tr data-key=${+row.index}>
    <td class="column-1" style="background-color:${
      row["column-1-bg"] || "color"
    }" >${row.index + 1}</td>
    <td class="column-data column-2" data-key="method" style="background-color:${
      row["column-2-bg"] || "color"
    }" >${row.method}</td>
    <td class="column-data column-3" data-key="syntax" style="background-color:${
      row["column-3-bg"] || "color"
    }" >${row.syntax}</td>
    <td class="column-data column-4" data-key="involved" style="background-color:${
      row["column-4-bg"] || "color"
    }" >${row.involved}</td>
    <td class="column-data column-5" data-key="description" style="background-color:${
      row["column-5-bg"] || "color"
    }" >${row.description}</td>${getButtonEdit(+row.index)}</tr>`;
  });
  return tableRow;
}

export function handleRender(app) {
  renderTableHeader();
  renderTableBody(app);
  rendermainContent(app.JsonData?.mainContent);
}

export async function renderDataImport(event, app) {
  const fileList = await event.target.files[0];
  const url = URL.createObjectURL(fileList);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log("read data from import file");
      app.JsonData = JSON.parse(JSON.stringify(data));
      hanlePreRender();
      handleRender(app);
      highlightNode($("body"));
      // saveLocalStorage(data); // Do not save localStorage when open file
    });
}

function rendermainContent(mainContent) {
  const mainContentNode = $(".main-content");
  if (mainContent !== "" && mainContentNode.innerHTML !== mainContent) {
    mainContentNode.innerHTML = mainContent;
  }
}

// table

function renderTableHeader() {
  const tHead = $("#table thead");
  const newTHead = `
  <tr>
    <th class="column-1">STT</th>
    <th class="column-2">Method Name</th>
    <th class="column-3">Syntax</th>
    <th class="column-4">Involved</th>
    <th class="column-5">Description</th>
    <th class="column-actions button-actions">Action</th>
  </tr>
`;
  if (tHead.innerHTML !== newTHead) {
    tHead.innerHTML = newTHead;
  }
}

function renderTableBody(app) {
  renderFirstRowTable(app);
  const tableRowData = processRow(app.JsonData?.methodHelper);
  if (tableRowData) {
    const tbody = $("#table tbody");
    tbody.insertAdjacentHTML("beforeend", tableRowData);
  }
}

function renderFirstRowTable(app) {
  if ($("#table tbody tr.crud-group")) return;
  const tbody = $("#table tbody");
  const firstTableRow = `<tr class="crud-group">
  <td class="column-1">0</td>
  <td class="column-2"><textarea data-key="method"></textarea></td>
  <td class="column-3"><textarea data-key="syntax"></textarea></td>
  <td class="column-4"><textarea data-key="involved"></textarea></td>
  <td class="column-5"><textarea data-key="description"></textarea></td>
  <td class="column-actions button-actions">
    <img key="new-record" title="create" class="save-new-record" type="save"
      src="./Assets/Icons/create-unactive-icon.svg" width="28px" height="28px"></img>
    <img key="new-record" type="clear" title="eraser" class="clear-new-node"
      src="./Assets/Icons/eraser-unactive-icon.svg" width="28px" height="28px"></img>
  </td>
</tr>`;
  tbody.innerHTML = firstTableRow;
  const crudTextArea = $$("#table .crud-group textarea");

  crudTextArea.forEach((item) => {
    item.addEventListener("input", () => handleInputCrudTextArea(app));
  });
}
