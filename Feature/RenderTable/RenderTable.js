import { rendermainContent } from "../MainContent/RenderMainContent.js";
import { hanlePreRender } from "../TextAreaCrud.js";
import { $, highlightNode } from "../Util.js";
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
      hanlePreRender();
      handleRender(app);
      highlightNode($("body"));
      // saveLocalStorage(data); // Do not save localStorage when open file
    });
}
