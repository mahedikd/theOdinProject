class Calculator {
	constructor(previous, current) {
		this.previous = previous;
		this.current = current;
		this.clear();
	}
	clear() {
		this.currentOperand = "";
		this.previousOperand = "";
		this.oparation = undefined;
	}
	del() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}
	appendNumber(number) {
		if (number == "." && this.currentOperand.toString().includes(".")) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}
	chooseOperation(oparation) {
		if (this.currentOperand === "") return;
		if (this.previousOperand !== "") {
			this.compute();
		}
		this.oparation = oparation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	}
	compute() {
		let result;
		const prev = parseFloat(this.previousOperand),
			current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.oparation) {
			case "+":
				result = prev + current;
				break;
			case "-":
				result = prev - current;
				break;
			case "X":
				result = prev * current;
				break;
			case "/":
				result = prev / current;
				break;
			default:
				return;
		}
		this.currentOperand = result;
		this.oparation = undefined;
		this.previousOperand = "";
	}
	getDisplayNumber(number) {
		const stringNumber = number.toString(),
			intDigits = parseFloat(stringNumber.split(".")[0]),
			decDigits = stringNumber.split(".")[1];
		let intDisplay;
		if (isNaN(intDigits)) {
			intDisplay = "";
		} else {
			intDisplay = intDigits.toLocaleString("en", { maximumFractionDigits: 0 });
		}
		if (decDigits !== (null || undefined)) {
			return `${intDisplay}.${decDigits}`;
		} else {
			return intDisplay;
		}
	}
	updateDisplay() {
		this.current.innerText = this.getDisplayNumber(this.currentOperand);
		if (this.oparation !== (null || undefined)) {
			this.previous.innerText = `${this.getDisplayNumber(this.previousOperand)} ${
				this.oparation
			}`;
		} else {
			this.previous.innerText = this.previousOperand;
		}
	}
}
/////////////////////////
const numberButtons = document.querySelectorAll("[data-number]"),
	oparationButton = document.querySelectorAll("[data-oparator]"),
	equalButton = document.querySelector("[data-equal]"),
	delButton = document.querySelector("[data-del]"),
	clearAll = document.querySelector("[data-clearall]"),
	previous = document.querySelector("[data-previous]"),
	current = document.querySelector("[data-current]");

const calc = new Calculator(previous, current);
////
numberButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		calc.appendNumber(btn.innerText);
		calc.updateDisplay();
	});
});

oparationButton.forEach((btn) => {
	btn.addEventListener("click", () => {
		calc.chooseOperation(btn.innerText);
		calc.updateDisplay();
	});
});

equalButton.addEventListener("click", () => {
	calc.compute();
	calc.updateDisplay();
});

clearAll.addEventListener("click", () => {
	calc.clear();
	calc.updateDisplay();
});

delButton.addEventListener("click", () => {
	calc.del();
	calc.updateDisplay();
});

const keyboardControls = (event) => {
	// prettier-ignore
	const KEYS = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
    ".", "+", "-", "*", "x", "X", "/", "=",
    "Enter", "Backspace", "Delete",
  ];
	const key = event.key;

	if (!KEYS.includes(event.key)) {
		return;
	} else {
		numberButtons.forEach((btn) => {
			if (btn.innerText == key) {
				btn.click();
				prss(btn);
			}
		});
		oparationButton.forEach((btn) => {
			if (btn.innerText == key) {
				btn.click();
				prss(btn);
			}
		});
		switch (key) {
			case "Enter":
				equalButton.click();
				prss(equalButton);
				break;
			case "Backspace":
				delButton.click();
				prss(delButton);
				break;
			case "Delete":
				clearAll.click();
				prss(clearAll);
				break;
			case "*":
				{
					oparationButton.forEach((btn) => {
						if (btn.innerText == "X") {
							btn.click();
							prss(btn);
						}
					});
				}
				break;
			default:
				break;
		}
	}
};
document.addEventListener("keydown", keyboardControls);
function prss(name) {
	name.classList.add("prs");
	setTimeout(() => name.classList.remove("prs"), 200);
}
