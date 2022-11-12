function handleClearNote(JsonData) {
  const textareaNode = $(".modal-row-detail .modal-row-detail-note textarea");
  //   JsonData.node = ""; đang sai
  textareaNode.value = "";
  textareaNode.focus();
}
