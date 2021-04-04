const textsec = (() => {
	const div = document.createElement("div");
	div.className = "textsec";

	const h4 = document.createElement("h4");
	h4.className = "slo";
	h4.textContent = "Best Restaurant In Country";

	const p = document.createElement("p");
	p.textContent = "Visit us OR order Online";

	div.appendChild(h4);
	div.appendChild(p);
	return div;
})();

const imgsc = (() => {
	const div = document.createElement("div");
	div.className = "imgsc";

	const img1 = document.createElement("img");
	img1.className = "home-img-1 img";
	img1.src = "https://ontestic.sirv.com/food-menu-items/alex-munsell.jpg";

	const img2 = document.createElement("img");
	img2.className = "home-img-2 img";
	img2.src = "https://ontestic.sirv.com/food-menu-items/sara-cervera.jpg ";

	div.appendChild(img1);
	div.appendChild(img2);
	return div;
})();

const homeContent = (() => {
	const homeContent = document.createElement("div");
	homeContent.className = "home-content";
	homeContent.appendChild(textsec);
	homeContent.appendChild(imgsc);

	return homeContent;
})();

export default homeContent;
