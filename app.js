let board = [
  ["🍎", "🐶", "🍕", "🐱"],
  ["🐶", "🍎", "🐱", "🍕"],
  ["⭐", "⚽", "🎮", "🎵"],
  ["⚽", "⭐", "🎵", "🎮"]
];

//game vars
let r1 = null; //first row click
let c1 = null;  //first col
let matches = 0;
let attempts = 0;

function playGame() {
  let gameBoard = document.getElementById("gameBoard");
  let html = "<table>";

//simple build board
  for (let r = 0; r < board.length; r++) {
    html += "<tr>";
    for (let c = 0; c < board[r].length; c++) {
      html += `<td id="cell-${r}-${c}" onclick="cellClicked(${r}, ${c})">?</td>`;
    }
    html += "</tr>";
  }

  html += "</table>";
  gameBoard.innerHTML = html;

//reset stuff
  r1 = null;
  c1 = null;
  matches = 0;
  attempts = 0;

  document.getElementById("message").textContent = "";
  displayStats();
}

function cellClicked(r, c) {
  let cell = document.getElementById(`cell-${r}-${c}`);

//show emoji
  cell.textContent = board[r][c];

//hold first click
  if (r1 === null) {
    r1 = r;
    c1 = c;
    return;
  }

//second click 
  attempts++;

  let firstEmoji = board[r1][c1];
  let secondEmoji = board[r][c];

  if (firstEmoji === secondEmoji) {
    matches++;
    document.getElementById("message").textContent = "✅ Match!";
  } else {
    // no setTimeout = flips back right away
    document.getElementById(`cell-${r1}-${c1}`).textContent = "?";
    cell.textContent = "?";
    document.getElementById("message").textContent = "❌ Try again!";
  }

//reset first click
  r1 = null;
  c1 = null;

  displayStats();

//win con
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