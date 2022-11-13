import { countTimeSaveLocalStorage } from "./FeatureLocalStorage.js";
import { $ } from "./Util.js";

export function processDefaultState() {
  let app = this;
  app = {
    ...app,
    JsonData: { mainContent: "", dataTableBody: [] },
    counterId: null,
    activeRow: null,
    previousActiveRow: null,
    document: localStorage.getItem("document")
      ? localStorage.getItem("document")
      : // : "Default",
        "String",
  };
  $(".button-feature.button-feature__eraser").setAttribute("active", true);
  countTimeSaveLocalStorage(app);
  return app;
}
