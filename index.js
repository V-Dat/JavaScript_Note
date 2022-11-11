import { $, highlightNode } from "./Feature/Util.js";
import { readData } from "./Feature/FeatureLocalStorage.js";
import {
  handleRender,
  hanlePreRender,
} from "./Feature/RenderTable/RenderTable.js";
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
        hanlePreRender(); // xóa hết row
        renderHeading(_this.JsonData); // render heading từ db
        handleRender(_this);
        highlightNode($("body"));
      }
      return _this;
    });
    return _this;
  },
  render: function () {
    hanlePreRender();
    handleRender(this);
    highlightNode($("body"));
  },
};

app.handleState().firstRender().handler();
