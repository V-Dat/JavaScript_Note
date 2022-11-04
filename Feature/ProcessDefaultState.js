import { countTimeSaveLocalStorage } from "./FeatureLocalStorage.js";
import { buttonFeatureActive } from "./CellFeature.js";

export function processDefaultState(app) {
  buttonFeatureActive.setAttribute("active", true);
  countTimeSaveLocalStorage(app);
}
