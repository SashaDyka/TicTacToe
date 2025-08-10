class GameController{
    constructor(boardSize, elements){
        this.board = new Board(boardSize);
        this.playerX = new Player('Игрок X', 'X');
        this.playerO = new Player('Игрок O', 'O');
        this.currentPlayer = this.playerX;
        this.view = new BoardView(elements);

        
        /*this.allBoardSizes = [3, 5, 7, 20, 50, 100];
        this.currentSizeIndex = 0;
        this.maxSize = 100;*/

    }

     
    startGame(){

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

