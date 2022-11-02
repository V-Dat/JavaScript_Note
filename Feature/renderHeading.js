import { $ } from "./Util.js";

function changDocumentTitle(JsonData) {
  //   $("head").insertAdjacentHTML("beforeend", JsonData.documentTitle);
  document.title = JsonData.documentTitle;
}

function changeHeadingMethodHelper(JsonData) {
  $("h2.method-helper").innerHTML = JsonData.headingMethodHelper;
}

function changeHeadingMainContent(JsonData) {
  $(".content-notes h2").innerHTML = JsonData.headingMainContent;
}

export function renderHeading(JsonData) {
  changDocumentTitle(JsonData);
  changeHeadingMethodHelper(JsonData);
  changeHeadingMainContent(JsonData);
}
