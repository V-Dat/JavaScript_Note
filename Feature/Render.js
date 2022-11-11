import { getButtonEdit } from "./CellFeature.js";
import { hanlePreRender } from "./TextAreaCrud.js";
import { $, highlightNode } from "./Util.js";

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

export function handleRender(data) {
  renderTableHeader();
  renderTableBody(data);
  rendermainContent(data.mainContent);
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
      handleRender(app.JsonData);
      highlightNode($("body"));
      // saveLocalStorage(data); // Do not save localStorage when open file
    });
}

function rendermainContent(data) {
  const mainContent = $(".main-content");
  if (data?.mainContent !== "" && mainContent.innerHTML !== data.mainContent) {
    mainContent.innerHTML = data;
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

function renderTableBody(data) {
  const tableRowData = processRow(data.methodHelper);
  if (tableRowData) {
    const tbody = $("#table tbody");
    tbody.insertAdjacentHTML("beforeend", tableRowData);
  }
}
