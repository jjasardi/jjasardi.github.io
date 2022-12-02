let state = { board: Array(6).fill("").map(() => Array(7).fill("")), turn: "red" }

function elt(type, attrs, ...children) {
    let node = document.createElement(type)
    Object.keys(attrs).forEach(key => {
        node.setAttribute(key, attrs[key])
    })
    for (let child of children) {
        if (typeof child != "string") node.appendChild(child)
        else node.appendChild(document.createTextNode(child))
    }
    return node
}

function showBoard() {
    const newBoard = elt("div", { class: "board" })
    state.board.forEach((line, indexLine) => {
        line.forEach((field, indexColumn) => {
            const fieldNode = elt("div", { class: "field", "data-line": indexLine, "data-column": indexColumn, onclick: "placePiece(this)" })
            if (field === 'r') {
                fieldNode.appendChild(elt("div", { class: "red piece" }))
            } else if (field === 'b') {
                fieldNode.appendChild(elt("div", { class: "blue piece" }))
            }
            newBoard.appendChild(fieldNode)
        })
    })
    const oldBoard = document.querySelector("div.board")
    document.querySelector("body").replaceChild(newBoard, oldBoard)
}

function placePiece(field) {
    const freePosition = getFreePosition(field.dataset.column)
    if (freePosition != -1) {
        state.board[freePosition][field.dataset.column] = state.turn === "red" ? "r" : "b"
        changeTurn()
        showBoard()
    }
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
    state.turn = (state.turn === "red") ? "blue" : "red"
    showTurn()
}

function showTurn() {
    turnElement = document.getElementById("turn")
    turnElement.className = state.turn
    turnElement.textContent = state.turn
}

function startNewGame() {
    state = { board: Array(6).fill('').map(() => Array(7).fill('')), turn: "red" }
    showBoard()
    showTurn()
}