import { $, highlightNode } from "./Feature/Util.js";
import { readData } from "./Feature/FeatureLocalStorage.js";
import { handleRender } from "./Feature/Render.js";
import { hanlePreRender } from "./Feature/TextAreaCrud.js";
import { renderHeading } from "./Feature/RenderHeading.js";
import { processListener } from "./Feature/ProcessListener.js";
import { processDefaultState } from "./Feature/ProcessDefaultState.js";

const app = {
  handleState: processDefaultState,
  handler: processListener,
  firstRender: function () {
    const _this = this;
    readData().then((data) => {
      if (data) {
        _this.JsonData = JSON.parse(data);
        hanlePreRender();
        renderHeading(_this.JsonData);
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

app.handleState().handler().firstRender();
