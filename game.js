import { checkWinner } from './connect4-winner.js'
import { render } from './lib/suiweb.js'
import { setInList, setInObj } from './util.js'

let state = { board: Array(6).fill("").map(() => Array(7).fill("")), turn: "red", gameOver: false }
let stateSeq = []

const App = () =>
    ["div",
        ["h1", { id: "turn" }],
        ["h1", { id: "winner" }],
        ["button", { id: "newGameBtn", onclick: startNewGame }, "new game"],
        ["button", { id: "saveLocallyBtn", onclick: saveStateLocally }, "save locally"],
        ["button", { id: "loadLocallyBtn", onclick: loadStateLocally }, "load locally"],
        ["button", { id: "undoBtn", onclick: undo }, "undo last move"],
        [Board, { board: state.board }]]

const Board = ({ board }) => {
    let flatBoard = [].concat(...board)
    let fields = flatBoard.map((type, index) => [Field, { type, index }])
    return (
        ["div", { className: "board" }, ...fields]
    )
}

const Field = ({ type, index }) => {
    const lineIndex = Math.floor(index / 7)
    const columnIndex = index % 7
    let fieldElement = ["div", { className: "field", "line": lineIndex, "column": columnIndex }]
    if (type === "r") {
        fieldElement.push(["div", { className: "red piece" }])
    } else if (type === "b") {
        fieldElement.push(["div", { className: "blue piece" }])
    }
    return fieldElement
}

function initializeGame() {
    showState()
}

function showState() {
    showBoard()
    showTurn()
    showWinner()
}

function showBoard() {
    const app = document.querySelector(".app")
    render([App], app)
    if (!state.gameOver) {
        addClickFunctionToFields()
    }
}

function addClickFunctionToFields() {
    document.querySelectorAll("div.field").forEach(field => {
        field.addEventListener("click", () => placePiece(field))
    })
}

function placePiece(field) {
    const freePosition = getFreePosition(field.column)
    if (freePosition != -1) {
        stateSeq.push(state)
        const stateTurnShort = state.turn === "red" ? "r" : "b"
        state = setInObj(state, "board", setInList(state.board, freePosition, setInList(state.board[freePosition], field.column, stateTurnShort)))
        if (checkWinner(stateTurnShort, state.board)) {
            handleWin()
        }
        showState()
        changeTurn()
    }
}

function handleWin() {
    state = setInObj(state, "gameOver", true)
}

function showWinner() {
    const winnerElement = document.getElementById("winner")
    winnerElement.className = state.gameOver === true ? state.turn : ""
    winnerElement.textContent = state.gameOver === true ? `Congratulation! ${state.turn} has won. Please support me donating with 8xmille to the Catholic Church :_(` : ""
}

function getFreePosition(column) {
    for (let lineIndex = state.board.length - 1; lineIndex >= 0; lineIndex--) {
        if (state.board[lineIndex][column] === '') {
            return lineIndex
        }
    }
    return -1
}

function changeTurn() {
    if (!state.gameOver) {
        state = setInObj(state, "turn", (state.turn === "red") ? "blue" : "red")
        showTurn()
    }
}

function showTurn() {
    const turnElement = document.getElementById("turn")
    turnElement.className = state.turn
    turnElement.textContent = state.turn
}

function startNewGame() {
    window.location.reload(true)
}

function saveStateLocally() {
    localStorage.setItem("state", JSON.stringify(state))
    localStorage.setItem("stateSeq", JSON.stringify(stateSeq))
    showState()
}


function loadStateLocally() {
    state = JSON.parse(localStorage.getItem("state"))
    stateSeq = JSON.parse(localStorage.getItem("stateSeq"))
    showState()
}

function undo() {
    if (stateSeq.length > 0) {
        state = stateSeq.pop()
        showState()
    }
}

export { initializeGame }