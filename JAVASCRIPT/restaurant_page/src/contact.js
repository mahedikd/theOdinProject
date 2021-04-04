const contactContent = (() => {
	const contactdiv = document.createElement("div");
	contactdiv.className = "contact-content";

	const addressdiv = (() => {
		const addressdiv = document.createElement("div");
		addressdiv.className = "address";

		const phone = document.createElement("p");
		phone.textContent = "Phone: 8569312471";

		const address = document.createElement("p");
		address.textContent = "Address: Hawaii street road,Hawaii";

		addressdiv.appendChild(phone);
		addressdiv.appendChild(address);

		return addressdiv;
	})();

	const mapdiv = (() => {
		const mapdiv = document.createElement("div");
		mapdiv.className = "map";

		const img = document.createElement("img");
		img.src = "https://ontestic.sirv.com/background/map.png";
		img.setAttribute("alt", "map");

		mapdiv.appendChild(img);
		return mapdiv;
	})();

	contactdiv.appendChild(addressdiv);
	contactdiv.appendChild(mapdiv);

	return contactdiv;
})();

export default contactContent;
