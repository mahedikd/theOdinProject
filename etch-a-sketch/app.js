const gridContainer = document.querySelector(".grid-container"),
	audio = document.querySelector("audio"),
	changeSize = document.querySelector("#change-pixel");
window.onload = setDefault();
//change grid container size
window.addEventListener("resize", changeHeight); // window.onresize = changeHeight();
changeHeight();
//
changeSize.addEventListener("click", changePixelAmount);

function setDefault() {
	gridSize(16);
	gridFill(16);
}
function gridSize(size) {
	gridContainer.style.cssText = `grid-template-columns: repeat(${size},1fr);`;
}
function gridFill(fill) {
	for (let i = 1; i <= fill * fill; i++) {
		const elem = document.createElement("div");
		elem.className = "grid-element";
		elem.addEventListener("mouseover", changeColor);
		elem.addEventListener("mouseout", StopSound);
		gridContainer.appendChild(elem);
	}
}
function changeColor(e) {
	const r = Math.floor(Math.random() * 256),
		g = Math.floor(Math.random() * 256),
		b = Math.floor(Math.random() * 256);
	e.target.style.background = `rgb(${r}, ${g}, ${b})`;
	PlaySound();
}
function changeHeight() {
	const width = gridContainer.offsetWidth;
	gridContainer.style.height = `${width}px`;
}
function clearElement() {
	const elemAraay = Array.from(gridContainer.childNodes);
	elemAraay.forEach((elem) => gridContainer.removeChild(elem));
}
function changePixelAmount() {
	const newSize = parseInt(prompt("Enter Pixel Amount"));
	if (newSize !== null) {
		if (newSize < 1 || newSize > 100 || isNaN(newSize)) {
			alert("Enter a number from 1-100 range");
			changePixelAmount();
		} else {
			clearElement();
			gridSize(newSize);
			gridFill(newSize);
			changeHeight();
		}
	}
}
function PlaySound() {
	audio.play();
}
function StopSound() {
	audio.pause();
	audio.currentTime = 0;
}
