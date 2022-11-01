import { toggleArrowBlock } from "./ArrowFeature.js";
import { $ } from "./Util.js";

export function toggleStackBlitz() {
  const modalStackBlitz = $(".modal-stackblitz");
  const buttonStackBlitz = $(".open-stackblitz");
  const buttonOpenJSPlaygrounds = $(".open-javascript-playgrounds");

  if (modalStackBlitz.style.display === "none") {
    buttonOpenJSPlaygrounds.style.display = "none";
    disableGitLabel();
    toggleArrowBlock(false);
    showModal(modalStackBlitz, buttonStackBlitz, "./Assets/back-icon.svg");
  } else {
    buttonOpenJSPlaygrounds.style.display = "block";
    enableGitLabel();
    toggleArrowBlock(true);
    hideModal(
      modalStackBlitz,
      buttonStackBlitz,
      "./Assets/thunder-active-icon.svg"
    );
  }
}

function hideModal(modal, button, src) {
  modal.style.display = "none";
  resetBodyCss();
  changeImageDefault(button, src);
}

function showModal(modal, button, src) {
  showStackBlitzWithoutScroll();
  modal.style.display = "block";
  changeImageActive(button, src);
}

function showStackBlitzWithoutScroll() {
  $(
    "body"
  ).style.cssText = `width: 100vw ; height: 100vh; overflow:hidden;margin: 0px`;
}
function resetBodyCss() {
  $(
    "body"
  ).style.cssText = `width: auto ; height: auto; overflow:unset; margin: 8px`;
}

function changeImageActive(button, src) {
  button.classList.add("active");
  button.src = src;
}
function changeImageDefault(button, src) {
  button.classList.remove("active");
  button.src = src;
}

// the id of "embed" with https://stackblitz.com/edit/js-vhav1j?file=index.js embedded in an iframe.
export function embedProject() {
  if (StackBlitzSDK) {
    StackBlitzSDK.embedProjectId("embed", "js-vhav1j", {
      openFile: "index.js",
    });
  }
}

// JS playgrounds
export function toggleJSPlaygrounds() {
  const modalJSPlaygrounds = $(".modal-JSPlaygrounds");
  const buttonOpenJSPlaygrounds = $(".open-javascript-playgrounds");
  const JsPlaygroundsIframe = $(".modal-JSPlaygrounds iframe");
  if (JsPlaygroundsIframe.src === "about:blank") {
    JsPlaygroundsIframe.src = "https://stephengrider.github.io/JSPlaygrounds/"; // reload frame
  }

  const buttonStackBlitz = $(".open-stackblitz");
  if (modalJSPlaygrounds.style.display === "none") {
    buttonStackBlitz.style.display = "none";
    disableGitLabel();
    toggleArrowBlock(false);
    showModal(
      modalJSPlaygrounds,
      buttonOpenJSPlaygrounds,
      "./Assets/back-icon.svg"
    );
  } else {
    buttonStackBlitz.style.display = "block";
    enableGitLabel();
    toggleArrowBlock(true);
    hideModal(
      modalJSPlaygrounds,
      buttonOpenJSPlaygrounds,
      "./Assets/Js-icon.svg"
    );
  }
}

function disableGitLabel() {
  const gitLabel = $(".github-cover");
  gitLabel.style.display = "none";
}

function enableGitLabel() {
  const gitLabel = $(".github-cover");
  gitLabel.style.display = "inline-block";
}

//
export function getDataRowNode(rowNode, app) {
  const rowData = app.JsonData.methodHelper.find(
    (item) => item.index === +rowNode.dataset.key
  );
  return rowData;
}
