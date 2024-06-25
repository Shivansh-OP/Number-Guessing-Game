document.addEventListener('DOMContentLoaded', () => {
    const userGuess = document.getElementById('userGuess');
    let randomGuess = Math.floor(Math.random() * 100 + 1);
    const previousGuess = document.getElementById('previousGuess');
    const remainingGuess = document.getElementById('remainingGuess');
    const changeHeight = document.getElementById('changeHeight');
    const numberLowOrHigh = document.getElementById('numberLowOrHigh');
    const hmm = document.getElementById('hmm');
    const p = document.createElement('p');

    let prevGuess = [];
    let numGuess = 1;
    let playGame = true;
    
    if (playGame) {
        document.addEventListener('submit', (e) => {
            e.preventDefault() 
            const guess = parseInt(userGuess.value)
            validateGuess(guess)
        })
    }
    
    function validateGuess(guess) {
        if (guess < 1) {
            alert("Entered number is less than 1");
        }
        else if (guess > 100) {
            alert("Entered number is greater than 100");
        }
        else {
            prevGuess.push(guess)
            if (numGuess === 10) {
                displayGuess(guess)
                displayMessage(`Game Over! The Number was ${randomGuess}`)
                endGame()
            } else {
                displayGuess(guess)
                checkGuess(guess)
            }
        }
    }
    
    function checkGuess(guess) {
        if (guess === randomGuess){
            displayMessage(`You Guessed it Right!! Number is ${randomGuess} :)`);
            endGame();
        }
        else if (guess < randomGuess) {
            displayMessage(`Guessed Number is Too Low :(`);
        }
        else if (guess > randomGuess) {
            displayMessage(`Guessed Number is Too High :(`);
        }
    }
    
    function displayGuess(guess) {
        userGuess.value = "";
        previousGuess.innerHTML += `${guess}, `;
        numGuess ++;
        remainingGuess.innerHTML = `${11 - numGuess}`;
    }
    
    function displayMessage(message) {
        changeHeight.classList.add("md:h-80")
        numberLowOrHigh.innerHTML = `${message}`;
    }
    
    function endGame() {
        userGuess.value = "";
        userGuess.setAttribute('disabled', "");
        p.classList.add('button');
        p.innerHTML =
        `
            <h2 id="startNewGame" class="flex justify-center items-center text-white font-bold mb-5 cursor-pointer">
                Start a New Game
            </h2>
        `;
        hmm.appendChild(p);
        playGame = false;
        newGame();
    }
    
    function newGame() {
        const startNewGame = document.getElementById("startNewGame")
        startNewGame.addEventListener('click' ,function() {
            randomGuess = Math.floor(Math.random() * 100 + 1);
            prevGuess = [];
            numGuess = 1;
            previousGuess.innerHTML = "";
            remainingGuess.innerHTML = `${11 - numGuess}`;
            userGuess.removeAttribute('disabled');
            hmm.removeChild(p);
            playGame = true;
        })
    }
})
