import { $ } from "../Util.js";

export function rendermainContent(mainContent) {
  const mainContentNode = $(".main-content");
  if (mainContent !== "" && mainContentNode.innerHTML !== mainContent) {
    mainContentNode.innerHTML = mainContent;
  }
}
