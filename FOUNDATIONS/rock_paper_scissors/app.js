const playerSide = document.querySelector(".player-side"),
	playerSc = document.querySelector(".player-score"),
	computerSc = document.querySelector(".computer-score"),
	textarea = document.querySelector(".txt"),
	playAgain = document.querySelector(".play-again"),
	compWins = document.querySelector(".computerWins"),
	plyWins = document.querySelector(".playerWins"),
	entry = ["rock", "paper", "scissors"];

let computerScore = 0,
	playerScore = 0,
	computerWins = 0,
	playerWins = 0,
	playerInput = "";

// player input
playerSide.addEventListener("click", playerIn);

function playerIn(e) {
	e.preventDefault();
	const isRock = e.target.classList.contains("rock"),
		isPaper = e.target.classList.contains("paper"),
		isScissors = e.target.classList.contains("scissors");
	if (isRock) {
		playerInput = "rock";
	} else if (isPaper) {
		playerInput = "paper";
	} else if (isScissors) {
		playerInput = "scissors";
	} else {
		playerInput = "";
	}
	determinePoint();
}
// update scores;
function updateScores() {
	playerSc.textContent = playerScore;
	computerSc.textContent = computerScore;
}
// random entry
function randomEntry() {
	return Math.floor(Math.random() * 3);
}
// determine points
function determinePoint() {
	if (playerInput == "") return;
	const computerInput = entry[randomEntry()];
	computerClicked(computerInput);

	if (playerInput == computerInput) {
		// its a tie msg
		showMsg("tie");
	} else if (playerInput == "rock" && computerInput == "scissors") {
		playerScore += 1;
	} else if (playerInput == "paper" && computerInput == "rock") {
		playerScore += 1;
	} else if (playerInput == "scissors" && computerInput == "paper") {
		playerScore += 1;
	} else {
		computerScore += 1;
	}
	updateScores();
	winner();
}
//determine winner
function winner() {
	if (computerScore == 5 && playerScore < 5) {
		// computer wins msg
		showMsg("com");
		playerSide.classList.add("none");
		playAgain.style.display = "block";
		computerWins++;
	} else if (playerScore == 5 && computerScore < 5) {
		// palyer wins msg
		showMsg("ply");
		playerSide.classList.add("none");
		playAgain.style.display = "block";
		playerWins++;
	}
	plyWins.textContent = playerWins;
	compWins.textContent = computerWins;
}
//computer clicked
const crock = document.querySelector(".Crock"),
	cpaper = document.querySelector(".Cpaper"),
	cscissors = document.querySelector(".Cscissors");
function computerClicked(input) {
	if (input == "rock") {
		crock.classList.add("cmps");
		setTimeout(() => crock.classList.remove("cmps"), 200);
	} else if (input == "paper") {
		cpaper.classList.add("cmps");
		setTimeout(() => cpaper.classList.remove("cmps"), 200);
	} else {
		cscissors.classList.add("cmps");
		setTimeout(() => cscissors.classList.remove("cmps"), 200);
	}
}

// show message
function showMsg(who) {
	if (who == "com") {
		textarea.textContent = "Computer Wins";
	} else if (who == "ply") {
		textarea.textContent = "You Win";
	} else {
		textarea.textContent = "It's a tie";
		setTimeout(() => (textarea.textContent = ""), 1000);
	}
}
//play again
playAgain.addEventListener("click", again);
function again() {
	playerScore = 0;
	computerScore = 0;
	updateScores();
	playAgain.style.display = "none";
	playerSide.classList.remove("none");
	textarea.textContent = "";
}
