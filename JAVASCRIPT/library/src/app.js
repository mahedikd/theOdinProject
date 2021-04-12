/* eslint-disable no-use-before-define */
import ui from './ui';
import store from './storage';
import './style.css';
// log area element
const totalBook = document.querySelector('.total-book');
const finishedBook = document.querySelector('.finished');
const notFinishedBook = document.querySelector('.not-finished');
// for info gather
const authorInput = document.querySelector('#author');
const bookTitleInput = document.querySelector('#title');
const languageInput = document.querySelector('#language');
const totalPageInput = document.querySelector('#total-page');
const publishedDateInput = document.querySelector('#published');
// for opening form
const modal = document.querySelector('.modal');
const addBtn = document.querySelector('#add-book');
const clearBtn = document.querySelector('#clear-book');
const closeBtn = document.querySelector('#remove-form');
const markAsReadCheckbox = document.querySelector('#isRead');

addBtn.onclick = () => {
  modal.style.display = 'block';
};
closeBtn.onclick = () => {
  modal.style.display = 'none';
};
window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
};
clearBtn.onclick = () => {
  clearBooks();
};

//
const interBooksIn = document.querySelector('.library-grid');

// book array
const defaultBookArr = [
  {
    id: 1,
    bookTitle: 'demos',
    author: "demos don't count in log",
    lang: 'en',
    totalPage: '660',
    publishedDate: 'No Date Added',
    addedHere: '21 Mar 2021',
    checked: true,
  },
  {
    id: 2,
    bookTitle: 'demo title',
    author: 'after adding data reload to remove demo',
    lang: 'en',
    totalPage: '1',
    publishedDate: '03 Mar 2021',
    addedHere: '21 Mar 2021',
    checked: false,
  },
];
// demo data
let bookArr = store.getItemToUpdateUi()[0] ? store.getItemToUpdateUi() : defaultBookArr;
// stores data
//
document.addEventListener('DOMContentLoaded', updateUi);
interBooksIn.addEventListener('click', deleteBook);
interBooksIn.addEventListener('click', updateReadState);
// listen for form submit
document.querySelector('#bookForm').addEventListener('submit', takeInfoAndMakeBook);
// book constractor
function makeBook(
  id,
  bookTitle,
  author,
  lang,
  totalPage,
  publishedDate,
  addedHere,
  checked,
) {
  return {
    id,
    bookTitle,
    author,
    lang,
    totalPage,
    publishedDate,
    addedHere,
    checked,
  };
}
// add book object in an array
function takeInfoAndMakeBook(e) {
  e.preventDefault();
  const bookName = bookTitleInput.value;
  const authorName = authorInput.value;
  const language = languageInput.value;
  const totalPage = totalPageInput.value;
  const published = publishedDateInput.value;
  const isRead = markAsReadCheckbox.checked;

  let newPublished = '';
  const id = makeId();

  if (published) {
    //  converts published date
    const publishedDate = new Date(published);
    const [month, day, year] = publishedDate.toDateString().substr(4).split(' ');
    newPublished = `${day} ${month} ${year}`;
  } else {
    newPublished = 'No Date Added';
  }
  // converts added date
  const addDate = new Date();
  const [addMonth, addDay, addYear] = addDate.toDateString().substr(4).split(' ');
  const newAddDate = `${addDay} ${addMonth} ${addYear}`;

  const newBook = makeBook(
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
    const beforeElem = document.querySelector('.button-primary');
    const container = document.querySelector('#bookForm');
    ui.showAlert(container, beforeElem, 'Data Already Exist');
    return;
  }
  //

  bookArr.push(newBook);
  ui.addElementToUi(newBook, interBooksIn);
  // stores to localStorage;
  store.storeItem(newBook);
  /// clear from filds
  bookTitleInput.value = '';
  authorInput.value = '';
  languageInput.value = '';
  totalPageInput.value = '';
  publishedDateInput.value = '';
  markAsReadCheckbox.checked = '';
  //
  updateLog();
}
// make id for book based on bookArr size
function makeId() {
  let id = 0;
  if (bookArr.length === 0) {
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
  const del = e.target.classList.contains('remove');
  if (del) {
    e.target.parentElement.remove();
    const elemId = e.target.parentElement.dataset.id;
    bookArr.forEach((book, index) => {
      if (book.id === elemId) {
        bookArr.splice(index, 1);
        store.removeItem(book.id);
      }
    });
  }
  updateLog();
}
// update read state of books
function updateReadState(e) {
  const mark = e.target.id === 'isFinished';
  if (mark) {
    const checkAttri = e.target.attributes.checked;
    if (checkAttri) {
      // remove attri
      e.target.removeAttribute('checked');
      e.target.parentElement.parentElement.id = 'notfin';
      // update read state in database
      const elemId = e.target.parentElement.parentElement.dataset.id;
      bookArr.forEach((book) => {
        if (book.id == elemId) {
          book.checked = false;
          store.updateLocalState(book.id, false);
        }
      });
    } else {
      // add attri
      e.target.setAttribute('checked', '');
      e.target.parentElement.parentElement.setAttribute('id', 'fin');
      // update read state in database
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
  const totalBookSize = bookArr.length;
  const finishedBookSize = bookArr.filter((book) => book.checked).length;
  const notFinishedBookSize = totalBookSize - finishedBookSize;
  totalBook.innerText = totalBookSize;
  finishedBook.innerText = finishedBookSize;
  notFinishedBook.innerText = notFinishedBookSize;
}
// check if data already exist in database
function checkIfDataExist(data) {
  return bookArr.some(
    (book) =>
      book.bookTitle === data.bookTitle &&
      book.author === data.author &&
      book.lang === data.lang,
  );
}
// clear books
function clearBooks() {
  if (totalBook.innerText !== '0') {
    const container = document.querySelector('.container');
    ui.clearElem(interBooksIn);
    ui.showAlert(container, interBooksIn, 'BookList Cleard');
    store.clearItems();
    updateLog();
  }
}
