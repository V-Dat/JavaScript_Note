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

  data.forEach((row, rowIndex) => {
    tableRow += `<tr data-row-index=${rowIndex}>
      <td type="cell" data-row-index=${rowIndex} data-column-index=${0} data-column-name="column-${0}" class="cell" style="background-color:${
      row[rowIndex][`column-${rowIndex + 1}-bg`] || "color"
    }" >${+rowIndex + 1}</td>`;

    row.forEach((cell, cellIndex) => {
      tableRow += `<td type="cell" data-row-index=${rowIndex} data-column-index=${
        cellIndex + 1
      } data-column-name="column-${
        cellIndex + 1
      }" class="column-data cell" style="background-color:${
        cell[`column-${cellIndex + 1}-bg`] || "color"
      }" >${cell.data}</td>`;
    });

    tableRow += `${getButtonEdit(
      row[rowIndex],
      rowIndex,
      row.length + 1
    )}</tr>`;
  });

  return tableRow;
}
