export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export const buttonFeature = $(".button-feature-group");
export const buttonActions = $(".button-actions");

export const BUTTON_FEATURE = {
  ROW: buttonFeature.children[0],
  CELL: buttonFeature.children[1],
  ERASER: buttonFeature.children[2],
};

export const BUTTON_ACTIONS = {
  SAVE: buttonActions.children[0],
  EDIT: buttonActions.children[1],
};

export function AlertAfterClose(event) {
  event.preventDefault();
  return (event.returnValue = "Before closing, Saving data first !");
}

//================= active & unactive ============================

export function unActiveButtonEdit(rowNode) {
  if (!rowNode) return;
  const editNote = rowNode.querySelector(".edit");
  editNote.classList.remove("active");
  editNote.src = "./Assets/Icons/edit-unactive-icon.svg";
}

export function activeButtonEdit(rowNode) {
  if (!rowNode) return;
  const editNote = rowNode.querySelector(".edit");
  editNote.classList.add("active");
  editNote.src = "./Assets/Icons/edit-active-icon.svg";
}

export function activeButtonSave(rowNode) {
  if (!rowNode) return;
  const saveNode = rowNode.querySelector(".save");
  saveNode.classList.add("active");
  saveNode.src = "./Assets/Icons/create-active-icon.svg";
}
export function unActiveButtonSave(rowNode) {
  if (!rowNode) return;
  const saveNode = rowNode.querySelector(".save.active");
  saveNode.classList.remove("active");
  saveNode.src = "./Assets/Icons/create-unactive-icon.svg";
}

export function activeButtonCreate(rowNode) {
  if (!rowNode) return;
  const createNode = rowNode.querySelector(".save-new-record");
  createNode.classList.add("active");
  createNode.src = "./Assets/Icons/create-active-icon.svg";
}
export function unActiveButtonCreate(rowNode) {
  if (!rowNode) return;
  const createNode = rowNode.querySelector(".save-new-record.active");
  if (!createNode) return;
  createNode.classList.remove("active");
  createNode.src = "./Assets/Icons/create-unactive-icon.svg";
}

export function activeButtonEraserNewNode(rowNode) {
  if (!rowNode) return;
  const eraserNewNode = rowNode.querySelector(".clear-new-node");
  eraserNewNode.classList.add("active");
  eraserNewNode.src = "./Assets/Icons/eraser-active-icon.svg";
}

export function unActiveButtonEraserNewNode(rowNode) {
  if (!rowNode) return;
  const eraserNewNode = rowNode.querySelector(".clear-new-node.active");
  if (!eraserNewNode) return;
  eraserNewNode.classList.remove("active");
  eraserNewNode.src = "./Assets/Icons/eraser-unactive-icon.svg";
}
export function activeButtonEraserInput(node) {
  if (!node) return;
  const eraserNode = node.querySelector("img.eraser");
  eraserNode.src = "./Assets/Icons/eraser-active-icon.svg";
}

export function activeButtonUndo(node) {
  if (!node) return;
  const undoNode = node.querySelector("img.undo");
  undoNode.classList.add("active");
  undoNode.src = "./Assets/Icons/undo-active-icon.svg";
}

export function activeButtonDelete(node) {
  if (!node) return;
  const eraserNode = node.querySelector("img.eraser");
  eraserNode.src = "./Assets/Icons/delete-icon.svg";
}

export function unActiveButtonUndo() {
  const undoNode = document.querySelector("img.undo.active");
  if (!undoNode) return;
  undoNode.classList.remove("active");
  undoNode.src = "./Assets/Icons/undo-unactive-icon.svg";
}

export function activeAllButtonEdit() {
  const buttonActiveNode = $(".button-actions img:not(.active).edit");
  if (!buttonActiveNode) return;
  buttonActiveNode.classList.add("active");
  buttonActiveNode.src = "./Assets/Icons/edit-active-icon.svg";
}

export function decodeInnerHTML(str) {
  return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}

export function highlightNode(node) {
  node.querySelectorAll("pre code:not(.hljs)").forEach((el) => {
    hljs.highlightElement(el);
  });
}

export function activeButtonSaveEditContent(button) {
  button.src = "./Assets/Icons/save-main-content-icon.svg";
  button.title = "save content";
}

export function activeButtonEditContent(button) {
  button.src = "./Assets/Icons/pen-icon.svg";
  button.title = "edit content";
}
