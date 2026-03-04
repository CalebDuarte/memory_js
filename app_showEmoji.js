let board = [
  ["🍎", "🐶", "🍕", "🐱"],
  ["🐶", "🍎", "🐱", "🍕"],
  ["⭐", "⚽", "🎮", "🎵"],
  ["⚽", "⭐", "🎵", "🎮"]
];

let r1 = null;   // first click row
let c1 = null;   // first click col
let matches = 0;
let attempts = 0;

function playGame() {
  let gameBoard = document.getElementById("gameBoard");
  let html = "<table>";


  for (let r = 0; r < board.length; r++) {
    html += "<tr>";
    for (let c = 0; c < board[r].length; c++) {
      html += `<td id="cell-${r}-${c}" onclick="cellClicked(${r}, ${c})">?</td>`;
    }
    html += "</tr>";
  }

  html += "</table>";
  gameBoard.innerHTML = html;

  // reset stuff
  r1 = null;
  c1 = null;
  matches = 0;
  attempts = 0;

  document.getElementById("message").textContent = "";
  displayStats();
}

function cellClicked(r, c) {
  let cell = document.getElementById(`cell-${r}-${c}`);

  cell.textContent = board[r][c];
  if (r1 === null) {
    r1 = r;
    c1 = c;
    return;
  }

  attempts++;

  let firstEmoji = board[r1][c1];
  let secondEmoji = board[r][c];

  if (firstEmoji === secondEmoji) {
    matches++;
    document.getElementById("message").textContent = "✅ Match!";
    r1 = null;
    c1 = null;
    displayStats();
  } else {
    document.getElementById("message").textContent = "❌ Try again!";

    let firstCell = document.getElementById(`cell-${r1}-${c1}`);

    // delay so the player can SEE the second emoji
    setTimeout(function () {
      firstCell.textContent = "?";
      cell.textContent = "?";
    }, 800);

    r1 = null;
    c1 = null;
    displayStats();
  }

  // win check
  let pairs = (board.length * board[0].length) / 2;
  if (matches === pairs) {
    document.getElementById("message").textContent =
      "🎉 You win! Attempts: " + attempts;
  }
}

function displayStats() {
  document.getElementById("stats").textContent =
    "Matches: " + matches + " | Attempts: " + attempts;

}
