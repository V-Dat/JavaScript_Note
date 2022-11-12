import {
  getRowDataForEdit,
  getRowDataForUpdateRecord,
  getRowDataPrevious,
} from "./AccessData.js";
import {
  activeAllButtonEdit,
  activeButtonSave,
  activeButtonUndo,
  unActiveButtonEdit,
  unActiveAllButtonUndo,
  unActiveAllButtonSave,
  unActiveAllButtonEraserRowShowAllButtonDelete,
  activeButtonEraserRow,
  unActiveAllEditingRow,
  activeEditingRow,
} from "./ActionUtil.js";
import { $$, $ } from "../Util.js";
import { setactiveRow, setPreviousActiveRow } from "../TextAreaCrud.js";

export function handleEditRow(event, app) {
  const rowNode = event.target.closest("tr");
  if (rowNode.classList.contains("editing")) {
    console.log("do nothing");
    return;
  }
  const buttonEdit = event.target.closest("img[key='edit']");
  const buttonUndo = rowNode.querySelector("img.undo");
  const buttonSave = rowNode.querySelector("img.save");
  const buttonEraserRow = rowNode.querySelector("img.eraser");
  handleUpdateStateEdit(rowNode, app);

  activeAllButtonEdit();
  unActiveButtonEdit(buttonEdit);

  unActiveAllButtonUndo();
  activeButtonUndo(buttonUndo);

  unActiveAllButtonSave();
  activeButtonSave(buttonSave);

  unActiveAllButtonEraserRowShowAllButtonDelete();
  activeButtonEraserRow(buttonEraserRow); // active button eraser => hide button delete

  showTextAreaForEdit(rowNode, app);
  handleResetRowNoSave(app);

  unActiveAllEditingRow(app);
  activeEditingRow(rowNode, app);
}

function showTextAreaForEdit(rowNode, app) {
  const columnsData = rowNode.querySelectorAll("td.column-data.cell");
  const rowData = getRowDataForEdit(app);
  columnsData.forEach((dataNode, index) => {
    dataNode.innerHTML = `<textarea>${rowData[index].data}</textarea>`;
  });
}

function handleUpdateStateEdit(rowNode, app) {
  if (app.activeRow !== null) {
    app.previousActiveRow = String(app.activeRow);
  }
  setactiveRow(app, rowNode.dataset.rowIndex);
}

function handleResetRowNoSave(app) {
  if (app.previousActiveRow !== null) {
    const previousRowNode = $$(
      `tr[data-row-index='${app.previousActiveRow}'] td.column-data.cell`
    );
    const previousRowData = getRowDataPrevious(app);
    previousRowNode.forEach((cell, index) => {
      cell.innerHTML = previousRowData[index].data;
    });
  }
}
