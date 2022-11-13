export function handleClickEraserRow(event, app) {
  const rowNode = event.target.closest("tr");
  if (!rowNode) return;
  if (rowNode.classList.contains("editing")) {
    handleEraserValueInTextArea(rowNode);
  } else {
    handleDeleteRow(app, rowNode);
  }
}
export function handleDeleteRow(app, rowNode) {
  // show modal confirm before delete [later]
  const newDataTableBody = JSON.parse(
    JSON.stringify(app.JsonData.dataTable.dataTableBody)
  );
  newDataTableBody.splice(rowNode.dataset.rowIndex, 1);
  app.JsonData.dataTable.dataTableBody = newDataTableBody;
  app.render();
}

export function handleEraserValueInTextArea(rowNode) {
  const textAreaGroup = rowNode.querySelectorAll("textarea");
  textAreaGroup.forEach((textareaNode) => (textareaNode.value = ""));
  textAreaGroup[0].focus();
}
