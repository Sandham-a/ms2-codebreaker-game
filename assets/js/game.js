/**
 * Add an event listener to the document and run the main screen with user log-in
 */
document.addEventListener('DOMContentLoaded', function () {
    runMainScreen();
});

/**
 * Set up of game variables to vary display/hide
 */
let mainLoginScreen = document.getElementById("login-screen");
let getInstructions = document.getElementById("instructions-icon");
let displayGuessNumber = document.getElementById("guesses");
let errorMessage = document.getElementById("error-message");
let chooseLevelScreen = document.getElementById("choose-level-screen");
let gameScreen = document.getElementById("game-screen");

/**
* Show the main screen with user log-in and instruction icon
*/
function runMainScreen() {
    errorMessage.style.display = "none";
    mainLoginScreen.style.display = "block";
    chooseLevelScreen.style.display = "none";
    gameScreen.style.display = "none";
    document.getElementById("user").focus(); //focus on input element with cursor ready for username input
}

/**
 * Verification of the user name input on the log-in screen
 */
document.getElementById("user-log").addEventListener("click", checkUsername);

function checkUsername() {
    let username = document.getElementById("user").value.trim();

    if (username.length >= 1 && username.length <= 20) {
        chooseLevelScreen.style.display = "block";
        mainLoginScreen.style.display = "none";
    } else {
        errorMessage.style.display = "block";
        document.getElementById("user").focus();
        document.getElementById("user").value = "";
    }
}
checkUsername();

/**
 * Input of username using by pressing enter key
 */
document.getElementById("user").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkUsername();
    }
});

function selectGameLevel() {
    score = 0;
    document.getElementById('level-buttons').addEventListener('click', function (event) {
        if (!event.target.className.includes("button-level")) return; // prevent click over all div with three buttons
        let button = event.target;
        let gameLevel = button.getAttribute('data-type');
        setGame(gameLevel);
    });
}
selectGameLevel();

/**
 * Set the game screen based on level selected.
 * Display selected game level, number of guesses.
 * Set up solution for the game.
 * @param {string} gameLevel 
 */
function setGame(gameLevel) {
    chooseLevelScreen.style.display = "none";
    gameScreen.style.display = "block";
}

document.getElementById("level-buttons").addEventListener("click", runGame);

function runGame(){

    const colors = ["red", "green", "blue", "yellow", "white", "orange"];

    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    const button3 = document.getElementById("button3");
    const button4 = document.getElementById("button4");
    const checkButton = document.getElementById("check-button");
    const resultDiv = document.getElementById("result");

    let selectedColors = ["red", "green", "blue", "yellow"]; // Predefined solution colors

    // Initialize buttons with initial colors
    button1.style.backgroundColor = selectedColors[0];
    button2.style.backgroundColor = selectedColors[1];
    button3.style.backgroundColor = selectedColors[2];
    button4.style.backgroundColor = selectedColors[3];

    // Add click event listeners to buttons
    button1.addEventListener("click", () => changeColor(button1));
    button2.addEventListener("click", () => changeColor(button2));
    button3.addEventListener("click", () => changeColor(button3));
    button4.addEventListener("click", () => changeColor(button4));

    // Function to change button color
    function changeColor(button) {
        const currentColorIndex = colors.indexOf(button.style.backgroundColor);
        const nextColorIndex = (currentColorIndex + 1) % colors.length;
        button.style.backgroundColor = colors[nextColorIndex];
    }

    // Add click event listener to check button
    checkButton.addEventListener("click", checkColors);

    // Function to check if selected colors match solution
    function checkColors() {
        const selected = [
            button1.style.backgroundColor,
            button2.style.backgroundColor,
            button3.style.backgroundColor,
            button4.style.backgroundColor
        ];

        let correctPosition = 0;
        let correctColor = 0;

        for (let i = 0; i < selected.length; i++) {
            if (selected[i] === selectedColors[i]) {
                correctPosition++;
            } else if (selectedColors.includes(selected[i])) {
                correctColor++;
            }
        }

        if (correctPosition === 4) {
            resultDiv.textContent = "Congratulations! You've guessed the correct colors!";
        } else {
            resultDiv.textContent = `Correct position: ${correctPosition}, Correct color: ${correctColor}`;
        }
    }
}