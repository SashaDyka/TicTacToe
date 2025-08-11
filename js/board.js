 export default class Board{
    constructor(size){
        this.size = size; 
        this.cells = this.createBoard(size);
        this.moveHistory = [];        
    }

    createBoard(size) {
        return Array.from({ length: size }, () => Array(size).fill(null));
    }

    getCells() {
        return this.cells;
    }

    getSize() {
        return this.size;
    }

    setSize(newSize) {
        this.size = newSize;
        this.cells = this.createBoard(newSize); 
        this.moveHistory = [];
    }

    isCellEmpty(row, col) {
        return this.board[row][col] === null;
    }

    addSymbol(row, col, symbol) {
        if (this.isCellEmpty(row, col)) {
            this.cells[row][col] = symbol;
            this.moveHistory.push({ row, col });
            return true;
        }
        return false;
    }

    undoLastMove() {
        const lastMove = this.moveHistory.pop();
        if (lastMove) {
            this.cells[lastMove.row][lastMove.col] = null;
            return true;
        }
        return false;
    }
    
    clearBoard() {
        this.cells = this._createBoard(this.size);
        this.moveHistory = [];
    }
    
   
    isBoardFull() {
        return this.cells.every(row => row.every(cell => cell !== null));
    }
    
    checkWinner(requiredToWin = 3) {
        const size = this.size; 
        const board = this.cells; 

        // Horizontal check
        for (let row = 0; row < size; row++) {
            for (let col = 0; col <= size - requiredToWin; col++) {
                const symbol = board[row][col];
                if (symbol === null) continue;

                let isWinning = true;
                for (let i = 1; i < requiredToWin; i++) {
                    if (board[row][col + i] !== symbol) {
                        isWinning = false;
                        break;
                    }
                }
                if (isWinning) return symbol;
            }
        }

        // Vertical check
        for (let col = 0; col < size; col++) {
            for (let row = 0; row <= size - requiredToWin; row++) {
                const symbol = board[row][col];
                if (symbol === null) continue;

                let isWinning = true;
                for (let i = 1; i < requiredToWin; i++) {
                    if (board[row + i][col] !== symbol) {
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



}

