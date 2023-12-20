const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});
restartButton.addEventListener('click', restartGame);

function handleCellClick(e) {
    const cell = e.target;
    if (cell.textContent !== '' || !gameActive) {
        // Cell already clicked or game not active
        return;
    }
    cell.textContent = currentPlayer;
    let winInfo = checkWin(currentPlayer);
    if (winInfo.isWinner) {
        drawWinLine(winInfo.combination);
        setTimeout(() => alert(`${currentPlayer} wins!`), 10);
        gameActive = false;
        return;
    }
    if (checkDraw()) {
        alert('Game Draw!');
        gameActive = false;
        return;
    }
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (let combination of winPatterns) {
        if (combination.every(index => cells[index].textContent === player)) {
            return { isWinner: true, combination: combination };
        }
    }
    return { isWinner: false, combination: [] };
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function drawWinLine(combination) {
    combination.forEach(index => {
        cells[index].style.color = 'red'; // Change color to red for winning combination
    });
    // Additional styles or line drawing can be added here
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = 'white'; // Reset color back to white
    });
    currentPlayer = 'X';
    gameActive = true;
}

