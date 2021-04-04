import "./style.css";
import homeContent from "./home";
import menuContent from "./menu";
import contactContent from "./contact";
const wrapper = document.querySelector(".wrapper");
const backgroundImg = document.querySelector(".background-img");

const home = document.querySelector(".home"),
	menu = document.querySelector(".menu"),
	contact = document.querySelector(".contact");

window.addEventListener("DOMContentLoaded", fillHome);

home.addEventListener("click", fillHome);
menu.addEventListener("click", fillMenu);
contact.addEventListener("click", fillContact);

function fillHome(e) {
	clearWrapper();
	document.querySelector("li a").classList.toggle("active");
	wrapper.appendChild(homeContent);
	backgroundImg.classList.remove("menu");
	backgroundImg.classList.remove("contact");
	backgroundImg.classList.add("home");
}
function fillMenu(e) {
	clearWrapper();
	e.target.classList.toggle("active");
	wrapper.appendChild(menuContent);
	backgroundImg.classList.remove("home");
	backgroundImg.classList.remove("contact");
	backgroundImg.classList.add("menu");
}
function fillContact(e) {
	clearWrapper();
	e.target.classList.toggle("active");
	wrapper.appendChild(contactContent);
	backgroundImg.classList.remove("home");
	backgroundImg.classList.remove("menu");
	backgroundImg.classList.add("contact");
}
function clearWrapper() {
	while (wrapper.firstChild) {
		wrapper.firstChild.remove();
	}
	document.querySelectorAll("li a").forEach((item) => item.classList.remove("active"));
}
