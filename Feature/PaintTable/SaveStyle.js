export function saveStyleToJsonData(node, rowData, backgroundColor) {
  const key = node.dataset["columnName"];
  console.log(key);
  rowData[key + "-bg"] = backgroundColor;
}
