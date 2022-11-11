import {
  findNoteObject,
  getRowDataShowInDetail,
} from "../Actions/AccessData.js";
import { embedDataModalDetail } from "../ModalRowDetail.js";
import { $ } from "../Util.js";
import { hideEditNoteNode } from "./ActionWhenEditNote.js";

export function handleSaveNote(app) {
  saveRowData(app);
  const rowData = getRowDataShowInDetail(app);
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
  const objectNote = findNoteObject(app);
  if (!objectNote) return;
  objectNote.data = textareaNode.value;
  textareaNode.value = "";
}
