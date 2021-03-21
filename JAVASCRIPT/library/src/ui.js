class UI {
	// this will render data as a card [add element]
	addElementToUi(data, placeToInterElement) {
		const id = data.id,
			bookTitle = data.bookTitle,
			author = data.author,
			lang = data.lang,
			totalPage = data.totalPage,
			publishedDate = data.publishedDate,
			addedHere = data.addedHere,
			ischecked = data.checked;

		let checked = "",
			fin = "";
		if (ischecked) {
			checked = "checked";
			fin = "id='fin'";
		} else {
			checked = "";
			fin = "";
		}

		const element = `
      <div data-id="${id}" class="book" ${fin}>
        <table class="u-full-width">
          <fieldset>
            <legend>${bookTitle}</legend>
            <tbody>
              <tr>
                <td class="tdata">Author</td>
                <td>${author}</td>
              </tr>
              <tr>
                <td class="tdata">Language</td>
                <td>${lang}</td>
              </tr>
              <tr>
                <td class="tdata">Total Page</td>
                <td>${totalPage}</td>
              </tr>
              <tr>
                <td class="tdata">Published</td>
                <td>${publishedDate}</td>
              </tr>
              <tr>
                <td class="tdata">Added Here</td>
                <td>${addedHere}</td>
              </tr>
            </tbody>
          </fieldset>
        </table>
        <i class="remove fa fa-trash-o" aria-hidden="true"></i>
        <label class="switch">
          <input id="isFinished" type="checkbox" ${checked}/>
          <span id="mark" class="slider round"></span>
          <p id="mark-text">Mark as Read</p>
        </label>
      </div>
    `;
		placeToInterElement.innerHTML += element;
		// document.querySelector(".library-grid").appendChild(element);
	}
	showAlert(body, insertbefore, msg) {
		const p = document.createElement("p");
		p.className = "alert";
		p.innerText = msg;
		p.style.cssText =
			"background: red; color: white; padding: 1rem; border-radius: 4px;text-align: center; font-weight: 600";
		body.insertBefore(p, insertbefore);
		// card.insertBefore(errorDiv, heading);
		setTimeout(() => {
			document.querySelector(".alert").remove();
		}, 3000);
	}
	clearElem(container) {
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
	}
}
// export const ui = new UI();
