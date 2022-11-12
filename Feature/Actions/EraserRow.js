export function handleClickEraserRow(event, app) {
  const rowNode = event.target.closest("tr.editing");
  if (!rowNode) return;
  if (rowNode.classList.contains("editing")) {
    handleEraserValueInTextArea(rowNode);
  } else {
    handleDeleteRow(app, rowNode);
  }
}
export function handleDeleteRow(app, rowNode) {
  const newData = app.JsonData.dataTable.dataTableBody.filter((item) => {
    return +item.index !== +getIndexRowEdit(rowNode);
  });
  app.JsonData.dataTable.dataTableBody = newData.map((item, index) => ({
    ...item,
    index: index,
  }));
  app.render();
}
export function handleEraserValueInTextArea(rowNode) {
  const textAreaGroup = rowNode.querySelectorAll("textarea");
  textAreaGroup.forEach((textareaNode) => (textareaNode.value = ""));
  textAreaGroup[0].focus();
}
