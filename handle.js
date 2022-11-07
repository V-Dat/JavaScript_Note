let text = `2132
`;
// let header =`
// <p>
//   The <strong><code>size</code></strong> accessor property returns the number of elements in a
//   <a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"><code>Map</code></a> object.
// </p>
// `;
// HeaderMethod(handle(text))
// HeaderMethod(handle(header))

// let code = `
// var url = 'http://ajax-json.cione.vn/api/v1/products';
// var xhr = new XMLHttpRequest();
// var output = document.getElementById('output');
// xhr.onreadystatechange = handleResult;
// xhr.open('GET', url);
// xhr.send();
// function handleResult() {
//   if (xhr.readyState === XMLHttpRequest.DONE){
//     output.innerHTML = xhr.responseText}
// }

// `;
// handleCode(code)

let link = `https://tc39.es/ecma262/multipage/keyed-collections.html#sec-map.prototype.clear`;
let name = `Map.prototype.clear()`;
handleECMA(link, name);

// ----------------------------
function handle(text) {
  const href = `href="https://developer.mozilla.org/en-US/`;
  const arrReplace = [
    "<em>",
    "</em>",
    "<strong>",
    "</strong>",
    "<code>",
    "</code>",
    "<p>",
    "</p>",
    "<ul>",
    "</ul>",
    "<li>",
    "</li>",
    "<ol>",
    "</ol>",
  ];
  let newText = text;
  arrReplace.forEach((tag) => {
    newText = newText.replaceAll(tag, "");
  });
  newText = newText.replaceAll(`href="/en-US/`, href) + "<br>";
  newText = newText.replaceAll("  ", "");
  return newText.trim();
}
function HeaderMethod(header) {
  let newHeader = header;
  newHeader = newHeader.replaceAll("<a href", "<h3><a href");
  newHeader = newHeader.replaceAll("</a>", "</a></h3>");
  newHeader = newHeader.replaceAll("  ", "");
  console.log(newHeader.trim());
}
function handleCode(text) {
  let newText = text.trim();
  newText = `<pre class='js'><code  class="javascript">
  ${newText}
  </code></pre>`;
  newText = newText.replaceAll("  ", "");
  console.log(newText);
}

function handleECMA(link, name) {
  let newEcma = `
  <!-- ==== Đặc tả ==== -->

  <br>
  <h3 style="color:red">Đặc Tả: <a href='${link}'>${name}</a></h3>
  `;
  newEcma = newEcma.replaceAll("  ", "");
  console.log(newEcma.trim());
}

function cleanECMA(link, name) {
  <ol>
    <li>
      <span aria-hidden="true" style="font-size: 0px;">
        1.{" "}
      </span>
      Let <var>M</var> be the <emu-val>this</emu-val> value.
    </li>
    <li>
      <span aria-hidden="true" style="font-size: 0px;">
        2.{" "}
      </span>
      Perform ? 
      <emu-xref aoid="RequireInternalSlot" id="_ref_12569">
        <a href="ordinary-and-exotic-objects-behaviours.html#sec-requireinternalslot">
          RequireInternalSlot
        </a>
      </emu-xref>
      (<var>M</var>, [[MapData]]).
    </li>
    <li>
      <span aria-hidden="true" style="font-size: 0px;">
        3.{" "}
      </span>
      Let <var>entries</var> be the{" "}
      <emu-xref href="#sec-list-and-record-specification-type" id="_ref_12570">
        <a href="ecmascript-data-types-and-values.html#sec-list-and-record-specification-type">
          List
        </a>
      </emu-xref>{" "}
      that is <var>M</var>.[[MapData]].
    </li>
    <li>
      <span aria-hidden="true" style="font-size: 0px;">
        4.{" "}
      </span>
      For each{" "}
      <emu-xref href="#sec-list-and-record-specification-type" id="_ref_12571">
        <a href="ecmascript-data-types-and-values.html#sec-list-and-record-specification-type">
          Record
        </a>
      </emu-xref>{" "}
      {([[Key]], [[Value]])} <var>p</var> of <var>entries</var>, do
      <ol>
        <li>
          <span aria-hidden="true" style="font-size: 0px;">
            a.{" "}
          </span>
          Set <var>p</var>.[[Key]] to <emu-const>empty</emu-const>.
        </li>
        <li>
          <span aria-hidden="true" style="font-size: 0px;">
            b.{" "}
          </span>
          Set <var>p</var>.[[Value]] to <emu-const>empty</emu-const>.
        </li>
      </ol>
    </li>
    <li>
      <span aria-hidden="true" style="font-size: 0px;">
        5.{" "}
      </span>
      Return <emu-val>undefined</emu-val>.
    </li>
  </ol>;
}
