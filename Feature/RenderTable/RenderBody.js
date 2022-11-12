import { getButtonEdit } from "../CellFeature.js";
import { $ } from "../Util.js";

export function renderTableBody(app) {
  const tableRowData = processRow(app.JsonData.dataTable.dataTableBody);
  const tbody = $("#table tbody");
  tbody.insertAdjacentHTML("beforeend", tableRowData);
}

function processRow(data) {
  if (!data) return;
  let tableRow = "";

  data.forEach((row, rowIndex) => {
    tableRow += `<tr data-row-index=${rowIndex}>`;
    row.forEach((cell, cellIndex) => {
      tableRow += `<td type="cell" data-row-type="row-data" data-row-index=${
        rowIndex + 2
      } data-column-index=${cellIndex} data-column-name=${cell.name} class="${
        cell.index === 0 || cell.index === row.length - 1
          ? "cell"
          : "column-data cell"
      }" style="background-color:${cell.bg || "color"}" >${
        cell.data ? cell.data : getButtonEdit(rowIndex, cellIndex)
      }</td>`;
    });
    tableRow += "</tr>";
  });

  return tableRow;
}
