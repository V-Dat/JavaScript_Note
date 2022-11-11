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
  BUTTON_FEATURE,
  buttonFeature,
  unActiveButtonEraserNewNode,
  unActiveButtonCreate,
  highlightNode,
  $,
} from "./Util.js";
export let buttonFeatureActive = BUTTON_FEATURE.ERASER;

export function handleClickOnTable(event, app) {
  const isClickOnFeature = event.target.closest(`img[type="feature"]`);
  const featureNode = isClickOnFeature;
  const isClickOnCell = event.target.closest(`td[type="cell"]`);
  const cellNode = isClickOnCell;
  if (isClickOnCell) {
    handlePaintTable(cellNode, app);
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
  buttonFeatureActive = activeButton;
}

// =======================================================================================

export function getButtonEdit(row, index) {
  return `<td type="cell" data-index=${
    +index + 1
  }  data-column-name="column-6" class="cell column-6 button-actions"  data-key="actions"  style="background-color:${
    row[`column-${+index + 1}-bg`] || "color"
  }" >
         <img type="feature" key=${
           +index + 1
         } title="Save" class="save" src="./Assets/Icons/create-unactive-icon.svg" width="28px" height="28px"></img>
         <img type="feature" key=${
           +index + 1
         } title="Edit" class="edit active" src="./Assets/Icons/edit-active-icon.svg" width="28px" height="28px" ></img>
         <img type="feature" key=${
           +index + 1
         } title="Eraser" class="eraser" src="./Assets/Icons/delete-icon.svg" width="28px" height="28px"></img> 
         <img type="feature" key=${
           +index + 1
         } title="Undo" class="undo" src="./Assets/Icons/undo-unactive-icon.svg" width="28px" height="28px" ></img> 
         <img type="feature" key=${
           +index + 1
         } title="View Detail" class="view-detail" src="./Assets/Icons/view-detail-icon.svg" width="28px" height="28px" ></img> 
      </td>`;
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
