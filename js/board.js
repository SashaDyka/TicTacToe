 export class Board{
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
        this.clear();
    }


    isCellEmpty(row, col) {
        return this.cells[row][col] === null;
    }

    addSymbol(row, col, symbol) {
        if (this.isCellEmpty(row, col)) {
        this.cells[row][col] = symbol;
        return true;
        }
        return false;
    }

    clear() {
        this.cells = this.createBoard(this.size);
    }


    undoLastMove() {

    }
    

    checkWinner(){

    }

   
    isBoardFull() {

    }





}

 /*this.allBoardSizes = [3, 5, 7, 20, 50, 100];
        this.currentSizeIndex = 0;
        this.maxSize = 100;*/