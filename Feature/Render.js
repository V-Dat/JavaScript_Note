import { getButtonEdit } from "./CellFeature.js";
import { handleInputCrudTextArea, hanlePreRender } from "./TextAreaCrud.js";
import { $, $$, highlightNode } from "./Util.js";

function processRow(data) {
  console.log(333, data);
  if (!data) return;
  let tableRow = "";
  data.forEach((row, index) => {
    console.log(22, row);
    tableRow += `<tr data-key=${+index}>
    <td data-index=${+index} data-column-name="column-1" class="cell column-1" style="background-color:${
      row[`column-${index + 1}-bg`] || "color"
    }" >${+index + 1}</td>
    <td data-index=${+index} data-column-name="column-2" class="column-data cell column-2" data-key="method" style="background-color:${
      row[`column-${index + 1}-bg`] || "color"
    }" >${row.data}</td>
    <td data-index=${+index} data-column-name="column-3" class="column-data cell column-3" data-key="syntax" style="background-color:${
      row[`column-${index + 1}-bg`] || "color"
    }" >${row.data}</td>
    <td data-index=${+index} data-column-name="column-4" class="column-data cell column-4" data-key="involved" style="background-color:${
      row[`column-${index + 1}-bg`] || "color"
    }" >${row.data}</td>
    <td data-index=${+index} data-column-name="column-5" class="column-data cell column-5" data-key="description" style="background-color:${
      row[`column-${index + 1}-bg`] || "color"
    }" >${row.data}</td>${getButtonEdit(row, index)}</tr>`;
  });
  return tableRow;
}

export function handleRender(app) {
  renderTableHeader(app);
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

function renderTableHeader(app) {
  const tHead = $("#table thead");
  const newTHead = app.JsonData.tableHeader.map(
    ({ text, buttonText }, index) => {
      const aa = `<th class="cell column-${
        index + 1
      }">${text} - <button data-index=${index} >${buttonText}</button></th>`;
      return aa;
    }
  );

  tHead.innerHTML = newTHead.join("");
  const buttonAdd = $$("#table thead button");

  buttonAdd.forEach((item) => {
    item.addEventListener("click", (event) => handleAddRightColumn(event, app));
  });

  function handleAddRightColumn(event, app) {
    const indexInsert = +event.target.dataset.index + 1;
    app.JsonData.tableHeader.splice(indexInsert, 0, {
      text: "kkk",
      buttonText: "lalala",
    });

    app.render();
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
  <td class="cell column-1">0</td>
  <td class="cell column-2"><textarea data-key="method"></textarea></td>
  <td class="cell column-3"><textarea data-key="syntax"></textarea></td>
  <td class="cell column-4"><textarea data-key="involved"></textarea></td>
  <td class="cell column-5"><textarea data-key="description"></textarea></td>
  <td class="cell column-6 button-actions">
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
