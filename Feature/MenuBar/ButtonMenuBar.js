import { $ } from "../Util.js";

export function handleClickMenuBar() {
  const docBar = $(".switch-document-group .side-bar");
  const buttonSwitchDoc = $(".switch-document-group .btn-switch");
  const isShow = toggleNode(docBar);
  toggleNode($(".features-localstorage"), "flex"); // toggle feature localstore
  toggleNode($(".open-javascript-playgrounds")); // toggle feature playgrounds
  toggleNode($(".open-stackblitz")); // toggle feature stackbliz
  isShow ? fixedButton(buttonSwitchDoc) : absuluteNode(buttonSwitchDoc);
  embedDataMenu(); // handle chỉ đọc lần đầu tiên thôi
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

function embedDataMenu() {
  const emmbed = $(".switch-document-group .side-bar .embed");
  emmbed.innerHTML = processDataMenu();
}

function processDataMenu() {
  let html = "";
  DOCS.forEach((doc, index) => {
    html += `
    <div><label style="cursor:pointer" for=${doc.key}>
    <input style="cursor:pointer"name="document" type="radio" id=${
      doc.key
    }  value=${doc.name} ${index === 0 ? "checked" : ""}>${index + 1} - ${
      doc.name
    }</label>
    </div>
    `;
  });
  return html;
}

const DOCS = [
  {
    name: "Default",
    key: "Default",
  },
  {
    name: "Boolean",
    key: "Boolean",
  },
  {
    name: "Iterator",
    key: "Iterator",
  },
  {
    name: "Function",
    key: "Function",
  },
  {
    name: "HTTP",
    key: "HTTP",
  },
  {
    name: "String",
    key: "String",
  },
  {
    name: "Collections",
    key: "Collections",
  },
  {
    name: "Builtin Function",
    key: "Builtin_Function",
  },
  {
    name: "AJAX",
    key: "AJAX",
  },
];
