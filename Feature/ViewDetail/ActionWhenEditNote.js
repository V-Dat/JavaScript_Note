import { getRowDataFromDB } from "../Actions/AccessData.js";
import { $ } from "../Util.js";
import { handleSaveNote } from "./SaveNote.js";

export function handleActionNote(event, app) {
  const targetNote = event.target.closest("img");
  if (!targetNote) return;
  switch (targetNote.getAttribute("type")) {
    case ACTION_NOTE.SAVE:
      handleSaveNote(app);
      break;
    case ACTION_NOTE.CLEAR:
      handleClearNote(app);
      break;
    case ACTION_NOTE.PREVIEW:
      console.log("in developing");
      break;
  }
}

export function hideEditNoteNode() {
  const editNode = $(".modal-row-detail .modal-row-detail-note");
  editNode.style.display = "none";
}

const ACTION_NOTE = {
  SAVE: "save-note",
  CLEAR: "clear-note",
  PREVIEW: "preview-note",
};
export function checkIsEditNote() {
  const editNode = $(".modal-row-detail .modal-row-detail-note");
  return editNode.style.display === "block";
}
