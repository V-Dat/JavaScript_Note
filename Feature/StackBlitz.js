import { $ } from "./Util.js";

export function toggleStackBlitz() {
  const modalStackBlitz = $(".modal-stackblitz");
  const buttonStackBlitz = $(".open-stackblitz");
  modalStackBlitz.style.display === "none"
    ? showModal(modalStackBlitz, buttonStackBlitz)
    : hideModal(modalStackBlitz, buttonStackBlitz);
}

function hideModal(modalStackBlitz, buttonStackBlitz) {
  modalStackBlitz.style.display = "none";
  resetBodyCss();
  changeImageDefault(buttonStackBlitz);
}

function showModal(modalStackBlitz, buttonStackBlitz) {
  showStackBlitzWithoutScroll();
  modalStackBlitz.style.display = "block";
  changeImageActive(buttonStackBlitz);
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

function changeImageActive(buttonStackBlitz) {
  buttonStackBlitz.classList.add("active");
  buttonStackBlitz.src = "./Assets/sunny-icon.svg";
}
function changeImageDefault(buttonStackBlitz) {
  buttonStackBlitz.classList.remove("active");
  buttonStackBlitz.src = "./Assets/thunder-active-icon.svg";
}
