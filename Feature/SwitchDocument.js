import { $ } from "./Util.js";
export function onClickSwitchDoc() {
  const docBar = $(".switch-document-group .side-bar");
  const buttonSwitchDoc = $(".switch-document-group .btn-switch");
  const isShow = toggleNode(docBar);
  toggleNode($(".features-localstorage"), "flex"); // hide feature localstore
  isShow ? fixedButton(buttonSwitchDoc) : absuluteNode(buttonSwitchDoc);
}

function toggleNode(node, dispay = "block") {
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
