import {
  buttonFeature,
  $,
  AlertAfterClose,
  $$,
  highlightNode,
} from "./Feature/Util.js";
import {
  readData,
  handleClickFeaturesPlace,
  countTimeSaveLocalStorage,
} from "./Feature/FeatureLocalStorage.js";
import { handleRender, renderDataImport } from "./Feature/Render.js";
import {
  handleLeftClickTable,
  selectFeatureHighlight,
  buttonFeatureActive,
} from "./Feature/CellFeature.js";
import {
  handleEditMainContent,
  handleInputCrudTextArea,
  hanlePreRender,
} from "./Feature/TextAreaCrud.js";
import {
  embedProject,
  toggleJSPlaygrounds,
  toggleStackBlitz,
} from "./Feature/StackBlitz.js";
import {
  arrowFeature,
  handleClickArrowFeature,
} from "./Feature/ArrowFeature.js";
const downloadButton = $(".features-place");
const inputFile = $("#reading-file");
const table = $("#table");
const buttonEditmainContent = $(".button-edit-main-content");
const crudTextArea = $$(".crud-group textarea");
const buttonOpenStackBlitz = $(".open-stackblitz");
const buttonOpenJSPlaygrounds = $(".open-JSPlaygrounds");
const arrowFeatureBlock = $(".arrow-features");

const app = {
  JsonData: { mainContent: "", methodHelper: [] },
  editState: [],
  isFillAllCrudState: false,
  counterId: null,
  handler: function () {
    const _this = this;
    downloadButton.addEventListener("click", (event) => {
      handleClickFeaturesPlace(event, _this);
    });

    table.addEventListener("click", (event) =>
      handleLeftClickTable(event, _this)
    );
    buttonFeature.addEventListener("click", selectFeatureHighlight);
    window.addEventListener("beforeunload", AlertAfterClose);

    inputFile.addEventListener("change", (event) =>
      renderDataImport(event, _this)
    );
    buttonEditmainContent.addEventListener("click", () =>
      handleEditMainContent(_this.JsonData)
    );
    crudTextArea.forEach((item) => {
      item.addEventListener("input", () => handleInputCrudTextArea(_this));
    });
    buttonOpenStackBlitz.addEventListener("click", toggleStackBlitz);
    buttonOpenJSPlaygrounds.addEventListener("click", toggleJSPlaygrounds);
    arrowFeatureBlock.addEventListener("click", handleClickArrowFeature);
    window.onload = embedProject;
    window.onscroll = arrowFeature;

    return this;
  },

  defaultFeature: function (app) {
    buttonFeatureActive.setAttribute("active", true);
    countTimeSaveLocalStorage(app);
  },
  firstRender: function () {
    const _this = this;
    this.defaultFeature(_this);
    readData().then((data) => {
      if (data) {
        _this.JsonData = JSON.parse(data);
        hanlePreRender();
        handleRender(_this.JsonData);
        highlightNode($("body"));
      }
      return _this;
    });
  },

  render: function () {
    hanlePreRender();
    handleRender(this.JsonData);
    highlightNode($("body"));
  },
};

app.handler().firstRender();
