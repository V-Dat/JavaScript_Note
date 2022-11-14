export function handleClickEraserRow(event, app) {
    const rowNode = event.target.closest('tr');
    if (!rowNode) return;
    if (rowNode.classList.contains('editing')) {
        handleEraserValueInTextArea(rowNode);
    } else {
        handleDeleteRow(app, rowNode);
    }
}
export function handleDeleteRow(app, rowNode) {
    // show modal confirm before delete [later]
    let newDataTableBody = JSON.parse(JSON.stringify(app.JsonData.dataTable.dataTableBody));

    // rowData start at index = 2
    newDataTableBody.splice(rowNode.dataset.rowIndex - 2, 1);
    newDataTableBody.map((record, index) => {
        record[0].data = index + 1;
        return record;
    });
    app.JsonData.dataTable.dataTableBody = newDataTableBody;
    app.render();
}

export function handleEraserValueInTextArea(rowNode) {
    const textAreaGroup = rowNode.querySelectorAll('textarea');
    textAreaGroup.forEach((textareaNode) => (textareaNode.value = ''));
    textAreaGroup[0].focus();
}
