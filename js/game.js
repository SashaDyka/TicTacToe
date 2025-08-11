import Board from './board.js';
import boardView from './view.js';
import Player from './player.js';


export default class GameController{
    constructor(elements){
        this.allBoardSizes = [3, 5, 7, 20, 50, 100];
        this.currentSizeIndex = 0;
        this.board = new Board(this.allBoardSizes[this.currentSizeIndex]);

        this.view = new boardView(elements);
        this.playerX = new Player('X');  
        this.playerO = new Player('O');

        this.currentPlayer = this.playerX;
        this.gameActive = false;


        /* Add Event listeners from View */
        this.view.onCellClick((row, col) => this.handleCellClick(row, col));
        this.view.onChooseX(symbol => this.choosePlayer(symbol));
        this.view.onChooseO(symbol => this.choosePlayer(symbol));
        this.view.onUndo(() => this.undoLastMove());
        this.view.onReset(() => this.startGame());
        this.view.onEnlarge(() => this.changeBoardSize(true));
        this.view.onReduce(() => this.changeBoardSize(false));
        
    }
        
     
    startGame(){
        this.board.clearBoard();
        this.currentPlayer = this.playerX;
        this.gameActive = true;
        this.view.drawBoard(this.board.getCells());  
    }


    changeBoardSize(increase) {
                    
    }



    handleCellClick(row, col){

    }

    switchPlayer() {

    }


    resetGame() {
        this.currentPlayer = null; 
        this.gameActive = false; 
    }

    


}

