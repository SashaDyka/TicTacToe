const board = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const undoBtn = document.getElementById('undoBtn');
const resetBtn = document.getElementById('resetBtn');
const chooseX = document.getElementById('chooseX');
const chooseO = document.getElementById('chooseO');

let currentPlayer = 'X';
let moves = Array(9).fill('');
let history = [];
let gameEnded = true;

chooseX.addEventListener('click', () => {    
    if (history.length > 0) return; 
    currentPlayer = 'X';
    chooseX.classList.add('active');
    chooseO.classList.remove('active');
    updateStatus();
});


chooseO.addEventListener('click', () => {
    if (history.length > 0) return; 
    currentPlayer = 'O';
    chooseO.classList.add('active');
    chooseX.classList.remove('active');
    updateStatus();
});


function startGame() {
    currentPlayer = 'X'; 
    moves = Array(9).fill('');
    history = [];
    gameActive = true;
    board.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    chooseX.classList.add('active');
    chooseO.classList.remove('active');
    updateStatus();
}

function updateStatus(text) {
    if (text) {
        statusText.textContent = text;
    } else {
        const symbol = currentPlayer === 'X' ? '❌' : '⭘';
        statusText.textContent = `Move: ${symbol}`;
    }
}

function checkWinner() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (moves[a] && moves[a] === moves[b] && moves[b] === moves[c]) {
            const winnerSymbol = moves[a] === 'X' ? '❌' : '⭘';
            updateStatus(`Winner: ${winnerSymbol}`);
            gameActive = false; 
            return true;
        }
    }

    if (moves.every(cell => cell !== '')) {
        updateStatus('Draw!');
        gameActive = false; 
        return true;
    }

    return false;
}


board.forEach(cell => {
    cell.addEventListener('click', () => {
    const index = cell.dataset.index;

    if (!gameActive || moves[index] !== '') {
        return; 
    }

    moves[index] = currentPlayer;
    cell.textContent = currentPlayer === 'X' ? '❌' : '⭘';
    cell.classList.add('taken');
    history.push(index);

    if (!checkWinner()) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateStatus();
    }
  });
});


undoBtn.addEventListener('click', () => {
    if (!gameActive || history.length === 0) return;

    const lastMove = history.pop();
    moves[lastMove] = '';
    board[lastMove].textContent = '';
    board[lastMove].classList.remove('taken');
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
});

resetBtn.addEventListener('click', () => {
    startGame();
});

startGame();