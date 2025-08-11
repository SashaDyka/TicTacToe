import Board from './board.js';
import View from './view.js';

export default class GameController{
    constructor(elements){
        this.allBoardSizes = [3, 5, 7, 20, 50, 100];
        this.currentSizeIndex = 0;
        this.board = new Board(this.allBoardSizes[this.currentSizeIndex]);

        this.view = new BoardView(elements);
        this.playerX = new Player('X');  
        this.playerO = new Player('O');

        this.currentPlayer = null;
        this.gameActive = false;
    }

     
    startGame(){
        this.board.clearBoard();
        this.currentPlayer = this.playerX;
        this.gameActive = true;
        this.view.drawBoard(this.board.getCells());  
    }

    handleCellClick(row, col){

    }

    switchPlayer() {

    }


    resetGame() {
        this.currentPlayer = null; 
        this.gameActive = false; 
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
    }


}

