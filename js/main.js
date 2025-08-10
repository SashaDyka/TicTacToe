import { Board } from "./board";

const gameBoard = document.getElementById('gameBoard');
const statusText = document.getElementById('status');
const chooseX = document.getElementById('chooseX');
const chooseO = document.getElementById('chooseO');

const undoBtn = document.getElementById('undoBtn');
const resetBtn = document.getElementById('resetBtn');
const reduceBtn = document.getElementById('reduceBtn');
const enlargeBtn = document.getElementById('enlargeBtn');


const game = new Board(gameBoard);
game.renderBoard();