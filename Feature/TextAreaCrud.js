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
  highlightNode,
  activeButtonEditContent,
  activeButtonSaveEditContent,
} from "./Util.js";
import {
  showModalRowDetail,
  getDataRowNode,
  getRowDataActiveViewDetail,
} from "./ModalRowDetail.js";
import { toggleNode } from "./SwitchDocument.js";

function getValueTextArea() {
  const textAreaGroup = $$(".crud-group textarea");
  const dataAreaInput = {};
  textAreaGroup.forEach((item) => {
    dataAreaInput[item.dataset.key] = item.value;
  });
  return dataAreaInput;
}

export function handleResetInput() {
  const textAreaGroup = $$(".crud-group textarea");
  for (let elem of textAreaGroup) {
    elem.value = "";
  }
}

export function handleSaveRecord(rowNode, app) {
  const isFillAll = app.isFillAllCrudState;
  if (!isFillAll || !rowNode) return;
  const textAreaInput = getValueTextArea();

  if (app.JsonData.methodHelper) {
    app.JsonData.methodHelper.push({
      ...textAreaInput,
      index: app.JsonData.methodHelper.length,
    });
  } else {
    app.JsonData.methodHelper = [
      {
        ...textAreaInput,
        index: 0,
      },
    ];
  }

  handleResetInput();
  handleRender(app.JsonData);
  app.isFillAllCrudState = false;
  unActiveButtonCreate(rowNode);
  unActiveButtonEraserNewNode(rowNode);
  // highlightNode($("table tbody"));
  app.render();
}

export function handleClickEraser(rowNode, app) {
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
export function handleSaveAfterEdit(rowNode, app) {
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
export function handleEditRow(rowNode, app) {
  const isEdit = rowNode.getAttribute("isedit");
  if (isEdit === "true") return;

  app.activeRow = rowNode.dataset.key;
  activeAllButtonEdit();
  unActiveButtonEdit(rowNode);

  resetEditRow();
  unActiveButtonUndo();
  activeButtonSave(rowNode);
  activeButtonUndo(rowNode);
  activeButtonEraserInput(rowNode); // active button eraser => auto hide button delete

  replaceNodeWithTextareaNode(rowNode, app);
}
export function handleClickUndo(rowNode, app) {
  const isEdit = rowNode.getAttribute("isedit");
  if (isEdit === "false" || isEdit === null) return;

  const rowData = getDataRowNode(rowNode, app);

  const columnsData = rowNode.querySelectorAll(".column-data");

  for (let i = 0; i < columnsData.length; i++) {
    const textAreaNode = columnsData[i].querySelector("textarea");
    const textAreaValue = rowData[columnsData[i].dataset.key];
    textAreaNode.value = textAreaValue;
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

  if (isEditing) {
    mainContent.classList.remove("edit");
    const newContent = mainContent.children[0].value;
    mainContent.innerHTML = newContent;
    JsonData.mainContent = newContent;
    highlightNode(mainContent);
    activeButtonEditContent($(".button-edit-main-content"));
  } else {
    mainContent.classList.add("edit");
    mainContent.innerHTML = `<textarea style="width: 95%; max-width: 95%">${JsonData.mainContent}</textarea>`;
    activeButtonSaveEditContent($(".button-edit-main-content"));
  }
}

export function handleInputCrudTextArea(app) {
  const crudMethod = $(".crud-group .column-2 textarea").value.length;
  const crudSyntax = $(".crud-group .column-3 textarea").value.length;
  const crudDescription = $(".crud-group .column-5 textarea").value.length;
  const crudInvolved = $(".crud-group .column-4 textarea").value.length;
  const rowNode = $(".crud-group");
  if (crudMethod && crudSyntax && crudDescription && crudInvolved) {
    activeButtonCreate(rowNode);
    activeButtonEraserNewNode(rowNode);
    return (app.isFillAllCrudState = true);
  } else if (crudMethod || crudSyntax || crudDescription || crudInvolved) {
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

export function handleClickViewRow(rowNode, app) {
  const rowData = getDataRowNode(rowNode, app);
  setactiveRow(app, rowData.index);
  showModalRowDetail(rowData);
  toggleNode($(".switch-document-group .btn-switch"));
}

export function setactiveRow(app, index) {
  app.activeRow = index;
}

function replaceNodeWithTextareaNode(rowNode, app) {
  const columnsData = rowNode.querySelectorAll(".column-data");
  rowNode.setAttribute("isedit", true);
  const rowData = getRowDataActiveViewDetail(app); // row data in json file

  for (let i = 0; i < columnsData.length; i++) {
    const tdNode = rowNode.querySelector(
      `td[data-key=${columnsData[i].dataset.key}]`
    );
    tdNode.innerHTML = `<textarea>${
      rowData[columnsData[i].dataset.key]
    }</textarea>`;
  }
}
