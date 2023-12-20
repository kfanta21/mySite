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
    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} wins!`);
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

    return winPatterns.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function restartGame() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
}

