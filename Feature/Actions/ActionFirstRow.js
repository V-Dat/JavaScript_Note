import { $, $$ } from "../Util.js";
import {
  activeButtonCreate,
  activeButtonEraserNewNode,
  unActiveButtonCreate,
  unActiveButtonEraserNewNode,
} from "./ActionUtil.js";

export function handleInputCrudTextArea() {
  const crudTextArea = $$(`#table td[data-row-type="first-row"] textarea`);
  const rowNode = $(".crud-group");
  let totalLength = 0;
  const isFillAll = [...crudTextArea].every((textAreaNode) => {
    totalLength += textAreaNode.value.length;
    return textAreaNode.value.length > 0;
  });

  if (!isFillAll && totalLength === 0) {
    unActiveButtonCreate(rowNode);
    unActiveButtonEraserNewNode(rowNode);
  } else if (!isFillAll && totalLength > 0) {
    activeButtonEraserNewNode(rowNode);
    unActiveButtonCreate(rowNode);
  } else {
    activeButtonCreate(rowNode);
    activeButtonEraserNewNode(rowNode);
  }
}
