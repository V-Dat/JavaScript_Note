import { showModalConfirm } from "../AddColumn/ShowModalAddColumn.js";
import { $, $$ } from "../Util.js";

export function renderdataTableHeader(app) {
  const tHead = $("#table thead");

  const newTHead = app.JsonData.dataTable.dataTableHeader.map(
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
    item.addEventListener("click", (event) => showModalConfirm(event, app));
  });
}
