import { checkWinner } from './connect4-winner.js'
import { render } from './lib/suiweb.js'

let state = { board: Array(6).fill("").map(() => Array(7).fill("")), turn: "red", gameOver: false }

document.getElementById("newGameBtn").addEventListener("click", () => startNewGame())
document.getElementById("saveLocallyBtn").addEventListener("click", () => saveStateLocally())
document.getElementById("loadLocallyBtn").addEventListener("click", () => loadStateLocally())

const App = () => [Board, { board: state.board }]

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

function showBoard() {
    const app = document.querySelector(".app")
    render([App], app)
    if (!state.gameOver) {
        addClickFunctionToFields()
    }
    return app // TODO why?
}

function addClickFunctionToFields() {
    document.querySelectorAll("div.field").forEach(field => {
        field.addEventListener("click", () => placePiece(field))
    })
}

function placePiece(field) {
    const freePosition = getFreePosition(field.column)
    if (freePosition != -1) {
        const stateTurnShort = state.turn === "red" ? "r" : "b"
        state.board[freePosition][field.column] = stateTurnShort
        if (checkWinner(stateTurnShort, state.board)) {
            handleWin()
        }
        showBoard()
        changeTurn()
    }
}

function handleWin() {
    state.gameOver = true
    showWinner()
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
        state.turn = (state.turn === "red") ? "blue" : "red"
        showTurn()
    }
}

function showTurn() {
    const turnElement = document.getElementById("turn")
    turnElement.className = state.turn
    turnElement.textContent = state.turn
}

function startNewGame() {
    state = { board: Array(6).fill('').map(() => Array(7).fill('')), turn: "red", gameOver: false }
    showBoard()
    showTurn()
    showWinner()
}

function saveStateLocally() {
    localStorage.setItem("state", JSON.stringify(state))
    showBoard()
}


function loadStateLocally() {
    state = JSON.parse(localStorage.getItem("state"))
    showBoard()
}

export { showTurn, showBoard }