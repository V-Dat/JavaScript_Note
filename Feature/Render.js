import { getButtonEdit } from "./CellFeature.js";
import { saveLocalStorage } from "./FeatureLocalStorage.js";
import { hanlePreRender } from "./TextAreaCrud.js";

function processRow(data) {
  let tableRow = "";

  data.forEach((row) => {
    tableRow += `<tr data-key=${+row.index}><td class="column-stt">${
      row.index + 1
    }</td><td class="column-data column-method">${
      row.method
    }</td><td class="column-data column-syntax">${
      row.syntax
    }</td><td class="column-data column-equal">${
      row.equal
    }</td><td class="column-data column-description">${
      row.description
    }</td>${getButtonEdit(+row.index)}</tr>`;
  });
  return tableRow;
}

export function handleRender(data) {
  if (!data) return;
  const tableRow = processRow(data);
  const tbody = table.querySelector("tbody");
  tbody.insertAdjacentHTML("beforeend", tableRow);
}

export async function renderDataImport(event) {
  const fileList = await event.target.files[0];
  const url = URL.createObjectURL(fileList);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      hanlePreRender();
      handleRender(data);
      saveLocalStorage(data);
      return data;
    });
}
