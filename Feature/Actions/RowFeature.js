import { handleEraserNewRecord, handleSaveRecord } from "./ActionFirstRow.js";
import { handleEditRow } from "./EditRow.js";
import { handleSaveUpdateRecord } from "./SaveRow.js";

export function handleRowFeature(event, featureNode, app) {
  const feature = featureNode.getAttribute("key");
  switch (feature) {
    case FEATURE_NAME.SAVE_NEW:
      handleSaveRecord(event, app);
      break;
    case FEATURE_NAME.ERASER_NEW:
      handleEraserNewRecord(event);
      break;
    case FEATURE_NAME.SAVE:
      handleSaveUpdateRecord(event, app);
      break;
    case FEATURE_NAME.EDIT:
      handleEditRow(event, app);
      break;
    case FEATURE_NAME.ERASER:
      break;
    case FEATURE_NAME.UNDO:
      break;
    case FEATURE_NAME.VIEW_DETAIL:
      break;
  }
}

const FEATURE_NAME = {
  SAVE_NEW: "save-new",
  ERASER_NEW: "eraser-new",
  SAVE: "save",
  EDIT: "edit",
  ERASER: "eraser",
  UNDO: "undo",
  VIEW_DETAIL: "view-detail",
};
