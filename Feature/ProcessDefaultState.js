import { countTimeSaveLocalStorage } from "./FeatureLocalStorage.js";
import { $ } from "./Util.js";

export function processDefaultState() {
  let app = this;
  app = {
    ...app,
    JsonData: { ...DEFAULT_STATE },
    counterId: null,
    activeRow: null,
    previousActiveRow: null,
    document: localStorage.getItem("document")
      ? localStorage.getItem("document")
      : "String",
  };
  $(".button-feature.button-feature__eraser").setAttribute("active", true);
  countTimeSaveLocalStorage(app);
  return app;
}
const DEFAULT_STATE = {
  documentTitle: "JavaScript | Note",
  HeadingOne: '<a href="">Heading</a>',
  mainContent: "...",
  headingMainTwo: '<a href="">Summary</a>',
  referanceContent: `<ol>
    <li>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">Mozilla Javascript</a>
    </li>
    <li>
      <a href="https://stephengrider.github.io/JSPlaygrounds/">Playgrounds</a>
    </li>
    <li>
      <a href="https://github.com/zloirock/core-js#ecmascript-array">Core JS</a>
    </li>
    <li>
      <a href="https://www.totaltypescript.com/tutorials">TS totorial</a>
    </li>
  </ol>`,
  dataTable: {
    dataTableHeader: [],
    dataTableFirstRow: [],
    dataTableBody: [],
  },
};
