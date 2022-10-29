import { $ } from "./Util.js";

export function arrowFeature() {
  const arrowFeatureBlock = $(".arrow-features");
  window.pageYOffset / $("body").scrollHeight > 0.3
    ? (arrowFeatureBlock.style.display = "flex")
    : (arrowFeatureBlock.style.display = "none");
}

export function handleClickArrowFeature(event) {
  const targetClass = event.target.getAttribute("class");
  targetClass === "up"
    ? window.scrollTo({ top: 0, behavior: "smooth" })
    : window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}
