import { countTimeSaveLocalStorage } from "./FeatureLocalStorage.js";
import { buttonFeatureActive } from "./CellFeature.js";

export function processDefaultState() {
  let app = this;
  app = {
    ...app,
    JsonData: { mainContent: "", dataTableBody: [] },
    editState: [],
    isFillAllCrudState: false,
    counterId: null,
    activeRow: null,
  };
  buttonFeatureActive.setAttribute("active", true);
  countTimeSaveLocalStorage(app);
  return app;
}
