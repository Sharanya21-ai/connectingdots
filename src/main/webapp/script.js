let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

function play(cell, index) {

    if(board[index] !== "" || gameOver) {
        return;
    }

    board[index] = currentPlayer;
    cell.innerText = currentPlayer;

    if(checkWinner()) {
        document.getElementById("status").innerText = currentPlayer + " Wins!";
        gameOver = true;
        return;
    }

    if(board.every(c => c !== "")) {
        document.getElementById("status").innerText = "Draw Match";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    document.getElementById("status").innerText =
        "Player " + currentPlayer + " Turn";
}

function checkWinner() {

    const wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    return wins.some(combination => {
        return combination.every(index =>
            board[index] === currentPlayer
        );
    });
}

function restartGame() {

    board = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    currentPlayer = "X";

    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
    });

    document.getElementById("status").innerText =
        "Player X Turn";
}
