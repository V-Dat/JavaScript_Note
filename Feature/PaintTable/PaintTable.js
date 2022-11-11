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
  const rowData = getRowData(app);

  for (const cell of cellNode.children) {
    cell.style.backgroundColor = backgroundColor;
    saveStyleToJsonData(cell, rowData, backgroundColor);
  }
}

function processMakeUpCell(cellNode, app) {
  const backgroundColor = randomColor();
  const rowIndex = cellNode.dataset.index;
  const rowData = getRowData(app);
  cellNode.style.backgroundColor = backgroundColor;
  saveStyleToJsonData(cellNode, rowData, backgroundColor);
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
export function getCellRecord(cell, app) {
  const rowData = app.JsonData.dataTable.dataTableBody.find(
    (item) => item.index === +cell.dataset.indexRecord
  );
  return rowData;
}
