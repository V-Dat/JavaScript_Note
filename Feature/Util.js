export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export const buttonFeature = $(".button-feature");
export const buttonActions = $(".button-actions");

export const BUTTON_FEATURE = {
  ROW: buttonFeature.children[0],
  CELL: buttonFeature.children[1],
  ERASER: buttonFeature.children[2],
};

export const BUTTON_ACTIONS = {
  SAVE: buttonActions.children[0],
  EDIT: buttonActions.children[1],
};
