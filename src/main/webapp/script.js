let currentPlayer = "X";
let isGameActive = true; // Tracks whether the game is running or over

// The 8 possible winning line positions across a 3x3 grid
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function play(cell) {
    // If cell is already chosen, or the game is finished, reject any clicks
    if (cell.innerHTML !== "" || !isGameActive) {
        return;
    }

    // Assign the cell to the current player
    cell.innerHTML = currentPlayer;

    // Check if the current move results in a win
    if (checkWin()) {
        document.getElementById("status").innerHTML = "Player " + currentPlayer + " Wins! 🎉";
        isGameActive = false; // Stops the game completely
        return;
    }

    // Check if the game tied in a draw
    if (checkDraw()) {
        document.getElementById("status").innerHTML = "It's a Draw! 🤝";
        isGameActive = false;
        return;
    }

    // Toggle turn back and forth between X and O
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    document.getElementById("status").innerHTML = "Player " + currentPlayer + " Turn";
}

function checkWin() {
    let cells = document.getElementsByClassName("cell");
    
    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        let a = cells[combination[0]].innerHTML;
        let b = cells[combination[1]].innerHTML;
        let c = cells[combination[2]].innerHTML;

        // Skip calculations if any square in a pattern group is empty
        if (a === "" || b === "" || c === "") {
            continue;
        }
        
        // If all matching boxes hold the exact same letter, declare a winner
        if (a === b && b === c) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML === "") {
            return false; // Found an unfilled cell, game goes on
        }
    }
    return true; // All boxes filled and no winner found
}

function restartGame() {
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
    }
    currentPlayer = "X";
    isGameActive = true; // Turn the board back on
    document.getElementById("status").innerHTML = "Player X Turn";
}
