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
        if (!this.gameActive) return;

        if (this.board.isCellEmpty(row, col)) {
            const symbol = this.currentPlayer.getSymbol();
            this.board.addSymbol(row, col, symbol);
            this.history.push({ row, col, symbol });

            this.view.updateCell(row, col, symbol);

            const winnerSymbol = this.board.checkWinner(3);    // if requiredToWin = 3
            if (winnerSymbol) {
                this.gameActive = false;
                this.getPlayerBySymbol(winnerSymbol).addWin();
                this.view.updateStatus(`Player ${winnerSymbol} won!`);  
                return;
            }

            if (this.board.isBoardFull()) {
                this.gameActive = false;
                this.view.updateStatus('Tie!');
                return;
            }

            this.switchPlayer();
            this.view.updateStatus(`Player ${this.currentPlayer.getSymbol()} walk`);
        }
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === this.playerX ? this.playerO : this.playerX;
    }


    choosePlayer(symbol) {
        if (symbol === 'X') {
            this.currentPlayer = this.playerX;
        } else if (symbol === 'O') {
            this.currentPlayer = this.playerO;
        }
        this.startGame();
    }


    undoLastMove() {
        if (this.history.length === 0) return;

        if (!this.gameActive) {
            this.gameActive = true;
        }

        const lastMove = this.history.pop();
        this.board.cells[lastMove.row][lastMove.col] = null;

        this.view.updateCell(lastMove.row, lastMove.col, '');

        this.switchPlayer();
        this.view.updateStatus(`Player ${this.currentPlayer.getSymbol()} walk`);
    }



    resetGame() {
        this.currentPlayer = null; 
        this.gameActive = false;
        this.history = [];
        this.board.clearBoard();
        this.view.drawBoard(this.board.getCells());
        this.view.updateStatus('Game reset.'); 
    }

    getPlayerBySymbol(symbol) {
        if (symbol === this.playerX.getSymbol()) {
            return this.playerX;
        } else {
            return this.playerO;
        }
    }


}

