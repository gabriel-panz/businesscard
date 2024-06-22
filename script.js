const getCaret = (px) =>
  `<div id="faux-caret" style="margin-left: ${px}px"><span>a</span></div>`;

let magicFontWidth = () => (window.screen.width > 1200 ? 11 : 8.8);
const startPosPx = 3;
let currentPosPx = startPosPx;

const adjustCaret = (e) => {
  const selectedPos = e.target.selectionStart;
  if (selectedPos < 19) {
    currentPosPx = startPosPx + selectedPos * magicFontWidth();
  } else {
    currentPosPx = startPosPx + 19 * magicFontWidth();
  }
  document.getElementById("faux-caret").outerHTML = getCaret(currentPosPx);
};

document.getElementById("faux-stdin").outerHTML += getCaret(startPosPx);

document.getElementById("faux-stdin").addEventListener("keyup", adjustCaret);

document.getElementById("faux-stdin").addEventListener("click", adjustCaret);
