import {
  handleSaveRecord,
  handleClickEraser,
  handleSaveAfterEdit,
  handleResetInput,
  handleEditRow,
} from "./TextAreaCrud.js";
import { BUTTON_FEATURE, buttonFeature } from "./Util.js";
export let buttonFeatureActive = BUTTON_FEATURE.ERASER;

export function handleLeftClickTable(event, app) {
  const node = event.target;

  //1. click on header
  if (node.getAttribute("key") === "new-record") {
    if (node.getAttribute("type") === "save") {
      handleSaveRecord(app);
    } else if (node.getAttribute("type") === "clear") {
      handleResetInput();
    }
  }

  // 2. click on row
  if (Number(node.getAttribute("key")) >= 0) {
    const type = node.getAttribute("type");
    switch (type) {
      case "save": {
        const eraserNode = node.parentNode.querySelector("img[type=eraser]");
        eraserNode.src = "./Assets/delete-icon.svg";
        handleSaveAfterEdit(node);
        break;
      }
      case "eraser":
        handleClickEraser(node, app);
        break;
      case "edit": {
        const eraserNode = node.parentNode.querySelector("img[type=eraser]");
        eraserNode.src = "./Assets/eraser-icon.svg";
        handleEditRow(node);
        break;
      }
      default:
        handleClickOnRow(node);
    }
  }
}
function handleClickOnRow(node) {
  const targetNode = getNodeForHighlight(node);

  if (!targetNode) return;
  const isHighlight = checkIsHighlight(node);

  if (
    (isHighlight && (event.shiftKey || event.altKey || event.ctrlKey)) ||
    buttonFeatureActive === BUTTON_FEATURE.ERASER
  ) {
    removeHighlight(targetNode);
  } else {
    processHighlightRow(targetNode);
  }
}

function processGetRowNode(node) {
  if (node.nodeName === "TD") {
    return node.parentNode;
  } else if (node.nodeName === "TH") {
    return node.parentNode;
  } else if (node.parentNode.nodeName === "TR") {
    return node;
  } else {
    return null;
  }
}
function processGetCellNode(node) {
  if (!(node.nodeName === "TD" || node.nodeName === "TH")) return;
  return node;
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
function getNodeForHighlight(node) {
  if (buttonFeatureActive === BUTTON_FEATURE.ROW) {
    return processGetRowNode(node);
  } else if (
    buttonFeatureActive === BUTTON_FEATURE.CELL ||
    buttonFeatureActive === BUTTON_FEATURE.ERASER
  ) {
    return processGetCellNode(node);
  }
}

// =======================================================================================
// Footer Feature ========================================================================

export function selectFeatureHighlight(event) {
  if (event.target.nodeName !== "BUTTON") return;
  for (const btn of buttonFeature.children) {
    btn.removeAttribute("active");
  }
  event.target.setAttribute("active", true);
  buttonFeatureActive = event.target;
}

// =======================================================================================

export function getButtonEdit(key) {
  return `<td class="button-actions">
         <img key=${key} type="save" src="./Assets/send-icon.svg" width="16px" height="16px"></img>
         <img key=${key} type="edit" src="./Assets/edit-icon.svg" width="16px" height="16px" ></img>
         <img key=${key} type="eraser" src="./Assets/delete-icon.svg" width="16px" height="16px"></img> 
      </td>`;
}

function highlightRow() {
  return "hsl(" + 360 * Math.random() + ",50%,50%)";
}

function checkIsHighlight(targetNode) {
  return targetNode.style.backgroundColor !== "";
}
