import { highlightNode } from "../Util.js";
import { getRowDataFromDB } from "./AccessData.js";
import {
  activeButtonEdit,
  unActiveAllEditingRow,
  unActiveButtonEraserRowAndShowButtonDelete,
  unActiveButtonSave,
  unActiveButtonUndo,
} from "./ActionUtil.js";

export function handleSaveUpdateRecord(event, app) {
  const rowNode = event.target.closest("tr");
  const isEdit = rowNode.classList.contains("editing");
  if (String(isEdit) === "false" || isEdit === null) return;
  updateDataAfterEdit(rowNode, app);
  unActiveAllEditingRow(app);
  handleUpdateStateEditAfterSave(app);
  hanleChangeFeatureStateImage(rowNode);
  highlightNode(rowNode);
}

function updateDataAfterEdit(rowNode, app) {
  const columnsData = rowNode.querySelectorAll("td.column-data.cell");

  const rowData = getRowDataFromDB(app);

  columnsData.forEach((cell, index) => {
    rowData[index].data = cell.querySelector("textarea").value;
    cell.innerHTML = cell.querySelector("textarea").value;
  });
}

function handleUpdateStateEditAfterSave(app) {
  app.previousActiveRow = app.activeRow;
  app.activeRow = null;
}

function hanleChangeFeatureStateImage(rowNode) {
  const buttonEdit = rowNode.querySelector("img.edit:not(.active)");
  const buttonSave = rowNode.querySelector("img.save");
  const buttonEraser = rowNode.querySelector("img.eraser.active");
  const buttonUndo = rowNode.querySelector("img.undo");
  activeButtonEdit(buttonEdit);
  unActiveButtonSave(buttonSave);
  unActiveButtonEraserRowAndShowButtonDelete(buttonEraser);
  unActiveButtonUndo(buttonUndo);
}
