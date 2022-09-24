/*
const cell2 = document.createElement("div")
cell2.id = "cell2"
const cell3 = document.createElement("div")
cell3.id = "cell3"

const container = document.getElementById("container")
container.append(cell2)
container.append(cell3)
*/

const container = document.getElementById("container")
const scoreEl = document.getElementById("score")
let player = "X"
let cells = []
const winCond = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 6],
    [0, 4, 8],
    [2, 4, 6]
]

let score = JSON.parse(localStorage.getItem("score"));
console.log(score)

function posX(x) {
    return Math.floor(x / 3)
}
function posY(x) {
    return x % 3
}

function isPlaced(cell) {

    if (cell.innerHTML !== "")
        return true
    return false

}
function updateScore() {
    let pos = score.search(":");
    let scoreX = score.substring(0, pos)
    let scoreO = score.substring(pos + 1, score.length)
    if (player === "X") {
        scoreX = parseInt(scoreX)
        scoreX++
    }
    else {
        scoreO = parseInt(scoreX)
        scoreO++
    }
    console.log(scoreX)
    console.log(scoreO)
    score = scoreX + ":" + scoreO
    scoreEl.innerText = score
    localStorage.setItem("score", JSON.stringify(score));
}

function checkWin() {
    for (let i = 0; i < winCond.length; i++) {
        if (isPlaced(cells[winCond[i][0]]) && cells[winCond[i][0]].innerHTML === cells[winCond[i][1]].innerHTML && cells[winCond[i][0]].innerHTML === cells[winCond[i][2]].innerHTML) {
            console.log("win")
            updateScore()
            alert(player + " won");
            resetBoard()
            return true
        }
    }
    return false
}

function userAction(cell, index) {
    if (!isPlaced(cell)) {

        let s = "<p>" + player + "<\p>"
        cell.innerHTML = s
        if (!checkWin()) {
            if (player === "X")
                player = "O"
            else player = "X"

        }
    }
}

function createBoard() {

    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div")
        cell.id = "cell" + (i + 1)
        container.append(cell)

        let x = posX(i)
        let y = posY(i)

        cell.classList.add("cell");
        cell.style.top = x * 180 + "px"
        cell.style.left = y * 180 + "px"
        cells.push(cell)

        cell.addEventListener('click', () => userAction(cell, i))

    }
    if (score === null) {
        score = "0:0"
    }
    scoreEl.innerText = score
    localStorage.setItem("score", JSON.stringify(score));

}

function resetBoard() {
    player = "X"
    for (let i = 0; i < 9; i++) {
        cells[i].innerHTML = ""
    }
}

createBoard()