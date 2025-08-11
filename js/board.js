 export default class Board{
    constructor(){
        this.size = size;
        this.cells = this._createBoard(size);
        this.moveHistory = [];        
    }

    _createBoard(size) {
        return Array.from({ length: size }, () => Array(size).fill(null));
    }

    getCells() {
        return this.cells;
    }

    getSize() {
        return this.size;
    }

    isCellEmpty(row, col) {
        return this.board[row][col] === null;
    }

    addSymbol(row, col, symbol) {
        if (this.isCellEmpty(row, col)) {
        this.board[row][col] = symbol;
        return true;
        }
        return false;
    }

    checkWinner(){

    }
    
    isBoardFull() {

    }

    undoLastMove() {

    }
    
    clearBoard() {
        this.cells = this._createBoard(this.size);
        this.moveHistory = [];
    }
    
   
    



}

