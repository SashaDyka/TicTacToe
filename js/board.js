 export class Board{
    constructor(size){
        this.size = size;
        this.cells = this.createBoard(size);
        this.moveHistory = [];        
    }


    getCells() {
        return this.cells;
    }

    getSize() {
        return this.size;
    }

    createBoard(size) {
        return Array.from({ length: size }, () => Array(size).fill(null));
    }



    addSymbol(row, col, symbol) {

    }

    clear() {

    }


    undoLastMove() {

    }
    

    checkWinner(){

    }

   
    isBoardFull() {

    }





}

