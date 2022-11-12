export function getRowDataFromDB(app) {
  const result = app.JsonData.dataTable.dataTableBody.find((_, index) => {
    return +index === +app.activeRow;
  });
  return result.slice(1, -1);
}

export function getRowDataForUpdateRecord(app) {
  const result = app.JsonData.dataTable.dataTableBody.find((_, index) => {
    return +index === +app.activeRow;
  });

  return result;
}

export function getRowDataPrevious(app) {
  const result = app.JsonData.dataTable.dataTableBody.find((_, index) => {
    return +index === +app.previousActiveRow;
  });
  return result.slice(1, -1);
}
