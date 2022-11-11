import { showTextAreaForEdit } from "./EditRow.js";

export function handleClickUndoRow(event, app) {
  const rowNode = event.target.closest("tr.editing");
  if (!rowNode) return;
  showTextAreaForEdit(rowNode, app);
}
