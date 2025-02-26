const sports = [
    "football",
    "cricket",
    "tennis",
    "hockey",
    "golf",
    "badminton",
];

let randomIndex = Math.floor(Math.random() * sports.length);
let chosenSport = sports[randomIndex];
console.log(chosenSport); // For debugging, remove in production

let guessedLetters = [];
let displayWord = "";

function initializeGame() {
    randomIndex = Math.floor(Math.random() * sports.length);
    chosenSport = sports[randomIndex];
    console.log(chosenSport); // For debugging, remove in production
    guessedLetters = [];
    displayWord = "";
    for (let i = 0; i < chosenSport.length; i++) {
        displayWord += "_ ";
    }
    document.getElementById("wordDisplay").textContent = displayWord;
}

initializeGame(); // Initial game setup

function showMessage(message, isSuccess) {
    let messageBox = document.getElementById("messageBox");
    messageBox.textContent = message;
    messageBox.className = isSuccess ? "message-success" : "message-error";
    messageBox.style.display = "block";

    setTimeout(() => {
        messageBox.style.display = "none";
    }, 1500);
}

function showTryAgainPopup() {
    const playAgain = confirm("Congratulations! You guessed the sport!\nWould you like to play again?");
    if (playAgain) {
        initializeGame();
    }
}

function checkLetter() {
    let inputElement = document.getElementById("letterInput");
    let letter = inputElement.value.toLowerCase();

    if (!letter || !/[a-z]/.test(letter)) {
        showMessage("Please enter a valid letter!", false);
        return;
    }

    inputElement.value = "";

    if (guessedLetters.includes(letter)) {
        showMessage("Already guessed this letter!", false);
        return;
    }

    guessedLetters.push(letter);

    let updatedDisplay = "";
    let allGuessed = true;
    for (let i = 0; i < chosenSport.length; i++) {
        if (guessedLetters.includes(chosenSport[i])) {
            updatedDisplay += chosenSport[i] + " ";
        } else {
            updatedDisplay += "_ ";
            allGuessed = false;
        }
    }
    document.getElementById("wordDisplay").textContent = updatedDisplay;

    if (chosenSport.includes(letter)) {
        showMessage("Correct guess!", true);
    } else {
        showMessage("Wrong guess!", false);
    }

    if (allGuessed) {
        setTimeout(showTryAgainPopup, 1500); // Wait for the "Correct guess" message to show
    }
}