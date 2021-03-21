class Storage {
	storeItem(data) {
		let items = [];
		if (localStorage.getItem("bookList") === null) {
			items = [];
		} else {
			items = JSON.parse(localStorage.getItem("bookList"));
		}
		items.push(data);
		localStorage.setItem("bookList", JSON.stringify(items));
	}
	removeItem(dataId) {
		let items = [];
		if (localStorage.getItem("bookList") === null) {
			items = [];
		} else {
			items = JSON.parse(localStorage.getItem("bookList"));
		}
		items.forEach((item, index) => {
			if (item.id == dataId) {
				items.splice(index, 1);
			}
		});
		localStorage.setItem("bookList", JSON.stringify(items));
	}
	clearItems() {
		localStorage.clear();
	}
	getItemToUpdateUi() {
		let items = [];
		if (localStorage.getItem("bookList") === null) {
			items = [];
		} else {
			items = JSON.parse(localStorage.getItem("bookList"));
		}
		return items;
	}
	updateLocalState(dataId, state) {
		let items = [];
		if (localStorage.getItem("bookList") === null) {
			items = [];
		} else {
			items = JSON.parse(localStorage.getItem("bookList"));
		}
		items.forEach((item) => {
			if (item.id == dataId) {
				item.checked = state;
			}
		});
		localStorage.setItem("bookList", JSON.stringify(items));
	}
}
// export const store = new Storage();
