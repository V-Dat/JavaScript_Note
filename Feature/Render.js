import { getButtonEdit } from "./CellFeature.js";
import { handleInputCrudTextArea, hanlePreRender } from "./TextAreaCrud.js";
import { $, $$, highlightNode } from "./Util.js";

function processRow(data) {
  if (!data) return;
  let tableRow = "";
  data.forEach((row) => {
    tableRow += `<tr data-key=${+row.index}>
    <td class="column-stt">${row.index + 1}</td>
    <td class="column-data column-method" data-key="method">${row.method}</td>
    <td class="column-data column-syntax" data-key="syntax">${row.syntax}</td>
    <td class="column-data column-involved" data-key="involved">${
      row.involved
    }</td>
    <td class="column-data column-description" data-key="description">${
      row.description
    }</td>${getButtonEdit(+row.index)}</tr>`;
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
    <th class="column-stt">STT</th>
    <th class="column-method">Method Name</th>
    <th class="column-syntax">Syntax</th>
    <th class="column-involved">Involved</th>
    <th class="column-description">Description</th>
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
  <td class="column-stt">0</td>
  <td class="column-method"><textarea data-key="method"></textarea></td>
  <td class="column-syntax"><textarea data-key="syntax"></textarea></td>
  <td class="column-involved"><textarea data-key="involved"></textarea></td>
  <td class="column-description"><textarea data-key="description"></textarea></td>
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
