/* jshint esversion: 6 */
/**
 * Add an event listener to the document and run the main screen with user log-in once the DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function () {
    runMainScreen();
});

/**
 * Setting up global variables of various ID's to be able to show and hide game elements
 */
let mainLoginScreen = document.getElementById("login-screen");
let errorMessage = document.getElementById("error-message");
let chooseLevelScreen = document.getElementById("choose-level-screen");
let gameScreen = document.getElementById("game-screen");
let resetButton = document.getElementById("reset-button");
let contactMobile = document.getElementById("contact-mobile");
let lastGuessContainer = document.getElementById("lastGuessContainer");
let failedAnswerContainer = document.getElementById("failedAnswerContainer");
let instructionsContainer = document.getElementById("instructions");
let colors = [];

// Function to show an additional icon in the footer to access the contact page when on a small screen
function mobileIcons() {
    const screenWidth = window.innerWidth;

    if (screenWidth > 425) {
        contactMobile.style.display = "none";
    } else{
        contactMobile.style.display = "block";
    }
}

// Call the function initially and add event listener for window resize
mobileIcons();
window.addEventListener("resize", mobileIcons);

/**
* Show the main screen with user log-in and instruction icon
*/
function runMainScreen() {
    errorMessage.style.display = "none";
    mainLoginScreen.style.display = "block";
    chooseLevelScreen.style.display = "none";
    instructionsContainer.style.display = "none";
    gameScreen.style.display = "none";
    document.getElementById("user").focus(); //focus on input element with cursor ready for username input
}

/**
* Shows instructions when clicked and if it is already open close the instruction container again.
*/
function showInstructions(){  
    const display = window.getComputedStyle(instructionsContainer).getPropertyValue("display");
    if (display == "none") {
        instructionsContainer.style.display = "block";
        document.getElementById("btn-close").style.display = "block";
    }
    else {
        instructionsContainer.style.display = "none";
        document.getElementById("btn-close").style.display = "none";
    }
}

/**
* closes instructions when close button is clicked.
*/
function closeInstructions(){
    instructionsContainer.style.display = "none";
    document.getElementById("btn-close").style.display = "none";
}
document.getElementById("btn-close").addEventListener("click", closeInstructions);

/**
 * Verification of the user name input on the log-in screen.
 */
document.getElementById("user-log").addEventListener("click", checkUsername);

function checkUsername() {
    let username = document.getElementById("user").value.trim();
// If username is successful add close name entry screen and proceed to the difficulty level.
    if (username.length >= 1 && username.length <= 20) {
        chooseLevelScreen.style.display = "block";
        mainLoginScreen.style.display = "none";
        instructionsContainer.style.display = "none";
        document.getElementById("username").innerText = username;
    } else {
        errorMessage.style.display = "block";
        document.getElementById("user").focus();
        document.getElementById("user").value = "";
    }
}
checkUsername();

/**
 * Input of username using by pressing enter key.
 */
document.getElementById("user").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkUsername();
    }
});

function selectGameLevel() {
    document.getElementById('level-buttons').addEventListener('click', function (event) {
        if (!event.target.className.includes("button-level")) return; // prevent click over all div with three buttons.
        let button = event.target;
        let gameLevel = button.getAttribute('data-type');
        runGame(gameLevel);
    });
}
selectGameLevel();

function runGame(gameLevel){
    //change the display to the game screen and hides the level select screen and reset button for future games.
    chooseLevelScreen.style.display = "none";
    resetButton.style.display = "none";
    gameScreen.style.display = "block";

    //set the array depending on the level of the game that was selected.
    if(gameLevel === "easy"){
        colors = ["grey","white"];
    }else if (gameLevel === "medium"){
        colors = ["red", "green", "blue", "yellow"];
    }else if(gameLevel === "hard") {
        colors = ["red", "green", "blue", "yellow", "white", "grey"];
    }

    //Variables that target various IDs to be able to manipulate them.
    let button1 = document.getElementById("button1");
    let button2 = document.getElementById("button2");
    let button3 = document.getElementById("button3");
    let button4 = document.getElementById("button4");
    let checkButton = document.getElementById("check-button");
    const resultDiv = document.getElementById("result");
    const guessDiv = document.getElementById("guesses");
    const remainDiv = document.getElementById("remaining-guesses");    
    let guessCounter = 0; //number of guesses that have occurred
    let guessesLeft = 10; // number of guesses that are left before game failed function called.

    /**
     * creating a function that randomly selects an element from the array that was set up from the difficulty screen.
     */
    function getRandomElementsFromArray(arr, numElements) {
        let randomElements = [];
        
        for (let i = 0; i < numElements; i++) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            const randomElement = arr[randomIndex];
            randomElements.push(randomElement);
        }
        return randomElements;
    }
    //creates the answer for the game by selecting 4 colors from the required array.
    const selectedColors = getRandomElementsFromArray(colors, 4);
    console.log(selectedColors); //answer shown in console for ease of marking and testing. THIS IS INTENTIONAL.
    
    //Initialize buttons with initial colors easy allows for alternate colors as there are only 2 colors to select from.
    if(gameLevel === "easy"){
        button1.style.backgroundColor = colors[0];
        button2.style.backgroundColor = colors[1];
        button3.style.backgroundColor = colors[0];
        button4.style.backgroundColor = colors[1];
    }else{
        button1.style.backgroundColor = colors[0];
        button2.style.backgroundColor = colors[1];
        button3.style.backgroundColor = colors[2];
        button4.style.backgroundColor = colors[3];
    }
    //Add click event listener to check button.
    checkButton.addEventListener("click", checkColors);
    
    //Function to check if selected colors match solution.
    function checkColors() {
        let correctPosition = 0;
        let correctColor = 0;
        // array that holds the color of the buttons when checked
        const selected = [
            button1.style.backgroundColor,
            button2.style.backgroundColor,
            button3.style.backgroundColor,
            button4.style.backgroundColor
        ];
        
        //Loop that goes through the selected array and compares it to the selectedColors array to see if it is correct.
        for (let i = 0; i < selected.length; i++) {
            if (selected[i] === selectedColors[i]) {
                correctPosition++;
            } else if (selectedColors.includes(selected[i])) {
                correctColor++;
            }
        }
        //the if statement that deals with the result of check. By showing and hiding selected Div's to proceed the games. 
        //This is if the player has guessed correctly and done it in one guess
        if (correctPosition == 4 && guessCounter == 1) {
            resultDiv.textContent = `Well Done! You've cracked the code in ${guessCounter} guess!`;
            guessDiv.style.display = "none";
            remainDiv.style.display = "none";
            lastGuessContainer.style.display = "none";
            checkButton.style.display = "none";
            resetButton.style.display = "block";
        // This is if the player has guessed correctly in multiple guesses
        } else if(correctPosition == 4){
            guessCounter++; 
            resultDiv.textContent = `Well Done! You've cracked the code in ${guessCounter} guesses!`;
            guessDiv.style.display = "none";
            checkButton.style.display = "none";
            remainDiv.style.display = "none";
            lastGuessContainer.style.display = "none";
            resetButton.style.display = "block";
        // This is if the player has guessed incorrectly on easy difficulty it will show how many are in the correct place but not color being there
        // only 2 colors in this game mode it will also increment and decrement the guess counter and how many guesses are left
        } else if(gameLevel === "easy") {
            guessCounter++; 
            guessesLeft --;
            guessDiv.textContent = `Number of guesses: ${guessCounter}`;
            resultDiv.textContent = `Correct position: ${correctPosition}`;
            remainDiv.textContent = `Number of guesses remaining: ${guessesLeft}`;
            previousGuesses();
        // This is if the player has guessed incorrectly and on the other difficulties and will state if the color is at least correct while altering the counters 
        } else {
            guessCounter++;
            guessesLeft --;
            guessDiv.textContent = `Number of guesses: ${guessCounter}`;
            resultDiv.textContent = `Correct position: ${correctPosition}, Correct color: ${correctColor}`;
            remainDiv.textContent = `Number of guesses remaining: ${guessesLeft}`;
            previousGuesses();                      
        }

        if(guessesLeft == 0){
            gameFailed();
        }
        /**
         * Function that takes the previous guess and adds it to the bottom of the website.
         */
        function previousGuesses() {
            
            // If the container doesn't exist, create it
            if (!lastGuessContainer) {
                lastGuessContainer = document.createElement('div');
                lastGuessContainer.id = "lastGuessContainer";
                gameScreen.appendChild(lastGuessContainer);
            }
        
            let lastGuess = document.createElement('div');
            lastGuess.classList.add('buttons');
            let html = `
                <h3> Last Guess: </h3>
                <button class="color-button" id="button-a"></button>
                <button class="color-button" id="button-b"></button>
                <button class="color-button" id="button-c"></button>
                <button class="color-button" id="button-d"></button>
            `;
            
            lastGuess.innerHTML = html;
        
            // Clear the previous content before appending the new content
            lastGuessContainer.innerHTML = "";
        
            // Append the new content
            lastGuessContainer.appendChild(lastGuess);
            lastGuessContainer.style.display = "Block";
        
            let buttonA = document.getElementById("button-a");
            let buttonB = document.getElementById("button-b");
            let buttonC = document.getElementById("button-c");
            let buttonD = document.getElementById("button-d");
        
            // Store the colors of the buttons in an object
            let lastGuessColors = {
                buttonAColor: button1.style.backgroundColor,
                buttonBColor: button2.style.backgroundColor,
                buttonCColor: button3.style.backgroundColor,
                buttonDColor: button4.style.backgroundColor
            };
        
            // Set the background color of each button
            buttonA.style.backgroundColor = lastGuessColors.buttonAColor;
            buttonB.style.backgroundColor = lastGuessColors.buttonBColor;
            buttonC.style.backgroundColor = lastGuessColors.buttonCColor;
            buttonD.style.backgroundColor = lastGuessColors.buttonDColor;
        }

        function gameFailed(){

            if (!failedAnswerContainer) {
                failedAnswerContainer = document.createElement('div');
                failedAnswerContainer.id = "failedAnswerContainer";
                gameScreen.appendChild(failedAnswerContainer);
            }

            lastGuessContainer.style.display = "none";
            checkButton.style.display = "none";
            resultDiv.textContent = `I'm afraid you haven't cracked the code in time. The world is doomed!!!`;
            guessDiv.style.display = "none";
            resetButton.style.display = "block";

            let failedAnswer = document.createElement('div');
            failedAnswer.classList.add('buttons');
            let html = `
                <h3> The answer was: </h3>
                <button class="color-button" id="button-w"></button>
                <button class="color-button" id="button-x"></button>
                <button class="color-button" id="button-y"></button>
                <button class="color-button" id="button-z"></button>
            `;

            failedAnswer.innerHTML = html;
        
            // Clear the previous content before appending the new content
            failedAnswerContainer.innerHTML = "";
        
            // Append the new content
            failedAnswerContainer.appendChild(failedAnswer);
            failedAnswerContainer.style.display = "Block";
        
            let buttonW = document.getElementById("button-w");
            let buttonX = document.getElementById("button-x");
            let buttonY = document.getElementById("button-y");
            let buttonZ = document.getElementById("button-z");

            // Set the background color of each button
            buttonW.style.backgroundColor = selectedColors[0];
            buttonX.style.backgroundColor = selectedColors[1];
            buttonY.style.backgroundColor = selectedColors[2];
            buttonZ.style.backgroundColor = selectedColors[3];       
        }
       
        //function to reset the game
        function resetGame(){
            guessDiv.style.display = "block";
            checkButton.style.display = "block";
            resultDiv.textContent = "";
            guessDiv.textContent = "";
            remainDiv.textContent ="";
            guessCounter = 0;
            guessesLeft = 10;
            gameScreen.style.display = "none";
            resetButton.style.display = "none";
            lastGuessContainer.style.display = "none";
            if(failedAnswerContainer){
                failedAnswerContainer.style.display = "none";
            }
            console.clear(); //clears console for the sake of housekeeping
            checkUsername(); //runs checkUsername to get back to the select level screen
        }
        resetButton.addEventListener("click", resetGame);
    }
}
  
// Function to change button color
function changeColor(button) {    
    let currentColorIndex = colors.indexOf(button.style.backgroundColor);
    let nextColorIndex = (currentColorIndex + 1) % colors.length;
    button.style.backgroundColor = colors[nextColorIndex];
}

//Add click event listeners to buttons
button1.addEventListener("click", () => changeColor(button1));
button2.addEventListener("click", () => changeColor(button2));
button3.addEventListener("click", () => changeColor(button3));
button4.addEventListener("click", () => changeColor(button4));