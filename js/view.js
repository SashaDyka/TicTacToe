export default class boardView{
    constructor(elements){
        this.boardElement = elements.boardElement;
        this.statusText = elements.statusText;

        this.chooseXBtn = elements.chooseXBtn;
        this.chooseOBtn = elements.chooseOBtn;

        this.undoBtn = elements.undoBtn;
        this.resetBtn = elements.resetBtn;
        this.reduceBtn = elements.reduceBtn;
        this.enlargeBtn = elements.enlargeBtn; 
              
    }

    drawBoard(cells){
        const size = cells.length; 
        this.boardElement.innerHTML = '';

        this.boardElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        this.boardElement.style.gridTemplateRow = `repeat(${size}, 1fr)`;

        cells.forEach((row, rowIndex) => {
            row.forEach((cellContent, colIndex) => {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                
                cell.dataset.row = rowIndex;
                cell.dataset.column = colIndex;
                cell.textContent = cellContent;
                
                this.boardElement.appendChild(cell);
            });
        });
    }






    handleClick(row, column) {
        if (!this.gameActive || this.board[row][column]) {
            return;
        }

        const currentSymbol = this.currentPlayer;
        this.history.push({ row, column, symbol: currentSymbol });

        this.board[row][column] = currentSymbol;
        const cell = document.querySelector(`[data-row="${row}"][data-column="${column}"]`);
        cell.textContent = currentSymbol;

        const winner = this.checkWinner();
        if (winner) {
            statusText.textContent = `Player ${winner} won!`;
            this.gameActive = false;
            return;
        }

        if (this.checkTie()) {
            statusText.textContent = `Tie!`;
            this.gameActive = false;
            return;
        }

        this.currentPlayer = currentSymbol === crossSymbol ? zeroSymbol : crossSymbol;
        statusText.textContent = `Player ${this.currentPlayer} turn`;
    }

    checkBoardSize(){
        if(this.currentSize <= 7){
            this.boardElement.classList.add('fixed-size');
            this.boardElement.classList.remove('fullscreen');            
        }else {
            this.boardElement.classList.add('fullscreen');
            this.boardElement.classList.remove('fixed-size');
        }
    }

    clearBoard(){
        this.boardElement.innerHTML = '';
    }

    clearCell(row, col) {
        const cell = this.boardElement.querySelector(`[data-row="${row}"][data-column="${col}"]`);
        if (cell) {
            cell.textContent = '';
        }
    }

    enlargeBoardSize() {
        if (this.currentSizeIndex < this.ollSizes.length - 1) {
            this.currentSizeIndex++;
            this.drawBoard();
        }
    }

    reduceBoardSize(){
        if(this.currentSizeIndex > 0) {
        this.currentSizeIndex--;
        this.drawBoard();
        }
    }


}
