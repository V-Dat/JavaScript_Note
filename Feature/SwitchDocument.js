import { $ } from "./Util.js";
export function onClickSwitchDoc() {
  const docBar = $(".switch-document-group .side-bar");
  const buttonSwitchDoc = $(".switch-document-group .btn-switch");
  const isShow = toggleNode(docBar);
  toggleNode($(".features-localstorage"), "flex"); // toggle feature localstore
  toggleNode($(".open-javascript-playgrounds")); // toggle feature playgrounds
  toggleNode($(".open-stackblitz")); // toggle feature stackbliz
  isShow ? fixedButton(buttonSwitchDoc) : absuluteNode(buttonSwitchDoc);
}

export function toggleNode(node, dispay = "block") {
  let isShow = false;
  if (node.style.display === "none") {
    node.style.display = dispay;
    isShow = true;
  } else {
    node.style.display = "none";
  }
  return isShow;
}

function fixedButton(node) {
  node.style.position = "fixed";
}

function absuluteNode(node) {
  node.style.position = "absolute";
}
