import { getRowDataFromDB } from "../Actions/AccessData.js";
import { embedDataModalDetail } from "../ModalRowDetail.js";
import { hideEditNoteNode } from "./ActionWhenEditNote.js";

export function handleSaveNote() {
  const rowData = saveRowData(app);
  if (!rowData) return;
  hideEditNoteNode();
  embedDataModalDetail(rowData);
  enableButtonWhenFinishedEdit();
}
function enableButtonWhenFinishedEdit() {
  const butthandleClickEditNote = $(".button-edit-note");
  const buttonCloseModalRowDetail = $(".button-close-modal-row-detail");
  butthandleClickEditNote.src = "./Assets/Icons/comment-active-icon.svg";
  buttonCloseModalRowDetail.src = "./Assets/Icons/home-active-icon.svg";
}
function saveRowData(app) {
  const textareaNode = $(".modal-row-detail .modal-row-detail-note textarea");
  const rowData = getRowDataFromDB(app);
  if (!rowData) return;
  rowData.note = textareaNode.value;
  textareaNode.value = "";
  return rowData;
}
