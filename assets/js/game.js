/**
 * Add an event listener to the document and run the main screen with user log-in
 */
document.addEventListener('DOMContentLoaded', function () {
    runMainScreen();
});

/**
 * Setting up global variables of various ID's to be able to show and hide
 */
let mainLoginScreen = document.getElementById("login-screen");
let getInstructions = document.getElementById("instructions-icon");
let errorMessage = document.getElementById("error-message");
let chooseLevelScreen = document.getElementById("choose-level-screen");
let gameScreen = document.getElementById("game-screen");
let resetButton = document.getElementById("reset-button");
let contactMobile = document.getElementById("contact-mobile");
let colors = [];


// Function to update the text based on screen width
function mobileIcons() {
    const screenWidth = window.innerWidth;

    if (screenWidth > 425) {
        contactMobile.style.display = "none"
    } else{
        contactMobile.style.display = "block"
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
        document.getElementById("username").innerText = username;
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
        runGame(gameLevel);
    });
}
selectGameLevel();

function runGame(gameLevel){
    //change the display to the game screen
    chooseLevelScreen.style.display = "none";
    gameScreen.style.display = "block";
    resetButton.style.display = "none";

    //set the size of the array depending on the level of the game
    if(gameLevel === "easy"){
        colors = ["grey","white"];
    }else if (gameLevel === "medium"){
        colors = ["red", "green", "blue", "yellow"];
    }else if(gameLevel === "hard") {
        colors = ["red", "green", "blue", "yellow", "white", "grey"];
    }

    let button1 = document.getElementById("button1");
    let button2 = document.getElementById("button2");
    let button3 = document.getElementById("button3");
    let button4 = document.getElementById("button4");
    let guessCounter = 0;
    const checkButton = document.getElementById("check-button");
    const resultDiv = document.getElementById("result");
    const guessDiv = document.getElementById("guesses");
    

    /**
     * creating a the answer from a random array
     * @param {*} arr 
     * @param {*} numElements 
     * @returns 
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
    const selectedColors = getRandomElementsFromArray(colors, 4);
    console.log(selectedColors); //answer shown in console for ease of marking and testing. THIS IS INTENTIONAL
    
    //Initialize buttons with initial colors
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

    //Add click event listener to check button
    checkButton.addEventListener("click", checkColors);

    
    //Function to check if selected colors match solution
    function checkColors() {
        let correctPosition = 0;
        let correctColor = 0;
        
        const selected = [
            button1.style.backgroundColor,
            button2.style.backgroundColor,
            button3.style.backgroundColor,
            button4.style.backgroundColor
        ];
    
        for (let i = 0; i < selected.length; i++) {
            if (selected[i] === selectedColors[i]) {
                correctPosition++;
            } else if (selectedColors.includes(selected[i])) {
                correctColor++;
            }
        }
        
    
        if (correctPosition == 4 && guessCounter == 1) {
            resultDiv.textContent = `Well Done! You've cracked the code in ${guessCounter} guess!`;
            guessDiv.style.display = "none"
            resetButton.style.display = "block";
        } else if(correctPosition == 4){
            guessCounter++; 
            resultDiv.textContent = `Well Done! You've cracked the code in ${guessCounter} guesses!`;
            guessDiv.style.display = "none"
            resetButton.style.display = "block";   
        } else if(gameLevel === "easy") {
            guessCounter++; 
            guessDiv.textContent = `Number of guesses: ${guessCounter}`;
            resultDiv.textContent = `Correct position: ${correctPosition}`;
        } else {
            guessCounter++;
            guessDiv.textContent = `Number of guesses: ${guessCounter}`;
            resultDiv.textContent = `Correct position: ${correctPosition}, Correct color: ${correctColor}`;                      
        }
       
        //function to reset the game
        function resetGame(){
            guessDiv.style.display = "block";
            resultDiv.textContent = "";
            guessDiv.textContent = "";
            guessCounter = 0;
            gameScreen.style.display = "none";
            resetButton.style.display = "none";
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