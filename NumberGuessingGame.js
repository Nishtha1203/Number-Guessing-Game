document.addEventListener("DOMContentLoaded", () => {
    const maxNumberInput = document.getElementById("maxNumberInput");
    const guessInput = document.getElementById("guessInput");
    const guessBtn = document.getElementById("guessBtn");
    const guessSection = document.getElementById("guessSection");
    const message = document.getElementById("message");
    const attemptsDisplay = document.getElementById("attempts");

    let targetNum;
    let attempts = 0;
    let gameOver = false;

    maxNumberInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            const maximum = parseInt(maxNumberInput.value);
            if (!maximum || maximum <= 0) {
                alert("Please enter a valid positive number.");
                return;
            }
            targetNum = Math.floor(Math.random() * maximum) + 1;
            attempts = 0;
            gameOver = false;
            maxNumberInput.disabled = true;
            guessSection.classList.remove("hidden");
            message.textContent = "";
            attemptsDisplay.textContent = "";
            console.log(`Target Number: ${targetNum}`); // For debugging
        }
    });

    const handleGuess = () => {
        if (gameOver) return;

        const guess = guessInput.value.trim().toLowerCase();
        if (guess === "quit") {
            gameOver = true;
            message.textContent = `Game Over. The number was ${targetNum}.`;
            attemptsDisplay.textContent = "";
            guessInput.disabled = true;
            guessBtn.disabled = true;
            return;
        }

        const guessNumber = parseInt(guess);
        if (isNaN(guessNumber)) {
            alert("Please enter a valid number or 'Quit' to exit.");
            return;
        }

        attempts++;
        if (guessNumber === targetNum) {
            message.textContent = `YOU GOT IT! It took you ${attempts} guesses.`;
            attemptsDisplay.textContent = "";
            guessInput.disabled = true;
            guessBtn.disabled = true;
            gameOver = true;
        } else if (guessNumber > targetNum) {
            message.textContent = "Number too high! Try again.";
        } else {
            message.textContent = "Number too low! Try again.";
        }
        attemptsDisplay.textContent = `Attempts: ${attempts}`;
        guessInput.value = "";
    };

    guessBtn.addEventListener("click", handleGuess);

    guessInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            handleGuess();
        }
    });
});

