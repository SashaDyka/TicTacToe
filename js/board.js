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
    
    checkWinner(){

    }


}

