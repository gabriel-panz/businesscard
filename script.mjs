import Fuse from "https://unpkg.com/fuse.js@7.3.0/dist/fuse.basic.min.mjs"
/// faux terminal input visuals
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

document.getElementById('faux-stdin').outerHTML += getCaret(startPosPx);
document.getElementById('faux-stdin').addEventListener("keyup", adjustCaret);
document.getElementById('faux-stdin').addEventListener("click", adjustCaret);

/// project search
let projs = document.getElementsByClassName('portfolioCard')
const dat = []
for (const p of projs) {
	const title = p.getElementsByTagName('h2')[0].textContent
	const content = p.getElementsByTagName('p')
	const searchableContent = []
	for (const c of content) {
		const words = c.textContent.split(' ').filter(w => w)
		searchableContent.push(...words)
	}

	dat.push({
		id: p.id,
		title: title,
		content: searchableContent
	})
}

const fuse = new Fuse(dat, { keys: ['title', 'content'], includeScore: true, threshold: 0.2 })

document.getElementById('faux-stdin').addEventListener("keyup", (ev) => {
	const result = fuse.search(ev.target.value)
	for (const p of projs) {
		if (!result.find((v) => v.item.id === p.id)) {
			p.hidden = true
		} else {
			p.hidden = false
		}
	}
})


