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


    updateStatus(message) {
        this.statusText.textContent = message;
    }

    clearCell(row, col) {
        const cell = this.boardElement.querySelector(`[data-row="${row}"][data-column="${col}"]`);
        if (cell) {
            cell.textContent = '';
        }
    }

    updateCell(row, col, symbol) {
        const cell = this.boardElement.querySelector(`[data-row="${row}"][data-column="${col}"]`);
        if (cell) {
            cell.textContent = symbol;
        }
    }

    
    clearBoard(){
        this.boardElement.innerHTML = '';
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

   

    

    enlargeBoardSize(handler) {
        this.enlargeBtn.addEventListener('click', handler);
    }

    reduceBoardSize(handler){
        this.reduceBtn.addEventListener('click', handler);
    }


}
