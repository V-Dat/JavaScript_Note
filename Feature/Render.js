import { getButtonEdit } from "./CellFeature.js";
import { hanlePreRender } from "./TextAreaCrud.js";
import { $ } from "./Util.js";

function processRow(data) {
  let tableRow = "";
  data.forEach((row) => {
    tableRow += `<tr data-key=${+row.index}><td class="column-stt">${
      row.index + 1
    }</td><td class="column-data column-method" data-key="method">${
      row.method
    }</td><td class="column-data column-syntax" data-key="syntax">${
      row.syntax
    }</td><td class="column-data column-equal" data-key="equal">${
      row.equal
    }</td><td class="column-data column-description" data-key="description">${
      row.description
    }</td>${getButtonEdit(+row.index)}</tr>`;
  });
  return tableRow;
}

export function handleRender(data) {
  const tableRow = processRow(data.methodHelper);
  const tbody = table.querySelector("tbody");
  hanlePreRender();
  tbody.insertAdjacentHTML("beforeend", tableRow);

  /// first render and import data to render
  const previousContent = $(".main-content").innerHTML;
  if (data?.mainContent !== "" && previousContent !== data.mainContent) {
    rendermainContent(data.mainContent);
  }
}

export async function renderDataImport(event, app) {
  const fileList = await event.target.files[0];
  const url = URL.createObjectURL(fileList);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      hanlePreRender();
      app.JsonData = JSON.parse(JSON.stringify(data));
      handleRender(data);
      // saveLocalStorage(data); // Do not save localStorage when open file
    });
}

function rendermainContent(data) {
  const stringContent = $(".main-content");
  stringContent.innerHTML = data;
}
