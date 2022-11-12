export function getRowDataFromDB(app) {
  const result = app.JsonData.dataTable.dataTableBody.find((_, index) => {
    return +index === +app.activeRow;
  });
  return result.slice(1, -1);
}

export function getRowDataFromActiveRow(app) {
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

export function setActiveRow(app, index) {
  app.activeRow = index;
}

export function findNoteObject(app) {
  const result = getRowDataFromActiveRow(app);
  const noteObject = result.findLast((item, index) => {
    return item.name === "note";
  });
  if (noteObject) {
    return noteObject;
  } else {
    const newLength = result.push({
      name: "note",
      data: "",
      index: result.length,
      show: ["detail"],
    });
    return result[newLength - 1];
  }
}
