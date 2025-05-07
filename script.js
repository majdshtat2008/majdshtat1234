const board = document.getElementById('game-board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill("");

const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function renderBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.textContent = gameState[i];
        if (gameState[i] === 'X') cell.classList.add('x');
        if (gameState[i] === 'O') cell.classList.add('o');
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(e) {
    const idx = e.target.dataset.index;
    if (!gameActive || gameState[idx]) return;
    gameState[idx] = currentPlayer;
    renderBoard();
    if (checkWin()) {
        statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
        gameActive = false;
        confetti();
        return;
    }
    if (!gameState.includes("")) {
        statusText.textContent = "Game ended: Draw!";
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winCombos.some(combo => {
        const [a, b, c] = combo;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function restartGame() {
    gameState = Array(9).fill("");
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    renderBoard();
}

restartBtn.addEventListener('click', restartGame);

function confetti() {
    for (let i = 0; i < 80; i++) {
        const conf = document.createElement('div');
        conf.className = 'confetti';
        conf.style.left = Math.random() * 100 + '%';
        conf.style.background = `hsl(${Math.random()*360}, 70%, 60%)`;
        conf.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 2000);
    }
}

const style = document.createElement('style');
style.textContent = `.confetti {
    position: fixed;
    top: 0;
    width: 8px;
    height: 18px;
    border-radius: 3px;
    opacity: 0.8;
    z-index: 9999;
    animation: fall 2s linear forwards;
}
@keyframes fall {
    to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}`;
document.head.appendChild(style);

restartGame();