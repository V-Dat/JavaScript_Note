export function handleAddRightColumn(indexInsert, data, app) {
  app.JsonData.dataTable.dataTableHeader.splice(indexInsert, 0, {
    text: data,
    buttonText: "add",
  });
  app.render();
}
