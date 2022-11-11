import { getButtonEdit } from "../CellFeature.js";
import { $ } from "../Util.js";

export function renderTableBody(app) {
  const tableRowData = processRow(app.JsonData?.dataTable.dataTableBody);
  if (tableRowData) {
    const tbody = $("#table tbody");
    tbody.insertAdjacentHTML("beforeend", tableRowData);
  }
}

function processRow(data) {
  if (!data) return;
  let tableRow = "";
  data.forEach((row, index) => {
    tableRow += `<tr data-indexRecord=${+index} data-key=${+index} >
      <td type="cell" data-indexRecord=${+index} data-index=${+index} data-column-name="column-1" class="cell column-1" style="background-color:${
      row[`column-${index + 1}-bg`] || "color"
    }" >${+index + 1}</td>
      <td type="cell" data-indexRecord=${+index} data-index=${+index} data-column-name="column-2" class="column-data cell column-2" data-key="method" style="background-color:${
      row[`column-${index + 1}-bg`] || "color"
    }" >${row.data}</td>
      <td type="cell" data-indexRecord=${+index} data-index=${+index} data-column-name="column-3" class="column-data cell column-3" data-key="syntax" style="background-color:${
      row[`column-${index + 1}-bg`] || "color"
    }" >${row.data}</td>
      <td type="cell" data-indexRecord=${+index} data-index=${+index} data-column-name="column-4" class="column-data cell column-4" data-key="involved" style="background-color:${
      row[`column-${index + 1}-bg`] || "color"
    }" >${row.data}</td>
      <td type="cell" data-indexRecord=${+index} data-index=${+index} data-column-name="column-5" class="column-data cell column-5" data-key="description" style="background-color:${
      row[`column-${index + 1}-bg`] || "color"
    }" >${row.data}</td>${getButtonEdit(row, index)}</tr>`;
  });
  return tableRow;
}
