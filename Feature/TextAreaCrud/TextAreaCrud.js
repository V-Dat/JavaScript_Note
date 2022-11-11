import {
  $,
  highlightNode,
  activeButtonEditContent,
  activeButtonSaveEditContent,
} from "../Util.js";

export function handleEditMainContent(JsonData) {
  const mainContent = $(".main-content");
  const isEditing = mainContent.classList.contains("edit");

  if (isEditing) {
    mainContent.classList.remove("edit");
    const newContent = mainContent.children[0].value;
    mainContent.innerHTML = newContent;
    JsonData.mainContent = newContent;
    highlightNode(mainContent);
    activeButtonEditContent($(".button-edit-main-content"));
  } else {
    mainContent.classList.add("edit");
    mainContent.innerHTML = `<textarea style="width: 95%; max-width: 95%">${JsonData.mainContent}</textarea>`;
    activeButtonSaveEditContent($(".button-edit-main-content"));
  }
}
