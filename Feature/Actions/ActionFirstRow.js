import { handleRender } from "../RenderTable/RenderTable.js";
import { $, $$ } from "../Util.js";
import {
  activeButtonSaveNewRecord,
  activeButtonEraserNewNode,
  unactiveButtonSaveNewRecord,
  unActiveButtonEraserNewNode,
} from "./ActionUtil.js";

export function handleInputCrudTextArea(app) {
  const isFillAll = checkCrudTextArea();
  const isFillOne = checkIsInputOne();
  const rowNode = $(".crud-group");
  if (!isFillAll && !isFillOne) {
    unactiveButtonSaveNewRecord(rowNode);
    unActiveButtonEraserNewNode(rowNode);
  } else if (!isFillAll && isFillOne) {
    activeButtonEraserNewNode(rowNode);
    unactiveButtonSaveNewRecord(rowNode);
  } else {
    activeButtonSaveNewRecord(rowNode);
    activeButtonEraserNewNode(rowNode);
  }
}

export function handleSaveRecord(event, app) {
  if (!app.DB.dataTable.dataTableBody) return;
  const isFillAll = checkCrudTextArea();
  if (!isFillAll) return;

  const rowNode = $(".crud-group");
  processRowTableData(app);

  handleResetTextArea(".crud-group textarea");
  handleRender(app.DB);
  // app.isFillAllCrudState = false;
  unactiveButtonSaveNewRecord(rowNode);
  unActiveButtonEraserNewNode(rowNode);
  // highlightNode($("table tbody"));
  app.render();
}

function processRowTableData(app) {
  const crudGroup = $$(".crud-group td");
  const dataAreaInput = [];
  const dataTableBody = app.DB.dataTable.dataTableBody;
  crudGroup.forEach((item) => {
    const textAreaNode = item.querySelector("textarea");
    if (textAreaNode) {
      dataAreaInput.push({
        data: textAreaNode.value || " ",
        index: item.dataset.columnIndex,
        name: item.dataset.columnName,
        show: ["home", "detail"],
      });
    } else if (!textAreaNode && +item.dataset.columnIndex === 0) {
      dataAreaInput.push({
        data: dataTableBody.length + 1,
        index: item.dataset.columnIndex,
        name: item.dataset.columnName,
        show: ["home"],
      });
    } else {
      dataAreaInput.push({
        data: null,
        index: item.dataset.columnIndex,
        name: item.dataset.columnName,
        show: ["home"],
      });
    }
  });

  dataTableBody.push(dataAreaInput);
}

function checkCrudTextArea() {
  const crudTextArea = $$(`#table td[data-row-type="first-row"] textarea`);
  const isFillAll = [...crudTextArea].every((textAreaNode) => {
    return textAreaNode.value.length > 0;
  });
  return isFillAll;
}

export function handleEraserNewRecord(event) {
  const rowNode = event.target.closest("tr");
  unActiveButtonEraserNewNode(rowNode);
  unactiveButtonSaveNewRecord(rowNode);
  handleResetTextArea(".crud-group textarea");
}

export function handleResetTextArea(selector = ".crud-group textarea") {
  const textAreaGroup = $$(selector);
  for (let elem of textAreaGroup) {
    elem.value = "";
  }
}

function checkIsInputOne() {
  const crudTextArea = $$(`#table td[data-row-type="first-row"] textarea`);
  const isFillOne = [...crudTextArea].some((textAreaNode) => {
    return textAreaNode.value.length > 0;
  });
  return isFillOne;
}
