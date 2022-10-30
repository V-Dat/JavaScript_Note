import { readTextFile, downloadFile } from "./ControlFile.js";

function downloadJson(JsonData) {
  const data = JSON.stringify(JsonData);
  downloadFile(data, "JsonData.json");
}

function saveLocalStorage(JsonData) {
  const data = JSON.stringify(JsonData);
  localStorage.setItem("data", data);
  console.log("save local successed");
}

function cleanupLocalStorage() {
  localStorage.removeItem("data");
  console.log("cleaning successed");
}

function readLocalStorage() {
  const data = localStorage.getItem("data") ? localStorage.getItem("data") : [];
  return data;
}

export function readData() {
  let data = readLocalStorage();
  if (data.length === 0) {
    console.log("read data from default file");
    return readTextFile("./JsonData.json");
  }

  console.log("read data from local store");
  return new Promise((resolve) => resolve(data));
}

export function handleClickFeaturesPlace(event, app) {
  const targetButton = event.target.closest("button");
  if (!targetButton) return;
  switch (targetButton.getAttribute("type")) {
    case "button-download":
      downloadJson(app.JsonData);
      break;
    case "button-save-local-storage":
      saveLocalStorage(app.JsonData);
      break;
    case "button-cleanup-local-storage":
      cleanupLocalStorage(app.JsonData);
      break;
  }
}
