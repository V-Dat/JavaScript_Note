import { buttonFeatureActive } from "../CellFeature.js";
import { getRowData } from "../ModalRowDetail.js";
import { $ } from "../Util.js";
import { saveStyleToJsonData } from "./SaveStyle.js";

export function handlePaintTable(cellNode, app) {
  const feature = getFeaturePaint();
  switch (feature) {
    case FEATURE.MAKE_UP_ROW:
      processMakeUpRow(cellNode, app);
      break;
    case FEATURE.MAKE_UP_CELL:
      processMakeUpCell(cellNode, app);
      break;
    case FEATURE.REMOVE_MAKE_UP_CELL:
      break;
  }

  // if (!highlighttNode) return;
  // const isHighlight = checkIsHighlight(targetNode);

  // if (
  //   (isHighlight && (event.shiftKey || event.altKey || event.ctrlKey)) ||
  //   buttonFeatureActive === BUTTON_FEATURE.ERASER
  // ) {
  //   removeHighlight(highlighttNode, app);
  // } else {
  //   processMakeUpRow(highlighttNode, app);
  // }
}

function processMakeUpRow(cellNode, app) {
  const backgroundColor = randomColor();
  const rowNode = cellNode.closest("tr");

  for (const cell of rowNode.children) {
    const cellData = getCellData(cellNode, app);
    cell.style.backgroundColor = backgroundColor;
    saveStyleToJsonData(cellData, backgroundColor);
  }
}

function processMakeUpCell(cellNode, app) {
  const backgroundColor = randomColor();
  const cellData = getCellData(cellNode, app);

  cellNode.style.backgroundColor = backgroundColor;
  saveStyleToJsonData(cellNode, cellData, backgroundColor);
}

function getFeaturePaint() {
  const feature = $(".button-feature-group button[active]");
  return feature.getAttribute("type");
}
function checkIsHighlight(targetNode) {
  return targetNode.style.backgroundColor !== "";
}

const FEATURE = {
  MAKE_UP_ROW: "make-up-row",
  MAKE_UP_CELL: "make-up-cell",
  REMOVE_MAKE_UP_CELL: "remove-make-up-cell",
};

function randomColor() {
  return "hsl(" + 360 * Math.random() + ",50%,50%)";
}

function removeHighlight(targetNode, app) {
  const rowData = getRowData(app);

  if (buttonFeatureActive === BUTTON_FEATURE.ROW) {
    for (const cell of targetNode.children) {
      cell.style.backgroundColor = "";
      saveStyleToJsonData(cell, rowData, "");
    }
  } else {
    targetNode.style.backgroundColor = "";
    saveStyleToJsonData(targetNode, rowData, "");
  }
}
export function getCellData(cellNode, app) {
  const rowIndex = cellNode.dataset.rowIndex;
  switch (rowIndex) {
    case "0": {
      let rowData = app.JsonData.dataTable.dataTableHeader.find((_, index) => {
        return index === +cellNode.dataset.columnIndex;
      });
      return rowData;
    }
    case "1": {
      let rowData = app.JsonData.dataTable.dataTableFirstRow.find(
        (_, index) => {
          return index === +cellNode.dataset.columnIndex;
        }
      );
      return rowData;
    }
    default: {
      let rowData = app.JsonData.dataTable.dataTableBody.find((_, index) => {
        return index === +cellNode.dataset.rowIndex - 2;
      });
      return rowData[cellNode.dataset.columnIndex];
    }
  }
}
