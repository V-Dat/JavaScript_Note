import { getRowData } from "./ModalRowDetail.js";
import { handlePaintTable } from "./PaintTable/PaintTable.js";
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
  buttonFeature,
  unActiveButtonEraserNewNode,
  unActiveButtonCreate,
  highlightNode,
  $,
} from "./Util.js";

export function handleClickOnTable(event, app) {
  const isClickOnFeature = event.target.closest(`img[type="feature"]`);
  const isClickOnCell = event.target.closest(`td[type="cell"]`);
  const cellNode = isClickOnCell;
  if (isClickOnCell) {
    handlePaintTable(event, cellNode, app);
  } else if (isClickOnFeature) {
    console.log("kkkkkkkkkkk");
  }

  // case 1: click on type = cell

  // case 2: click on type = feature
  // case 2.1: click on header feature
  // case 2.2: click on cell feature

  // const isClickOnCell = checkIsClickOnCell(target);
  // if (isClickOnCell) {
  //   // 1 click on cell
  //   return handlePaintTable(event, app);
  // }

  // const node = target.closest("img"); // img as a button
  // const rowNode = node.closest("tr");
  // const isHeaderFeature = checkIsHeaderFeature(rowNode);
  // if (isHeaderFeature) {
  //   //2. click on header button feature
  //   handleClickHeaderFeature(target, rowNode, app);
  // } else {
  //   //3. click on row button feature
  //   handleClickRowFeature(rowNode, app, target);
  // }
}

// Footer Feature ========================================================================

export function selectFeatureHighlight(event) {
  const activeButton = event.target.closest(".button-feature");
  if (!activeButton) return;
  for (const btn of buttonFeature.children) {
    btn.removeAttribute("active");
  }
  activeButton.setAttribute("active", true);
}

// =======================================================================================

export function getButtonEdit(rowIndex, cellIndex) {
  // sau này thay key = feature name
  const attr = `type="feature" width="28px" height="28px"`;
  return `
         <img  ${attr} data-row-index=${rowIndex} data-column-index=${cellIndex} key="save" title="Save" class="save" src="./Assets/Icons/create-unactive-icon.svg" ></img>
         <img  ${attr} data-row-index=${rowIndex} data-column-index=${cellIndex} key="edit" title="Edit" class="edit active" src="./Assets/Icons/edit-active-icon.svg"  ></img>
         <img  ${attr} data-row-index=${rowIndex} data-column-index=${cellIndex} key="eraser" title="Eraser" class="eraser" src="./Assets/Icons/delete-icon.svg" ></img> 
         <img  ${attr} data-row-index=${rowIndex} data-column-index=${cellIndex} key="undo" title="Undo" class="undo" src="./Assets/Icons/undo-unactive-icon.svg"  ></img> 
         <img  ${attr} data-row-index=${rowIndex} data-column-index=${cellIndex} key="view-detail"  title="View Detail" class="view-detail" src="./Assets/Icons/view-detail-icon.svg"  ></img> 
    `;
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
