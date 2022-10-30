import { $ } from "./Util.js";

export function toggleStackBlitz() {
  const modalStackBlitz = $(".modal-stackblitz");
  const buttonStackBlitz = $(".open-stackblitz");
  const buttonOpenJSPlaygrounds = $(".open-JSPlaygrounds");

  if (modalStackBlitz.style.display === "none") {
    buttonOpenJSPlaygrounds.style.display = "none";
    showModal(modalStackBlitz, buttonStackBlitz, "./Assets/back-icon.svg");
  } else {
    buttonOpenJSPlaygrounds.style.display = "block";
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
  const buttonOpenJSPlaygrounds = $(".open-JSPlaygrounds");
  const JsPlaygroundsIframe = $(".modal-JSPlaygrounds iframe");
  console.log(333, JsPlaygroundsIframe);
  if (JsPlaygroundsIframe.src === "about:blank") {
    JsPlaygroundsIframe.src = "https://stephengrider.github.io/JSPlaygrounds/"; // reload frame
  }

  const buttonStackBlitz = $(".open-stackblitz");
  if (modalJSPlaygrounds.style.display === "none") {
    buttonStackBlitz.style.display = "none";
    showModal(
      modalJSPlaygrounds,
      buttonOpenJSPlaygrounds,
      "./Assets/back-icon.svg"
    );
  } else {
    buttonStackBlitz.style.display = "block";
    hideModal(
      modalJSPlaygrounds,
      buttonOpenJSPlaygrounds,
      "./Assets/Js-icon.svg"
    );
  }
}
