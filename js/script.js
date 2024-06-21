let limit;
let currentValue = 0;
let userStarts;

function startGame() {
    limit = parseInt(document.getElementById('limitInput').value);
    if (isNaN(limit) || limit <= 0) {
        alert("Please enter a valid limit.");
        return;
    }

    document.getElementById('gameSection').classList.remove('hidden');
    document.getElementById('limitInput').disabled = true;
    document.getElementById('gameMessage').innerText = "Great! Let's start! Good luck!";

    userStarts = (limit % 3 !== 1);
    if (userStarts) {
        document.getElementById('gameMessage').innerText += " SAi wishes you to start the game.";
        document.getElementById('userInput').disabled = false;
        document.getElementById('userSubmit').disabled = false;
    } else {
        document.getElementById('gameMessage').innerText += " SAi starts the game.";
        aiTurn();
    }
}

function userTurn() {
    let userInput = parseInt(document.getElementById('userInput').value);
    if (userInput !== 1 && userInput !== 2) {
        showModal();
        return;
    }

    currentValue += userInput;
    document.getElementById('countCard').value = currentValue;
    document.getElementById('userInput').value = '';

    if (currentValue >= limit) {
        document.getElementById('winMessage').innerText = "Congratulations! You managed to win! This wasn't supposed to happen...";
        disableGameInputs();
        return;
    }

    aiTurn();
}

function aiTurn() {
    document.getElementById('userInput').disabled = true;
    document.getElementById('userSubmit').disabled = true;

    let aiInput = (limit - currentValue - 1) % 3 === 0 ? 1 : 2;
    if ((limit - currentValue) === 1) aiInput = 1; // Ensure AI wins if only 1 is left
    if ((limit - currentValue) === 2) aiInput = 2; // Ensure AI wins if only 2 are left

    currentValue += aiInput;
    document.getElementById('countCard').value = currentValue;
    document.getElementById('aiInput').value = aiInput;

    if (currentValue >= limit) {
        document.getElementById('winMessage').innerText = "SAi Wins! Better luck next time human! Adios!";
        disableGameInputs();
    } else {
        document.getElementById('userInput').disabled = false;
        document.getElementById('userSubmit').disabled = false;
    }
}

function disableGameInputs() {
    document.getElementById('userInput').disabled = true;
    document.getElementById('userSubmit').disabled = true;
    setTimeout(resetGame, 3000); // Reset the game after displaying the win message for 3 seconds
}

function resetGame() {
    currentValue = 0;
    document.getElementById('limitInput').value = '';
    document.getElementById('limitInput').disabled = false;
    document.getElementById('gameSection').classList.add('hidden');
    document.getElementById('userInput').disabled = true;
    document.getElementById('userSubmit').disabled = true;
    document.getElementById('countCard').value = '';
    document.getElementById('aiInput').value = '';
    document.getElementById('gameMessage').innerText = '';
    document.getElementById('winMessage').innerText = '';
}

function showModal() {
    const modal = document.getElementById('invalidInputModal');
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById('invalidInputModal');
    modal.style.display = "none";
}
