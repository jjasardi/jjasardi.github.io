let state = Array(6).fill('').map(el => Array(7).fill(''))

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
    board = document.getElementsByClassName("board")[0];
    state.forEach((line) => {
        line.forEach(field => {
            if (field == '') {
                board.appendChild(
                    elt("div", { class: "field" })
                )
            } else if (field == 'r') {
                board.appendChild(
                    elt("div", { class: "field" },
                        elt("div", { class: "red piece" }))
                )
            } else if (field == 'b') {
                board.appendChild(
                    elt("div", { class: "field" },
                        elt("div", { class: "blue piece" }))
                )
            }
        })
    })


    // const fields = document.getElementsByClassName("field")
    // Array.from(fields).forEach((field) => {
    //     if (Math.random) {
    //         field.appendChild(elt("div", { class:}))
    //     }
    // })
}
