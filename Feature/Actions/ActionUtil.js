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
