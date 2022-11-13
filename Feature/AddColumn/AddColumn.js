export function handleAddRightColumn(indexInsert, data, app) {
  app.DB.dataTable.dataTableHeader.splice(indexInsert, 0, {
    text: data,
    buttonText: "Action",
  });
  app.render();
}
