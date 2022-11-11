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
  const target = event.target;
  const isClickOnCell = checkIsClickOnCell(target);
  if (isClickOnCell) {
    // 1 click on cell
    return handleClickOnCell(event);
  }

  const node = target.closest("img"); // img as a button
  const rowNode = node.closest("tr");
  const isHeaderFeature = checkIsHeaderFeature(rowNode);
  if (isHeaderFeature) {
    //2. click on header button feature
    handleClickHeaderFeature(target, rowNode, app);
  } else {
    //3. click on row button feature
    handleClickRowFeature(rowNode, app, target);
  }
}

function handleClickOnCell(event) {
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
         <img key=${key} title="Save" class="save" src="./Assets/Icons/create-unactive-icon.svg" width="28px" height="28px"></img>
         <img key=${key} title="Edit" class="edit active" src="./Assets/Icons/edit-active-icon.svg" width="28px" height="28px" ></img>
         <img key=${key} title="Eraser" class="eraser" src="./Assets/Icons/delete-icon.svg" width="28px" height="28px"></img> 
         <img key=${key} title="Undo" class="undo" src="./Assets/Icons/undo-unactive-icon.svg" width="28px" height="28px" ></img> 
         <img key=${key} title="View Detail" class="view-detail" src="./Assets/Icons/view-detail-icon.svg" width="28px" height="28px" ></img> 
      </td>`;
}

function highlightRow() {
  return "hsl(" + 360 * Math.random() + ",50%,50%)";
}

function checkIsHighlight(targetNode) {
  return targetNode.style.backgroundColor !== "";
}

function checkIsHeaderFeature(rowNode) {
  return rowNode.classList.contains("crud-group");
}
function checkIsClickOnCell(target) {
  const node = target.closest("img");
  return !node;
}
function handleClickHeaderFeature(node, rowNode, app) {
  if (
    node.getAttribute("key") === "new-record" &&
    node.getAttribute("type") === "save"
  ) {
    handleSaveRecord(rowNode, app);
  } else if (
    node.getAttribute("key") === "new-record" &&
    node.getAttribute("type") === "clear"
  ) {
    unActiveButtonEraserNewNode(rowNode);
    unActiveButtonCreate(rowNode);
    handleResetInput();
  }
}

function handleClickRowFeature(rowNode, app, node) {
  const className = node.getAttribute("class");
  if (!className && !Number(node.getAttribute("key")) >= 0) return;

  if (className.includes("save")) {
    handleSaveAfterEdit(rowNode, app);
    highlightNode($("body"));
  } else if (className.includes("eraser")) {
    handleClickEraser(rowNode, app);
  } else if (className.includes("edit")) {
    handleEditRow(rowNode, app);
  } else if (className.includes("undo")) {
    handleClickUndo(rowNode, app);
  } else if (className.includes("view-detail")) {
    handleClickViewRow(rowNode, app);
  }
}
