import { handleRender } from "./Render.js";
import { $, $$ } from "./Util.js";
const textAreaGroup = $$("textarea");

function getValueTextArea() {
  const dataAreaInput = {};
  textAreaGroup.forEach((item) => {
    dataAreaInput[item.dataset.key] = item.value;
  });
  return dataAreaInput;
}

export function isFillAllInput() {
  const textAreaInput = getValueTextArea();
  const isFillAllInput = Object.values(textAreaInput).every((item) => {
    return item !== "";
  });
  return isFillAllInput;
}
export function handleResetInput() {
  for (let elem of textAreaGroup) {
    elem.value = "";
  }
}
export function handleSaveRecord(app) {
  const isFillAll = isFillAllInput();
  const textAreaInput = getValueTextArea();
  if (!isFillAll) return;
  app.StringHelperData.push({
    ...textAreaInput,
    index: app.StringHelperData.length,
  });

  handleRender([{ ...textAreaInput, index: +app.StringHelperData.length - 1 }]);
  handleResetInput();
}

export function handleClickEraser(node, app) {
  const rowNode = node.parentNode.parentNode;
  if (rowNode.getAttribute("isedit") !== "true") {
    handleDeleteRow(app, node);
  } else {
    handleEraserValueInTextArea(rowNode);
  }
}
export function handleDeleteRow(app, node) {
  const newData = app.StringHelperData.filter(
    (item) => item.index !== +node.getAttribute("key")
  );
  app.StringHelperData = newData.map((item, index) => ({
    ...item,
    index: index,
  }));
  hanlePreRender();
  app.render();
}
export function handleEraserValueInTextArea(rowNode) {
  const textAreaGroup = rowNode.querySelectorAll("textArea");
  for (let i = 0; i < textAreaGroup.length; i++) {
    textAreaGroup[i].value = "";
  }
  textAreaGroup[0].focus();
}
export function handleSaveAfterEdit(node) {
  const rowNode = node.parentNode.parentNode;
  const isEdit = rowNode.getAttribute("isedit");
  if (isEdit === "false" || isEdit === null) return;

  const columnsData = rowNode.querySelectorAll(".column-data");

  rowNode.setAttribute("isedit", false);
  for (let i = 0; i < columnsData.length; i++) {
    columnsData[i].innerHTML = columnsData[i].children[0].value;
  }
}
export function handleEditRow(node) {
  const rowNode = node.parentNode.parentNode;

  const columnsData = rowNode.querySelectorAll(".column-data");
  resetEditRow(node);
  rowNode.setAttribute("isedit", "true");
  for (let i = 0; i < columnsData.length; i++) {
    const newNode = document.createElement("textArea");
    newNode.value = columnsData[i].innerHTML;
    columnsData[i].replaceChildren(newNode);
  }
}

export function hanlePreRender() {
  const listDataNodes = $$("tr[data-key]");
  for (let i = 0; i < listDataNodes.length; i++) {
    listDataNodes[i].remove();
  }
}

function resetEditRow(node) {
  const editNode = $("tr[isedit=true]");
  if (!editNode) return;

  const eraserNode = editNode.querySelector("img[type=eraser]");
  eraserNode.src = "./Assets/delete-icon.svg";

  const columData = $$("tr[isedit=true] td.column-data");
  editNode.setAttribute("isedit", false);

  for (let i = 0; i < columData.length; i++) {
    const textAreaNode = columData[i].querySelector("textArea");
    columData[i].innerHTML = textAreaNode.value;
  }
}
