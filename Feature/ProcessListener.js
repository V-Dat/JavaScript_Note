import { $, AlertAfterClose } from "./Util.js";
import { handleClickFeaturesPlace } from "./FeatureLocalStorage.js";
import { renderDataImport } from "./RenderTable/RenderTable.js";
import { handleClickOnTable, selectFeatureHighlight } from "./CellFeature.js";
import {
  embedProject,
  toggleJSPlaygrounds,
  toggleStackBlitz,
} from "./ModalPlaygrounds.js";
import { arrowFeature, handleClickArrowFeature } from "./ArrowFeature.js";
import { hideModalRowDetail } from "./ModalRowDetail.js";
import {
  onChangeHeadingContent,
  onChangeHeadingMethod,
} from "./RenderHeading.js";
import { onChangeReferanceContent } from "./Referance.js";
import { handleEditMainContent } from "./TextAreaCrud/TextAreaCrud.js";
import { handleActionNote } from "./ViewDetail/ActionWhenEditNote.js";
import { handleClickEditNote } from "./ViewDetail/EditNote.js";
import { handleClickMenuBar } from "./MenuBar/ButtonMenuBar.js";
import { handleRadioDocument } from "./MenuBar/RadioDocument.js";
const buttonFeatureLocalStorage = $(".features-localstorage");
const inputFile = $("#reading-file");
const table = $("#table");
const buttonEditmainContent = $(".button-edit-main-content");
const buttonOpenStackBlitz = $(".open-stackblitz");
const buttonOpenJSPlaygrounds = $(".open-javascript-playgrounds");
const arrowFeatureBlock = $(".arrow-features");
const buttonCloseModalRowDetail = $(".button-close-modal-row-detail");
const buttonEditHeadingContent = $(".content-notes .btn-edit");
const buttonEditHeadingMethod = $(".heading-method-group .btn-edit");
const buttonEditReferance = $(".referance-section .btn-edit");
const butthandleClickEditNote = $(".button-edit-note");
const actionsNote = $(".note-block .actions");
const buttonSwitchDoc = $(".switch-document-group .btn-switch");
const buttonFeature = $(".button-feature-group");
const radioDocument = $(".switch-document-group .side-bar .embed");
export function processListener() {
  const _this = this;
  buttonFeatureLocalStorage.addEventListener("click", (event) => {
    handleClickFeaturesPlace(event, _this);
  });
  table.addEventListener("click", (event) => handleClickOnTable(event, _this));

  buttonFeature.addEventListener("click", selectFeatureHighlight);
  window.addEventListener("beforeunload", AlertAfterClose);

  inputFile.addEventListener("change", (event) =>
    renderDataImport(event, _this)
  );
  buttonEditmainContent.addEventListener("click", () =>
    handleEditMainContent(_this.DB)
  );

  buttonOpenStackBlitz.addEventListener("click", toggleStackBlitz);
  buttonOpenJSPlaygrounds.addEventListener("click", toggleJSPlaygrounds);
  arrowFeatureBlock.addEventListener("click", handleClickArrowFeature);
  window.onload = embedProject;
  window.onscroll = arrowFeature;
  buttonCloseModalRowDetail.addEventListener("click", hideModalRowDetail);
  buttonEditHeadingContent.addEventListener("click", () =>
    onChangeHeadingContent(_this.DB)
  );
  buttonEditHeadingMethod.addEventListener("click", () =>
    onChangeHeadingMethod(_this.DB)
  );
  buttonEditReferance.addEventListener("click", () =>
    onChangeReferanceContent(_this.DB)
  );
  butthandleClickEditNote.addEventListener("click", () =>
    handleClickEditNote(_this)
  );
  actionsNote.addEventListener("click", (event) =>
    handleActionNote(event, _this)
  );
  buttonSwitchDoc.addEventListener("click", () => handleClickMenuBar(_this));
  radioDocument.addEventListener("click", (event) =>
    handleRadioDocument(event, _this)
  );

  return this;
}
