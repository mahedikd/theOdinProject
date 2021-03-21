// import { ui } from "./ui.js";
// import { store } from "./storage.js";
const ui = new UI();
const store = new Storage();
// log area element
const totalBook = document.querySelector(".total-book"),
	finishedBook = document.querySelector(".finished"),
	notFinishedBook = document.querySelector(".not-finished");
// for info gather
const authorInput = document.querySelector("#author"),
	bookTitleInput = document.querySelector("#title"),
	languageInput = document.querySelector("#language"),
	totalPageInput = document.querySelector("#total-page"),
	publishedDateInput = document.querySelector("#published");
// for opening form
const modal = document.querySelector(".modal"),
	addBtn = document.querySelector("#add-book"),
	clearBtn = document.querySelector("#clear-book"),
	closeBtn = document.querySelector("#remove-form"),
	markAsReadCheckbox = document.querySelector("#isRead");

addBtn.onclick = () => {
	modal.style.display = "block";
};
closeBtn.onclick = () => {
	modal.style.display = "none";
};
window.onclick = (e) => {
	if (e.target == modal) {
		modal.style.display = "none";
	}
};
clearBtn.onclick = () => {
	clearBooks();
};

//
const interBooksIn = document.querySelector(".library-grid");

//book array
const defaultBookArr = [
	{
		id: 1,
		bookTitle: "demos",
		author: "demos don't count in log",
		lang: "en",
		totalPage: "660",
		publishedDate: "No Date Added",
		addedHere: "21 Mar 2021",
		checked: true,
	},
	{
		id: 2,
		bookTitle: "demo title",
		author: "after adding data reload to remove demo",
		lang: "en",
		totalPage: "1",
		publishedDate: "03 Mar 2021",
		addedHere: "21 Mar 2021",
		checked: false,
	},
];
//demo data
let bookArr = store.getItemToUpdateUi()[0] ? store.getItemToUpdateUi() : defaultBookArr;
// stores data
// let bookArr = store.getItemToUpdateUi();
//
document.addEventListener("DOMContentLoaded", updateUi);
interBooksIn.addEventListener("click", deleteBook);
interBooksIn.addEventListener("click", updateReadState);
//listen for form submit
document.querySelector("#bookForm").addEventListener("submit", takeInfoAndMakeObj);
//book constractor
function MakeBook(
	id,
	bookTitle,
	author,
	lang,
	totalPage,
	publishedDate,
	addedHere,
	checked,
) {
	this.id = id;
	this.bookTitle = bookTitle;
	this.author = author;
	this.lang = lang;
	this.totalPage = totalPage;
	this.publishedDate = publishedDate;
	this.addedHere = addedHere;
	this.checked = checked;
}
// add book object in an array
function takeInfoAndMakeObj(e) {
	e.preventDefault();
	const bookName = bookTitleInput.value,
		authorName = author.value,
		language = languageInput.value,
		totalPage = totalPageInput.value,
		published = publishedDateInput.value,
		isRead = markAsReadCheckbox.checked;

	let newPublished = "",
		id = makeId();

	if (published) {
		//  converts published date
		const publishedDate = new Date(published),
			[month, day, year] = publishedDate.toDateString().substr(4).split(" ");
		newPublished = `${day} ${month} ${year}`;
	} else {
		newPublished = "No Date Added";
	}
	// converts added date
	const addDate = new Date(),
		[addMonth, addDay, addYear] = addDate.toDateString().substr(4).split(" "),
		newAddDate = `${addDay} ${addMonth} ${addYear}`;

	const newBook = new MakeBook(
		id,
		bookName,
		authorName,
		language,
		totalPage,
		newPublished,
		newAddDate,
		isRead,
	);

	const dataExist = checkIfDataExist(newBook);
	//
	if (dataExist) {
		const beforeElem = document.querySelector(".button-primary"),
			container = document.querySelector("#bookForm");
		ui.showAlert(container, beforeElem, "Data Already Exist");
		return;
	}
	//

	bookArr.push(newBook);
	ui.addElementToUi(newBook, interBooksIn);
	//stores to localStorage;
	store.storeItem(newBook);
	///clear from filds
	bookTitleInput.value = "";
	author.value = "";
	languageInput.value = "";
	totalPageInput.value = "";
	publishedDateInput.value = "";
	markAsReadCheckbox.checked = "";
	//
	updateLog();
}
// make id for book based on bookArr size
function makeId() {
	let id = 0;
	if (bookArr.length == 0) {
		id = 1;
	} else {
		id = bookArr.pop().id + 1;
	}
	return id;
}
function updateUi() {
	bookArr.forEach((book) => ui.addElementToUi(book, interBooksIn));
	updateLog();
}
// delete book
function deleteBook(e) {
	const del = e.target.classList.contains("remove");
	if (del) {
		e.target.parentElement.remove();
		const elemId = e.target.parentElement.dataset.id;
		bookArr.forEach((book, index) => {
			if (book.id == elemId) {
				bookArr.splice(index, 1);
				store.removeItem(book.id);
			}
		});
	}
	updateLog();
}
// update read state of books
function updateReadState(e) {
	const mark = e.target.id == "isFinished";
	if (mark) {
		const checkAttri = e.target.attributes.checked;
		if (checkAttri) {
			//remove attri
			e.target.removeAttribute("checked");
			e.target.parentElement.parentElement.id = "notfin";
			//update read state in database
			const elemId = e.target.parentElement.parentElement.dataset.id;
			bookArr.forEach((book) => {
				if (book.id == elemId) {
					book.checked = false;
					store.updateLocalState(book.id, false);
				}
			});
		} else {
			// add attri
			e.target.setAttribute("checked", "");
			e.target.parentElement.parentElement.setAttribute("id", "fin");
			//update read state in database
			const elemId = e.target.parentElement.parentElement.dataset.id;
			bookArr.forEach((book) => {
				if (book.id == elemId) {
					book.checked = true;
					store.updateLocalState(book.id, true);
				}
			});
		}
		updateLog();
	}
}
// update log
function updateLog() {
	bookArr = store.getItemToUpdateUi();
	const totalBookSize = bookArr.length,
		finishedBookSize = bookArr.filter((book) => book.checked).length,
		notFinishedBookSize = totalBookSize - finishedBookSize;
	totalBook.innerText = totalBookSize;
	finishedBook.innerText = finishedBookSize;
	notFinishedBook.innerText = notFinishedBookSize;
}
// check if data already exist in database
function checkIfDataExist(data) {
	return bookArr.some(
		(book) =>
			book.bookTitle == data.bookTitle &&
			book.author == data.author &&
			book.lang == data.lang,
	);
}
//clear books
function clearBooks() {
	if (totalBook.innerText != "0") {
		const container = document.querySelector(".container");
		ui.clearElem(interBooksIn);
		ui.showAlert(container, interBooksIn, "BookList Cleard");
		store.clearItems();
		updateLog();
	}
}
