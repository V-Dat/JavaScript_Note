import { countTimeSaveLocalStorage } from "./FeatureLocalStorage.js";
import { $ } from "./Util.js";

export function processDefaultState() {
  let app = this;
  app = {
    ...app,
    JsonData: { mainContent: "", dataTableBody: [] },
    editState: [],
    // isFillAllCrudState: false,
    counterId: null,
    activeRow: null,
  };
  $(".button-feature.button-feature__eraser").setAttribute("active", true);
  countTimeSaveLocalStorage(app);
  return app;
}
