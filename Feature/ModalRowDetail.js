import {
  limitHeightAndWidthBody,
  unlimitHeightAndWidthBody,
} from "./ModalPlaygrounds.js";
import { $ } from "./Util.js";

export function getDataRowNode(rowNode, app) {
  const rowData = app.JsonData.methodHelper.find(
    (item) => item.index === +rowNode.dataset.key
  );
  return rowData;
}

export function processDataModalDetail(rowData) {
  if (!rowData) return;
  const html = `
    <div class="content-method">
      ${rowData.method}
    </div>
    <div class="content-syntax">
      ${rowData.syntax}
    </div>
    <div class="content-equal">
      ${rowData.equal}
    </div>
    <div class="content-description">
      ${rowData.description}
    </div>`;

  return html;
}

export function showModalRowDetail(rowData) {
  limitHeightAndWidthBody();
  embedDataModalDetail(rowData);
  showNodeModalRowDetail();
  showButtonCloseModalRowDetail();
}

function showButtonCloseModalRowDetail() {
  const buttonCloseModal = $(".button-close-modal-row-detail");
  buttonCloseModal.style.display = "block";
}

export function hideModalRowDetail() {
  unlimitHeightAndWidthBody();
  hideButtonCloseModalRowDetail();
  hideNodeModalRowDetail();
}

export function hideButtonCloseModalRowDetail() {
  const buttonCloseModal = $(".button-close-modal-row-detail");
  buttonCloseModal.style.display = "none";
}

function embedDataModalDetail(rowData) {
  const embed = $(".modal-row-detail-content");
  embed.innerHTML = processDataModalDetail(rowData);
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
