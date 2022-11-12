import { showModalConfirm } from "../AddColumn/ShowModalAddColumn.js";
import { $, $$ } from "../Util.js";

export function renderdataTableHeader(app) {
  const tHead = $("#table thead");

  const newTHead = app.JsonData.dataTable.dataTableHeader.map((cell) => {
    return `<td type="cell"  data-row-type="header" data-column-name=${
      cell.name
    } data-row-index=0 data-column-index=${cell.index} class="cell column-${
      cell.index
    }" style="background-color:${cell.bg || "color"}">${
      cell.data
    } - <button data-index=${cell.index} >${cell.buttonText}</button></td>`;
  });

  tHead.innerHTML = newTHead.join("");
  const buttonAdd = $$("#table thead button");

  buttonAdd.forEach((item) => {
    item.addEventListener("click", (event) => showModalConfirm(event, app));
  });
}
