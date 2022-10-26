import { readTextFile, downloadFile } from "../../Common/ControlfFile.js";

export function downloadJson(StringHelperData) {
  const data = JSON.stringify(StringHelperData);
  downloadFile(data, "StringHelperData.json");
}

export function saveLocalStorage(StringHelperData) {
  const data = JSON.stringify(StringHelperData);
  localStorage.setItem("data", data);
}

export function cleanupLocalStorage() {
  localStorage.removeItem("data");
}

function readLocalStorage() {
  const data = localStorage.getItem("data") ? localStorage.getItem("data") : [];
  return data;
}

export function readData() {
  let data = readLocalStorage();
  if (data.length === 0) {
    console.log("read data from default file");
    return readTextFile("./StringHelperData.json");
  }

  console.log("read data from local store");
  return new Promise((resolve) => resolve(data));
}
