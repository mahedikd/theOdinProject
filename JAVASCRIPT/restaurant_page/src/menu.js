const menuItemImgs = [
	"https://ontestic.sirv.com/food-menu-items/visualsofdana-d.jpg",
	"https://ontestic.sirv.com/food-menu-items/eiliv-sonas-aceron1.jpg",
	"https://ontestic.sirv.com/food-menu-items/visualsofdana2.jpg",
	"https://ontestic.sirv.com/food-menu-items/visualsofdana1.jpg",
	"https://ontestic.sirv.com/food-menu-items/lindsay-moe-SELw4p.jpg",
	"https://ontestic.sirv.com/food-menu-items/mae-mu-en4qp.jpg",
	"https://ontestic.sirv.com/food-menu-items/irina.jpg",
	"https://ontestic.sirv.com/food-menu-items/ivy-aralia-nizar.jpg",
	"https://ontestic.sirv.com/food-menu-items/hanxiao.jpg",
	"https://ontestic.sirv.com/food-menu-items/eiliv-sonas-aceron.jpg",
	"https://ontestic.sirv.com/food-menu-items/jordon-kaplan.jpg",
	"https://ontestic.sirv.com/food-menu-items/content-pixie.jpg",
	"https://ontestic.sirv.com/food-menu-items/chuttersnap-.jpg",
	"https://ontestic.sirv.com/food-menu-items/andres-rodriguez.jpg",
	"https://ontestic.sirv.com/food-menu-items/amna-akram.jpg",
	"https://ontestic.sirv.com/food-menu-items/bao-menglong.jpg",
	"https://ontestic.sirv.com/food-menu-items/amirhosein-esmaeili.jpg",
	"https://ontestic.sirv.com/food-menu-items/anthony-espinosa-at-C.jpg",
	"https://ontestic.sirv.com/food-menu-items/gita-krishnamurti1.jpg",
	"https://ontestic.sirv.com/food-menu-items/gita-krishnamurti.jpg",
	"https://ontestic.sirv.com/food-menu-items/pim-myten.jpg",
	"https://ontestic.sirv.com/food-menu-items/olayinka-babalola.jpg",
	"https://ontestic.sirv.com/food-menu-items/sunorwind1.jpg",
	"https://ontestic.sirv.com/food-menu-items/wesual-click.jpg",
];

const cards = [];

menuItemImgs.forEach((item) => createCard(item));

function createCard(item) {
	const random = Math.floor(Math.random() * (100 - 20 + 1) + 20);

	const card = document.createElement("div");
	card.className = "card";

	const img = document.createElement("img");
	img.className = "cardimg";
	img.src = item;

	const h4 = document.createElement("h4");
	h4.textContent = "FoodTitle";

	const p = document.createElement("p");
	p.className = "price";
	p.textContent = `Price $${random}`;

	card.appendChild(img);
	card.appendChild(h4);
	card.appendChild(p);

	cards.push(card);
}

const menuContent = document.createElement("div");
menuContent.className = "menu-content";

cards.forEach((card) => {
	menuContent.appendChild(card);
});

export default menuContent;
