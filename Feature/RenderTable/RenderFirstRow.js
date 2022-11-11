import { handleInputCrudTextArea } from "../TextAreaCrud.js";
import { $, $$ } from "../Util.js";

export function renderFirstRowTable(app) {
  if ($("#table tbody tr.crud-group")) return;
  const tbody = $("#table tbody");

  let tableRow = "<tr class='crud-group'>";
  app.JsonData.dataTable.dataTableFirstRow.forEach((cell) => {
    tableRow += `<td type="cell" data-row-type="first-row" data-row-index=1 data-column-index=${
      cell.index
    } data-column-name=${
      cell.name
    } class="column-data cell" style="background-color:${
      cell.bg || "color"
    }" >${cell.data ? cell.data : buttonEdit}</td>`;
  });
  tableRow += "</tr>";

  tbody.innerHTML = tableRow;
  const crudTextArea = $$(`#table td[data-row-type="first-row"] textarea`);

  crudTextArea.forEach((item) => {
    item.addEventListener("input", () => handleInputCrudTextArea(app));
  });
}

const buttonEdit = `<img key="new-record" title="create" class="save-new-record" type="save"
src="./Assets/Icons/create-unactive-icon.svg" width="28px" height="28px"></img>
<img key="new-record" type="clear" title="eraser" class="clear-new-node"
src="./Assets/Icons/eraser-unactive-icon.svg" width="28px" height="28px"></img>`;
