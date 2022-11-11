import { handleInputCrudTextArea } from "../TextAreaCrud.js";
import { $, $$ } from "../Util.js";

export function renderFirstRowTable(app) {
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
