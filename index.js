import { buttonFeature, $, AlertAfterClose, $$ } from "./Feature/Util.js";
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
} from "./Feature/TextAreaCrud.js";

const downloadButton = $(".features-place");
const inputFile = $("#reading-file");
const table = $("#table");
const buttonEditmainContent = $(".button-edit-main-content");
const crudTextArea = $$(".crud-group textarea");

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
        handleRender(_this.JsonData);
      }
      return _this;
    });
  },

  render: function () {
    handleRender(this.JsonData);
  },
};

app.handler().firstRender();
