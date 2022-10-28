import { handleRender } from "./Render.js";
import {
  $,
  $$,
  unActiveButtonEdit,
  activeButtonEdit,
  activeButtonSave,
  unActiveButtonSave,
  activeButtonCreate,
  unActiveButtonCreate,
  activeButtonEraserNewNode,
  unActiveButtonEraserNewNode,
  activeButtonEraserInput,
  activeButtonUndo,
  activeButtonDelete,
  unActiveButtonUndo,
  activeAllButtonEdit,
  decodeInnerHTML,
  highlightNode,
  activeButtonEditContent,
  activeButtonSaveEditContent,
} from "./Util.js";

const textAreaGroup = $$("textarea");

function getValueTextArea() {
  const dataAreaInput = {};
  textAreaGroup.forEach((item) => {
    dataAreaInput[item.dataset.key] = item.value;
  });
  return dataAreaInput;
}

export function handleResetInput() {
  for (let elem of textAreaGroup) {
    elem.value = "";
  }
}

export function handleSaveRecord(rowNode, app) {
  const isFillAll = app.isFillAllCrudState;
  if (!isFillAll || !rowNode) return;
  const textAreaInput = getValueTextArea();
  app.JsonData.methodHelper.push({
    ...textAreaInput,
    index: app.JsonData.methodHelper.length,
  });

  handleResetInput();
  handleRender(app.JsonData);
  app.isFillAllCrudState = false;
  unActiveButtonCreate(rowNode);
  unActiveButtonEraserNewNode(rowNode);
  // highlightNode($("table tbody"));
  app.render();
}

export function handleClickEraser(event, app) {
  const rowNode = event.target.closest("tr");
  if (rowNode && rowNode.getAttribute("isedit") !== "true") {
    handleDeleteRow(app, rowNode);
  } else {
    handleEraserValueInTextArea(rowNode);
  }
}
export function handleDeleteRow(app, rowNode) {
  const newData = app.JsonData.methodHelper.filter((item) => {
    return +item.index !== +getIndexRowEdit(rowNode);
  });
  app.JsonData.methodHelper = newData.map((item, index) => ({
    ...item,
    index: index,
  }));
  app.render();
}
export function handleEraserValueInTextArea(rowNode) {
  const textAreaGroup = rowNode.querySelectorAll("textarea");
  for (let i = 0; i < textAreaGroup.length; i++) {
    textAreaGroup[i].value = "";
  }
  textAreaGroup[0].focus();
}
export function handleSaveAfterEdit(event, app) {
  const rowNode = event.target.closest("tr");
  const isEdit = rowNode.getAttribute("isedit");
  if (isEdit === "false" || isEdit === null) return;

  const columnsData = rowNode.querySelectorAll(".column-data");

  rowNode.setAttribute("isedit", false);

  const indexOfRowEdit = getIndexRowEdit(rowNode);
  const objectDataEdit = app.JsonData.methodHelper[indexOfRowEdit];

  for (let i = 0; i < columnsData.length; i++) {
    const textAreaNode = columnsData[i].querySelector("textarea");
    const key = columnsData[i].dataset.key;
    objectDataEdit[key] = textAreaNode.value;
    columnsData[i].innerHTML = textAreaNode.value;
  }

  activeButtonEdit(rowNode);
  unActiveButtonSave(rowNode);
  activeButtonDelete(rowNode);
  unActiveButtonUndo(rowNode);
}
export function handleEditRow(event) {
  const rowNode = event.target.closest("tr");
  const isEdit = rowNode.getAttribute("isedit");
  if (isEdit === "true") return;

  activeAllButtonEdit();
  unActiveButtonEdit(rowNode);

  resetEditRow();
  unActiveButtonUndo();
  activeButtonSave(rowNode);
  activeButtonUndo(rowNode);
  activeButtonEraserInput(rowNode); // active button eraser => auto hide button delete

  const columnsData = rowNode.querySelectorAll(".column-data");
  rowNode.setAttribute("isedit", true);

  for (let i = 0; i < columnsData.length; i++) {
    const newNode = document.createElement("textarea");
    newNode.value = decodeInnerHTML(columnsData[i].innerHTML);
    columnsData[i].replaceChildren(newNode);
  }
}
export function handleClickUndo(event, app) {
  const rowNode = event.target.closest("tr");
  const isEdit = rowNode.getAttribute("isedit");
  if (isEdit === "false" || isEdit === null) return;

  const indexOfRowEdit = getIndexRowEdit(rowNode);
  const rowDataBeforeEdit = Object.values(
    app.JsonData.methodHelper[indexOfRowEdit]
  );
  const columnsData = rowNode.querySelectorAll(".column-data");

  for (let i = 0; i < columnsData.length; i++) {
    const textAreaNode = columnsData[i].querySelector("textarea");
    textAreaNode.value = rowDataBeforeEdit[i];
  }
}

export function hanlePreRender() {
  const listDataNodes = $$("table tr[data-key]");
  for (let i = 0; i < listDataNodes.length; i++) {
    listDataNodes[i].remove();
  }
}

function resetEditRow() {
  const rowNodeActive = $("tr[isedit=true]");
  if (!rowNodeActive) return;
  const columData = $$("tr[isedit=true] td.column-data");
  rowNodeActive.setAttribute("isedit", false);

  for (let i = 0; i < columData.length; i++) {
    const textAreaNode = columData[i].querySelector("textarea");
    columData[i].innerHTML = textAreaNode.value;
  }
}

export function handleEditMainContent(JsonData) {
  const mainContent = $(".main-content");
  const isEditing = mainContent.classList.contains("edit");
  const content = mainContent.innerHTML;

  if (isEditing) {
    mainContent.classList.remove("edit");
    const newContent = mainContent.children[0].value;
    mainContent.innerHTML = newContent;
    JsonData.mainContent = newContent;
    highlightNode(mainContent);
    activeButtonEditContent();
  } else {
    mainContent.classList.add("edit");
    mainContent.innerHTML = `<textarea style="width: 95%; max-width: 95%">${content}</textarea>`;
    activeButtonSaveEditContent();
  }
}

export function handleInputCrudTextArea(app) {
  const crudMethod = $(".crud-group .column-method textarea").value.length;
  const crudSyntax = $(".crud-group .column-syntax textarea").value.length;
  const crudDescription = $(".crud-group .column-description textarea").value
    .length;
  const crudEqual = $(".crud-group .column-equal textarea").value.length;
  const rowNode = $(".crud-group");
  if (crudMethod && crudSyntax && crudDescription && crudEqual) {
    activeButtonCreate(rowNode);
    activeButtonEraserNewNode(rowNode);
    return (app.isFillAllCrudState = true);
  } else if (crudMethod || crudSyntax || crudDescription || crudEqual) {
    activeButtonEraserNewNode(rowNode);
    unActiveButtonCreate(rowNode);
    return (app.isFillAllCrudState = false);
  } else {
    unActiveButtonCreate(rowNode);
    unActiveButtonEraserNewNode(rowNode);
    return (app.isFillAllCrudState = false);
  }
}

function getIndexRowEdit(rowNode) {
  return rowNode.dataset.key;
}
