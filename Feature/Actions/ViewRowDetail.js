import { showModalRowDetail } from "../ModalRowDetail.js";
import { toggleNode } from "../SwitchDocument.js";
import { $ } from "../Util.js";
import { getRowDataFromActiveRow, setActiveRow } from "./AccessData.js";

export function handleClickViewRow(event, app) {
  const rowNode = event.target.closest("tr");
  setActiveRow(app, rowNode.dataset.rowIndex);
  const rowData = getRowDataFromActiveRow(app);

  showModalRowDetail(rowData);
  toggleNode($(".switch-document-group .btn-switch"));
}
