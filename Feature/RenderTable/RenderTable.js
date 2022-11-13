import { saveDataUploadToLocalStore } from "../FeatureLocalStorage.js";
import { rendermainContent } from "../MainContent/RenderMainContent.js";
import { $, $$, highlightNode } from "../Util.js";
import { renderTableBody } from "./RenderBody.js";
import { renderFirstRowTable } from "./RenderFirstRow.js";
import { renderdataTableHeader } from "./RenderHeader.js";

export function handleRender(app) {
  renderdataTableHeader(app);
  renderFirstRowTable(app);
  renderTableBody(app);
  rendermainContent(app.JsonData?.mainContent);
}

export async function renderDataImport(event, app) {
  const fileList = await event.target.files[0];
  const url = URL.createObjectURL(fileList);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log("read data from import file");
      app.JsonData = JSON.parse(JSON.stringify(data));
      saveDataUploadToLocalStore(app, JSON.stringify(data));
      hanlePreRender();
      handleRender(app);
      highlightNode($("body"));
      // saveLocalStorage(data); // Do not save localStorage when open file
    });
}

export function hanlePreRender() {
  const listDataNodes = $$("table tr"); // tạm thời xóa hết sau này chỉ xóa data row
  for (let i = 0; i < listDataNodes.length; i++) {
    listDataNodes[i].remove();
  }
}
