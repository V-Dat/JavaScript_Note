import { findNoteObject } from "../Actions/AccessData.js";
import { $ } from "../Util.js";
import { checkIsEditNote } from "./ActionWhenEditNote.js";
export function handleClickEditNote(app) {
  const isEditing = checkIsEditNote();
  if (isEditing) return;
  disableButtonWhenEditing();
  showEditNoteNode();
  const textareaNode = $(".modal-row-detail .modal-row-detail-note textarea");
  const noteObject = findNoteObject(app);
  textareaNode.value = noteObject.data || "";
  textareaNode.scrollIntoView();
}
function disableButtonWhenEditing() {
  const butthandleClickEditNote = $(".button-edit-note");
  const buttonCloseModalRowDetail = $(".button-close-modal-row-detail");
  butthandleClickEditNote.src = "./Assets/Icons/comment-unactive-icon.svg";
  buttonCloseModalRowDetail.src = "./Assets/Icons/home-unactive-icon.svg";
}
function showEditNoteNode() {
  const editNode = $(".modal-row-detail .modal-row-detail-note");
  editNode.style.display = "block";
}
