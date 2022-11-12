import { handleEraserNewRecord, handleSaveRecord } from "./ActionFirstRow.js";

export function handleRowFeature(event, featureNode, app) {
  // console.log(333, event, featureNode, app);
  const feature = featureNode.getAttribute("key");
  switch (feature) {
    case FEATURE_NAME.SAVE_NEW:
      handleSaveRecord(event, app);
      break;
    case FEATURE_NAME.ERASER_NEW:
      handleEraserNewRecord(event);
      break;
    case FEATURE_NAME.SAVE:
      break;
    case FEATURE_NAME.EDIT:
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
