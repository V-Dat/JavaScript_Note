export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export const buttonActions = $(".button-actions");

export function AlertAfterClose(event) {
  event.preventDefault();
  // return (event.returnValue = "Before closing, Saving data first !");
}

//================= active & unactive ============================

export function decodeInnerHTML(str) {
  return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}

export function highlightNode(node) {
  node.querySelectorAll("pre code:not(.hljs)").forEach((el) => {
    hljs.highlightElement(el);
  });
}

export function activeButtonSaveEditContent(button) {
  button.src = "./Assets/Icons/save-main-content-icon.svg";
  button.title = "save content";
}

export function activeButtonEditContent(button) {
  button.src = "./Assets/Icons/pen-icon.svg";
  button.title = "edit content";
}
