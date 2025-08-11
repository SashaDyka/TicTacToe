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

        this.history = [];

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
        this.history = [];
        this.currentPlayer = this.playerX;
        this.gameActive = true;
        this.view.drawBoard(this.board.getCells());  
        this.view.updateStatus(`Player ${this.currentPlayer.getSymbol()} walk`);
        this.view.checkBoardSize(this.board.getSize());
    }


    changeBoardSize(increase) {
        if (increase) {
            if (this.currentSizeIndex < this.allBoardSizes.length - 1) {
                this.currentSizeIndex++;
            }
        } else {
            if (this.currentSizeIndex > 0) {
                this.currentSizeIndex--;
            }
        }
        const newSize = this.allBoardSizes[this.currentSizeIndex];
        this.board.setSize(newSize);
        this.startGame();
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

