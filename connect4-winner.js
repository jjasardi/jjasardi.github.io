function connect4Winner(player, board) {
    return checkHoriziontally(player, board) || checkVertically(player, board) || checkAscendingDiagonally(player, board) || checkDescendingDiagonally(player, board)
}

function checkHoriziontally(player, board) {
    for (let lineIndex = 0; lineIndex < board.length; lineIndex++) {
        let sequence = 0
        for (let columnIndex = 0; columnIndex < board[lineIndex].length; columnIndex++) {
            if (board[lineIndex][columnIndex] === player) {
                sequence++
                if (sequence === 4) {
                    return true
                }
            } else {
                sequence = 0
            }
        }
    }
    return false
}

function checkVertically(player, board) {
    for (let columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
        let sequence = 0
        for (let lineIndex = 0; lineIndex < board.length; lineIndex++) {
            if (board[lineIndex][columnIndex] === player) {
                sequence++
                if (sequence === 4) {
                    return true
                }
            } else {
                sequence = 0
            }
        }
    }
    return false
}

function checkAscendingDiagonally(player, board) {
    for (let columnIndex = 3; columnIndex < board[0].length; columnIndex++) {
        for (let lineIndex = 0; lineIndex < board.length - 3; lineIndex++) {
            if (board[lineIndex][columnIndex] === player && board[lineIndex + 1][columnIndex - 1] === player && board[lineIndex + 2][columnIndex - 2] === player && board[lineIndex + 3][columnIndex - 3] === player) {
                return true
            }
        }
    }
    return false
}


function checkDescendingDiagonally(player, board) {
    for (let columnIndex = 3; columnIndex < board[0].length; columnIndex++) {
        for (let lineIndex = 3; lineIndex < board.length; lineIndex++) {
            if (board[lineIndex][columnIndex] === player && board[lineIndex - 1][columnIndex - 1] === player && board[lineIndex - 2][columnIndex - 2] === player && board[lineIndex - 3][columnIndex - 3] === player)
                return true
        }
    }
    return false
}

export { connect4Winner }