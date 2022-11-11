import {
  limitHeightAndWidthBody,
  unlimitHeightAndWidthBody,
} from "./ModalPlaygrounds.js";
import { toggleNode } from "./SwitchDocument.js";
import { $, highlightNode } from "./Util.js";

export function processDataModalDetail(rowData) {
  if (!rowData) return;
  const html = `
    <div class="content-method">
      ${rowData.method}
    </div>
    <div class="content-syntax">
      <h2>I - Syntax  </h2>
      ${rowData.syntax}
    </div>
    <div class="content-involved">
      <h2>II - Involved </h2>
      ${rowData.involved}
    </div>
    <div class="content-description">
      <h2>III - Description  </h2>
      ${rowData.description}
    </div>
    <div class="content-note">${
      rowData.note ? `<h2>IV - Note </h2>${rowData.note}` : ""
    }</div>
    `;
  return html;
}

export function showModalRowDetail(rowData) {
  limitHeightAndWidthBody();
  showNodeModalRowDetail();
  showButtonCloseModalRowDetail();
  showButtonEditNote();
  embedDataModalDetail(rowData);
}

function showButtonCloseModalRowDetail() {
  const buttonCloseModal = $(".button-close-modal-row-detail");
  buttonCloseModal.style.display = "block";
}
function showButtonEditNote() {
  const buttonCloseModal = $(".button-edit-note");
  buttonCloseModal.style.display = "block";
}

export function hideModalRowDetail() {
  const isEditing = checkIsEditNote();
  if (isEditing) return;
  unlimitHeightAndWidthBody();
  hideButtonCloseModalRowDetail();
  hideNodeModalRowDetail();
  hideButtonEditNote();
  toggleNode($(".switch-document-group .btn-switch"));
}

export function hideButtonCloseModalRowDetail() {
  const buttonCloseModal = $(".button-close-modal-row-detail");
  buttonCloseModal.style.display = "none";
}

function hideButtonEditNote() {
  const buttonCloseModal = $(".button-edit-note");
  buttonCloseModal.style.display = "none";
}

function embedDataModalDetail(rowData) {
  const embed = $(".modal-row-detail-content");
  embed.innerHTML = processDataModalDetail(rowData);
  highlightNode(embed);
}

function showNodeModalRowDetail() {
  const modalDetail = $(".modal-row-detail");
  modalDetail.classList.add("active");
  modalDetail.style.display = "block";
}
export function hideNodeModalRowDetail() {
  const modalDetail = $(".modal-row-detail");
  modalDetail.style.display = "none";
  modalDetail.classList.remove("active");
}

export function onEditNote(app) {
  const isEditing = checkIsEditNote();
  if (isEditing) return;
  disableButtonWhenEditing();
  showEditNoteNode();
  const textareaNode = $(".modal-row-detail .modal-row-detail-note textarea");
  const rowData = getRowData(app);
  textareaNode.value = rowData.note || "";
  textareaNode.scrollIntoView();
}

function showEditNoteNode() {
  const editNode = $(".modal-row-detail .modal-row-detail-note");
  editNode.style.display = "block";
}
export function hideEditNoteNode() {
  const editNode = $(".modal-row-detail .modal-row-detail-note");
  editNode.style.display = "none";
}
export function getRowData(app) {
  const rowData = app.JsonData.methodHelper.find(
    (row) => row.index === +app.activeRow
  );
  return rowData;
}

export function saveRowData(app) {
  const textareaNode = $(".modal-row-detail .modal-row-detail-note textarea");
  const rowData = getRowData(app);
  if (!rowData) return;
  rowData.note = textareaNode.value;
  textareaNode.value = "";
  return rowData;
}

export function clearNote(JsonData) {
  const textareaNode = $(".modal-row-detail .modal-row-detail-note textarea");
  JsonData.node = "";
  textareaNode.value = "";
  textareaNode.focus();
}

export function handleActionNote(event, app) {
  const targetNote = event.target.closest("img");
  if (!targetNote) return;
  switch (targetNote.getAttribute("type")) {
    case "action__send": {
      const rowData = saveRowData(app);
      if (!rowData) return;
      hideEditNoteNode();
      embedDataModalDetail(rowData);
      enableButtonWhenFinishedEdit();
      break;
    }
    case "action__clear":
      clearNote(app);
      break;
    case "action__preview":
      console.log("in developing");
      break;
  }
}
export function getDataRowNode(rowNode, app) {
  const rowData = app.JsonData.methodHelper.find(
    (item) => item.index === +rowNode.dataset.key
  );
  return rowData;
}

function checkIsEditNote() {
  const editNode = $(".modal-row-detail .modal-row-detail-note");
  return editNode.style.display === "block";
}
function enableButtonWhenFinishedEdit() {
  const buttonEditNote = $(".button-edit-note");
  const buttonCloseModalRowDetail = $(".button-close-modal-row-detail");
  buttonEditNote.src = "./Assets/Icons/comment-active-icon.svg";
  buttonCloseModalRowDetail.src = "./Assets/Icons/home-active-icon.svg";
}

function disableButtonWhenEditing() {
  const buttonEditNote = $(".button-edit-note");
  const buttonCloseModalRowDetail = $(".button-close-modal-row-detail");
  buttonEditNote.src = "./Assets/Icons/comment-unactive-icon.svg";
  buttonCloseModalRowDetail.src = "./Assets/Icons/home-unactive-icon.svg";
}
