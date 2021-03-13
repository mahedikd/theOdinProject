const entry = ["rock", "paper", "scissors"],
	times = prompt("Enter how many times to play :");

let computerWins = 0,
	playerWins = 0;

timesToPlay(times);
// All functions
// random entry
function randomEntry() {
	return Math.floor(Math.random() * 3);
}
// validate input
function inputValidation(playerInput) {
	if (entry.indexOf(playerInput) == -1) {
		console.log("please input a valid choice");
		return true;
	} else {
		return false;
	}
}
// determine points
function determinePoint() {
	const computerPlay = entry[randomEntry()],
		playerInput = prompt("Enter your choice").toLocaleLowerCase(),
		// const playerInput = 'rock',
		// computerPlay = 'rock',
		playerValidInput = inputValidation(playerInput);

	if (playerValidInput) {
		determinePoint();
		return;
	}

	if (playerInput == computerPlay) {
		playerWins += 1;
		computerWins += 1;
	} else if (playerInput == "rock" && computerPlay == "scissors") {
		playerWins += 1;
	} else if (playerInput == "paper" && computerPlay == "rock") {
		playerWins += 1;
	} else if (playerInput == "scissors" && computerPlay == "paper") {
		playerWins += 1;
	} else {
		computerWins += 1;
	}
}
//determine winner
function winner() {
	if (computerWins > playerWins) {
		console.log("You lose, Computer wins");
	} else if (computerWins == playerWins) {
		console.log("It's a tie");
	} else {
		console.log("Congrats, you win");
	}
}
// times to play
function timesToPlay(times) {
	if (isNaN(times)) {
		const times = prompt("Enter how many times to play :");
		timesToPlay(times);
	} else {
		times = parseInt(times);
		while (times > 0) {
			determinePoint();
			times--;
		}
		winner();
	}
}
