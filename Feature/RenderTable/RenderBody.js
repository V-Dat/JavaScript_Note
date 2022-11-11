import { getButtonEdit } from "../CellFeature.js";
import { $ } from "../Util.js";

export function renderTableBody(app) {
  if (!app?.JsonData?.dataTable?.dataTableBody) return;
  const tableRowData = processRow(app.JsonData.dataTable.dataTableBody);
  const tbody = $("#table tbody");
  tbody.insertAdjacentHTML("beforeend", tableRowData);
}

function processRow(data) {
  if (!data) return;
  let tableRow = "";

  console.log(33, data);

  data.forEach((row, rowIndex) => {
    tableRow += `<tr data-row-index=${rowIndex}>`;
    row.forEach((cell, cellIndex) => {
      tableRow += `<td type="cell" data-row-type="row-data" data-row-index=${
        rowIndex + 2
      } data-column-index=${cellIndex} data-column-name=${
        cell.name
      } class="column-data cell" style="background-color:${
        cell.bg || "color"
      }" >${cell.data ? cell.data : getButtonEdit(rowIndex, cellIndex)}</td>`;
    });
    tableRow += "</tr>";
  });

  return tableRow;
}
