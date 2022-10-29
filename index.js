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
import { embedProject, toggleStackBlitz } from "./Feature/StackBlitz.js";

const downloadButton = $(".features-place");
const inputFile = $("#reading-file");
const table = $("#table");
const buttonEditmainContent = $(".button-edit-main-content");
const crudTextArea = $$(".crud-group textarea");
const buttonOpenStackBlitz = $(".open-stackblitz");
buttonOpenStackBlitz.addEventListener("click", toggleStackBlitz);

const app = {
  JsonData: { mainContent: "", methodHelper: [] },
  editState: [],
  isFillAllCrudState: false,
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
    window.onload = embedProject;
    buttonOpenStackBlitz.addEventListener("click", toggleStackBlitz);

    return this;
  },

  defaultFeature: function () {
    buttonFeatureActive.setAttribute("active", true);
  },
  firstRender: function () {
    const _this = this;
    this.defaultFeature();
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
