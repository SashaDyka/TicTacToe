const gameBoard = document.getElementById('gameBoard');
const statusText = document.getElementById('status');
const chooseX = document.getElementById('chooseX');
const chooseO = document.getElementById('chooseO');

const undoBtn = document.getElementById('undoBtn');
const resetBtn = document.getElementById('resetBtn');
const reduceBtn = document.getElementById('reduceBtn');
const enlargeBtn = document.getElementById('enlargeBtn');

const crossSymbol = 'X';
const zeroSymbol = 'O'; 

class TicTacToe{
    constructor(){
        this.ollSizes = [3, 5, 7, 20, 50, 100];
        this.history = [];
    
        this.currentSizeIndex = 0;
        this.maxSize = 100;
        this.board = this.createBoard(this.maxSize);
        this.currentPlayer = null;
        this.gameActive = false;
    } 

    get currentSize() {
        return this.ollSizes[this.currentSizeIndex];
    }
    
    createBoard(size){
        return Array.from({ length: size}, () => Array(size).fill(null));
    }

    drawBoard(){
        const boardElement  = gameBoard;
        boardElement.innerHTML = '';

        boardElement.style.gridTemplateColumns = `repeat(${this.currentSize}, 1fr)`;
        boardElement.style.gridTemplateRows = `repeat(${this.currentSize}, 1fr)`;

        for(let row=0; row < this.currentSize; row++){
            for(let column=0; column < this.currentSize; column++){
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.column = column;

                cell.addEventListener('click', () => this.handleClick(row, column));
                boardElement.appendChild(cell);
            }
        }

    }

   

    handleClick(row, column) {
        if (!this.gameActive || this.board[row][column]) {
            return;
        }

        const currentSymbol = this.currentPlayer;
        this.history.push({ row, column, symbol: currentSymbol });

        this.board[row][column] = currentSymbol;
        const cell = document.querySelector(`[data-row="${row}"][data-column="${column}"]`);
        cell.textContent = currentSymbol;

        const winner = this.checkWinner();
        if (winner) {
            statusText.textContent = `Player ${winner} won!`;
            this.gameActive = false;
            return;
        }

        if (this.checkTie()) {
            statusText.textContent = `Tie!`;
            this.gameActive = false;
            return;
        }

        this.currentPlayer = currentSymbol === crossSymbol ? zeroSymbol : crossSymbol;
        statusText.textContent = `Player ${this.currentPlayer} turn`;
    }
        
    checkTie() {
        return this.board.every(row => row.every(cell => cell !== null));
    }
  

    enlargeBoardSize() {
        if (this.currentSizeIndex < this.ollSizes.length - 1) {
            this.currentSizeIndex++;
            this.drawBoard();
        }
    }

    reduceBoardSize(){
        if(this.currentSizeIndex > 0) {
        this.currentSizeIndex--;
        this.drawBoard();
        }
    }



    checkWinner(){
        const size = this.currentSize;
        const board = this.board;
        const requiredToWin = 3; 

        // Horizontal check
        for(let row=0; row < size - requiredToWin; row++){
            for(let column=0; column < size; column++){
                const symbol = board[row][column];
                if (symbol === null) continue;

                let isWinning = true;
                for (let i = 1; i < requiredToWin; i++) {
                    if (board[row][column + i] !== symbol) {
                        isWinning = false;
                        break;
                    }
                }
                
                if (isWinning) {
                    return symbol; 
                }
            }
        }

        // Vertical check
        for(let column=0; column < size; column++){
            for(let row=0; row < size; row++){
                const symbol = board[row][column];
                if (symbol === null) continue;

                let isWinning = true;
                for (let i = 1; i < requiredToWin; i++) {
                    if (board[row + i][column] !== symbol) {
                        isWinning = false;
                        break;
                    }
                }
                
                if (isWinning) return symbol; 
            }
        }
        
        // Diagonal check (left to right)
        for (let row = 0; row <= size - requiredToWin; row++) {
            for (let col = 0; col <= size - requiredToWin; col++) {
                const symbol = board[row][col];
                if (symbol === null) continue;

                let isWinning = true;
                for (let i = 1; i < requiredToWin; i++) {
                    if (board[row + i][col + i] !== symbol) {
                        isWinning = false;
                        break;
                    }
                }
                if (isWinning) return symbol;
            }
        }

        // Diagonal check (right to left)
        for (let row = 0; row <= size - requiredToWin; row++) {
            for (let col = requiredToWin - 1; col < size; col++) {
                const symbol = board[row][col];
                if (symbol === null) continue;

                let isWinning = true;
                for (let i = 1; i < requiredToWin; i++) {
                    if (board[row + i][col - i] !== symbol) {
                        isWinning = false;
                        break;
                    }
                }
                if (isWinning) return symbol;
            }
        }

        return null;
    }

    setPlayer(symbol) {
        this.currentPlayer = symbol;
        statusText.textContent = `Player ${this.currentPlayer} goes first`;
        this.gameActive = true;
        this.drawBoard(); 
    }

    resetGame() {
        this.board = this.createBoard(this.currentSize);
        this.currentPlayer = null; 
        this.gameActive = false; 
        statusText.textContent = "Choose your symbol";
        
        this.drawBoard(); 
    }

    undoLastMove() {
        if (this.history.length === 0) {
            return; 
        }

        if (!this.gameActive) {
            this.gameActive = true;
        }
        
        const lastMove = this.history.pop(); 
        const { row, column, symbol } = lastMove;

        this.board[row][column] = null; 
        
        const cell = document.querySelector(`[data-row="${row}"][data-column="${column}"]`);
        if (cell) {
            cell.textContent = ''; 
        }

        this.currentPlayer = symbol;
        statusText.textContent = `Player ${this.currentPlayer} turn`;
    }
    

} 

    



    const game = new TicTacToe();
    game.drawBoard();
    statusText.textContent = "Choose your symbol to start";

    enlargeBtn.addEventListener('click', () => game.enlargeBoardSize());
    reduceBtn.addEventListener('click', () => game.reduceBoardSize());
    chooseX.addEventListener('click', () => game.setPlayer(crossSymbol));
    chooseO.addEventListener('click', () => game.setPlayer(zeroSymbol));

    resetBtn.addEventListener('click', () => game.resetGame());
    undoBtn.addEventListener('click', () => game.undoLastMove());




    
