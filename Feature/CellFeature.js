import {
  handleSaveRecord,
  handleClickEraser,
  handleSaveAfterEdit,
  handleResetInput,
  handleEditRow,
  handleClickUndo,
  handleClickViewRow,
} from "./TextAreaCrud.js";
import {
  BUTTON_FEATURE,
  buttonFeature,
  unActiveButtonEraserNewNode,
  unActiveButtonCreate,
  highlightNode,
  $,
} from "./Util.js";
export let buttonFeatureActive = BUTTON_FEATURE.ERASER;

export function handleLeftClickTable(event, app) {
  const node = event.target;

  //1. click on header
  if (node.getAttribute("key") === "new-record") {
    const rowNode = node.closest("tr");

    if (node.getAttribute("type") === "save") {
      handleSaveRecord(rowNode, app);
    } else if (node.getAttribute("type") === "clear") {
      unActiveButtonEraserNewNode(rowNode);
      unActiveButtonCreate(rowNode);
      handleResetInput();
    }

    return;
  }

  // 2. click on row
  if (Number(node.getAttribute("key")) >= 0) {
    const className = node.getAttribute("class");
    if (!className) return;
    if (className.includes("save")) {
      handleSaveAfterEdit(event, app);
      highlightNode($("body"));
    } else if (className.includes("eraser")) {
      handleClickEraser(event, app);
    } else if (className.includes("edit")) {
      handleEditRow(event, app);
    } else if (className.includes("undo")) {
      handleClickUndo(event, app);
    } else if (className.includes("view-detail")) {
      handleClickViewRow(event, app);
    } else {
      handleClickOnRow(event, node);
    }
  }
}
function handleClickOnRow(event) {
  const highlighttNode = getNodeForHighlight(event);
  const targetNode = event.target;

  if (!highlighttNode) return;
  const isHighlight = checkIsHighlight(targetNode);

  if (
    (isHighlight && (event.shiftKey || event.altKey || event.ctrlKey)) ||
    buttonFeatureActive === BUTTON_FEATURE.ERASER
  ) {
    removeHighlight(highlighttNode);
  } else {
    processHighlightRow(highlighttNode);
  }
}

function processGetRowNode(event) {
  const rowNode = event.target.closest("tr");
  if (!rowNode) return;
  return rowNode;
}
function processGetCellNode(event) {
  const rowNodeBody = event.target.closest("td");
  const rowNodeHeader = event.target.closest("th");
  if (rowNodeBody) return rowNodeBody;
  if (rowNodeHeader) return rowNodeHeader;
  return;
}
function removeHighlight(targetNode) {
  if (buttonFeatureActive === BUTTON_FEATURE.ROW) {
    for (const cell of targetNode.children) {
      cell.style.backgroundColor = "";
    }
  } else {
    targetNode.style.backgroundColor = "";
  }
}
function processHighlightRow(targetNode) {
  const backgroundColor = highlightRow();
  if (targetNode.nodeName === "TR") {
    for (const cell of targetNode.children) {
      cell.style.backgroundColor = backgroundColor;
    }
  } else {
    targetNode.style.backgroundColor = backgroundColor;
  }
}
function getNodeForHighlight(event) {
  if (buttonFeatureActive === BUTTON_FEATURE.ROW) {
    return processGetRowNode(event);
  } else if (
    buttonFeatureActive === BUTTON_FEATURE.CELL ||
    buttonFeatureActive === BUTTON_FEATURE.ERASER
  ) {
    return processGetCellNode(event);
  }
}

// Footer Feature ========================================================================

export function selectFeatureHighlight(event) {
  const activeButton = event.target.closest(".button-feature");
  if (!activeButton) return;
  for (const btn of buttonFeature.children) {
    btn.removeAttribute("active");
  }
  activeButton.setAttribute("active", true);
  buttonFeatureActive = activeButton;
}

// =======================================================================================

export function getButtonEdit(key) {
  return `<td class="button-actions">
         <img key=${key} title="save" class="save" src="./Assets/Icons/create-unactive-icon.svg" width="28px" height="28px"></img>
         <img key=${key} title="edit" class="edit active" src="./Assets/Icons/edit-active-icon.svg" width="28px" height="28px" ></img>
         <img key=${key} title="eraser" class="eraser" src="./Assets/Icons/delete-icon.svg" width="28px" height="28px"></img> 
         <img key=${key} title="undo" class="undo" src="./Assets/Icons/undo-unactive-icon.svg" width="28px" height="28px" ></img> 
         <img key=${key} title="view-detail" class="view-detail" src="./Assets/Icons/view-detail-icon.svg" width="28px" height="28px" ></img> 
      </td>`;
}

function highlightRow() {
  return "hsl(" + 360 * Math.random() + ",50%,50%)";
}

function checkIsHighlight(targetNode) {
  return targetNode.style.backgroundColor !== "";
}
