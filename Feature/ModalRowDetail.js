import {
  limitHeightAndWidthBody,
  unlimitHeightAndWidthBody,
} from "./ModalPlaygrounds.js";
import { toggleNode } from "./SwitchDocument.js";
import { $, highlightNode } from "./Util.js";
import { checkIsEditNote } from "./ViewDetail/ActionWhenEditNote.js";

export function processDataModalDetail(rowData) {
  if (!rowData) return;
  let html = ``;
  rowData.forEach((cellData) => {
    if (cellData.show.includes("detail")) {
      html += `
      <div class="content-${cellData.name}">
      <h2>${
        cellData.name === "note" ? cellData.index - 1 : cellData.index
      } - ${cellData.name.toUpperCase()}  </h2>
      ${cellData.data}
      </div>
      `;
    }
  });
  return html;
}

export function showModalRowDetail(rowData) {
  limitHeightAndWidthBody();
  showNodeModalRowDetail();
  showButtonCloseModalRowDetail();
  showButthandleClickEditNote();
  embedDataModalDetail(rowData);
}

function showButtonCloseModalRowDetail() {
  const buttonCloseModal = $(".button-close-modal-row-detail");
  buttonCloseModal.style.display = "block";
}
function showButthandleClickEditNote() {
  const buttonCloseModal = $(".button-edit-note");
  buttonCloseModal.style.display = "block";
}

export function hideModalRowDetail() {
  const isEditing = checkIsEditNote();
  if (isEditing) return;
  unlimitHeightAndWidthBody();
  hideButtonCloseModalRowDetail();
  hideNodeModalRowDetail();
  hideButthandleClickEditNote();
  toggleNode($(".switch-document-group .btn-switch"));
}

export function hideButtonCloseModalRowDetail() {
  const buttonCloseModal = $(".button-close-modal-row-detail");
  buttonCloseModal.style.display = "none";
}

function hideButthandleClickEditNote() {
  const buttonCloseModal = $(".button-edit-note");
  buttonCloseModal.style.display = "none";
}

export function embedDataModalDetail(rowData) {
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
