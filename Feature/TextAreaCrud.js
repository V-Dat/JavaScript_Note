import {
  $,
  $$,
  highlightNode,
  activeButtonEditContent,
  activeButtonSaveEditContent,
} from "./Util.js";
import {
  showModalRowDetail,
  getDataRowNode,
  getRowData,
} from "./ModalRowDetail.js";
import { toggleNode } from "./SwitchDocument.js";

export function handleClickEraser(rowNode, app) {
  if (rowNode && rowNode.getAttribute("isedit") !== "true") {
    handleDeleteRow(app, rowNode);
  } else {
    handleEraserValueInTextArea(rowNode);
  }
}
export function handleDeleteRow(app, rowNode) {
  const newData = app.JsonData.dataTable.dataTableBody.filter((item) => {
    return +item.index !== +getIndexRowEdit(rowNode);
  });
  app.JsonData.dataTable.dataTableBody = newData.map((item, index) => ({
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
  // const listDataNodes = $$("table tr[data-key]");
  const listDataNodes = $$("table tr"); // tạm thời xóa hết sau này chỉ xóa data row
  for (let i = 0; i < listDataNodes.length; i++) {
    listDataNodes[i].remove();
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
export function setPreviousActiveRow(app, index) {
  app.previousActiveRow = +index;
}
