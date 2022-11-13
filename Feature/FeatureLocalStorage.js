import { readTextFile, downloadFile } from "./ControlFile.js";
import { $ } from "./Util.js";

function downloadJson(JsonData) {
  const data = JSON.stringify(JsonData);
  downloadFile(data, "JsonData.json");
}

function saveLocalStorage(JsonData) {
  const data = JSON.stringify(JsonData);
  localStorage.setItem("data", data);
  console.log(
    `%c ${getCurrentDataTime()} - save local successed`,
    "background: blue; color: white"
  );
}

export function cleanupLocalStorage() {
  localStorage.removeItem("data");
  console.log(
    `%c ${getCurrentDataTime()} - cleaning successed`,
    "background: red; color: white"
  );
}

function readLocalStorage() {
  const data = localStorage.getItem("data") ? localStorage.getItem("data") : [];
  return data;
}

export function readData(app) {
  let data = readLocalStorage();
  if (data.length === 0) {
    console.log(
      `%c ${getCurrentDataTime()} - read data from default file`,
      "background: green; color: white"
    );
    return readTextFile(`./DB/${app.document}.json`);
  }

  console.log(
    `%c ${getCurrentDataTime()} - read data from local store`,
    "background: purple; color: white"
  );
  return new Promise((resolve) => resolve(data));
}

export function handleClickFeaturesPlace(event, app) {
  const targetButton = event.target.closest("img");
  if (!targetButton) return;
  switch (targetButton.getAttribute("type")) {
    case "button-download":
      downloadJson(app.JsonData);
      break;
    case "button-save-local-storage":
      countTimeSaveLocalStorage(app);
      saveLocalStorage(app.JsonData);
      break;
    case "button-cleanup-local-storage":
      cleanupLocalStorage(app.JsonData);
      break;
  }
}

export function countTimeSaveLocalStorage(app) {
  const timerBlock = $(".features-localstorage .timmer");
  if (app.counterId !== null) {
    clearInterval(app.counterId);
  }
  timerBlock.textContent = 0;
  app.counterId = setInterval(() => {
    timerBlock.textContent = +timerBlock.textContent + 1;
  }, 60000);
}

export function getCurrentDataTime() {
  const today = new Date();
  const date =
    today.getDate() + "-" + (+today.getMonth() + 1) + "-" + today.getFullYear();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = time + " " + date;
  return dateTime;
}
