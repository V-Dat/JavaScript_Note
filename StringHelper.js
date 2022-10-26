import { buttonFeature, $ } from "./Feature/util.js";
import {
  downloadJson,
  saveLocalStorage,
  cleanupLocalStorage,
  readData,
} from "./Feature/FeatureLocalStorage.js";
import { handleRender, renderDataImport } from "./Feature/Render.js";
import {
  handleLeftClickTable,
  selectFeatureHighlight,
  buttonFeatureActive,
} from "./Feature/CellFeature.js";

function AlertAfterClose(event) {
  event.preventDefault();
}

const downloadButton = $(".button-download");
const buttonSaveLocalStorage = $(".button-save-local-storage");
const buttonCleanUpStorage = $(".button-cleanup-local-storage");
const inputFile = $("#reading-file");
const table = $("#table");

const app = {
  StringHelperData: [],
  handler: function () {
    const _this = this;
    downloadButton.addEventListener("click", () => {
      downloadJson(_this.StringHelperData);
    });

    buttonSaveLocalStorage.addEventListener("click", () => {
      console.log(_this.StringHelperData);
      saveLocalStorage(_this.StringHelperData);
    });

    buttonCleanUpStorage.addEventListener("click", () => {
      cleanupLocalStorage(_this.StringHelperData);
    });

    table.addEventListener("click", (event) =>
      handleLeftClickTable(event, _this)
    );
    buttonFeature.addEventListener("click", selectFeatureHighlight);
    window.addEventListener("beforeunload", AlertAfterClose);
    inputFile.addEventListener("change", renderDataImport);
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
        _this.StringHelperData = JSON.parse(data);
        handleRender(_this.StringHelperData);
      }
    });
    return this;
  },

  render: function () {
    handleRender(this.StringHelperData);
  },
};

app.handler().firstRender();
