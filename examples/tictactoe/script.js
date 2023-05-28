// const cells = document.querySelectorAll('.cell');

// for (const cell of cells) {
//   cell.addEventListener('click', clickHandle);
// }
const popup = document.querySelector(".popup");
const message_el = popup.querySelector(".message");
const board = document.querySelector(".game_board");
const cells = board.children;
board.addEventListener("click", boardClickHandle);

function boardClickHandle(event) {
  if (!event.target.classList.contains("cell")) {
    return;
  }

  clickHandle.bind(event.target)();
}

let symbol = localStorage.getItem("last_symbol") || "x"; // to get last symbol from localStorage or X
const api = new ApiManager("tic-tac-toe");

let referee = new Referee();
let storage = new Storage("tictactoe");
let entries = storage.getEntries();
let moves = {};
for (const id in entries) {
  const entry = entries[id];
  cells[id].textContent = entry.symbol;
  moves[id] = entry.symbol;
}

addEventListener("load", showWinners);
const winners = document.querySelector(".winner_list");
function showWinners() {
  api.getRequest(function (entries) {
    winners.innerHTML = "";
    for (const id in entries) {
      const entry = entries[id];
      const li = document.createElement("li");
      if (entry.winner === undefined) {
        li.innerHTML = "<strong>Draw</strong>";
      } else {
        li.innerHTML = "<strong>" + entry.winner + "</strong> won the game!";
      }
      winners.prepend(li);
    }
  });
}

function clickHandle() {
  if (this.textContent !== "") {
    return;
  }
  this.textContent = symbol;
  const id = this.dataset.id;
  moves[id] = symbol;
  storage.add(id, { symbol: symbol });
  if (referee.checkWinner(moves, symbol)) {
    showMessage("Player " + symbol + " has won the game!");
    let form_data = new FormData();
    form_data.append("winner", symbol);
    api.create(form_data, () => {
      console.log("API create request successful!");
      showWinners();
    });
  } else if (referee.checkDraw(cells) === true) {
    showMessage("Draw!");
    let form_data = new FormData();
    form_data.append("result", "Draw");
    api.create(form_data, () => {
      console.log("API create request Draw!");
      showWinners();
    });
  }

  symbol = symbol === "x" ? "o" : "x";
  localStorage.setItem("last_symbol", symbol); // will save last symbol in localStorage
  // console.log(moves);
}

document.querySelector(".reset").addEventListener("click", resetHandle);
document.querySelector(".reset_game").addEventListener("click", resetHandle);

popup.addEventListener("click", function (event) {
  if (event.target.classList.contains("popup")) {
    hideMessage();
  }
});

function resetHandle() {
  for (const cell of cells) {
    cell.textContent = "";
  }
  symbol = "x";
  moves = {};
  hideMessage();
  localStorage.removeItem("last_symbol");
  // localStorage.clear();
  storage.clearFunct();
}

function showMessage(message) {
  popup.classList.add("open");
  message_el.textContent = message;
}

function hideMessage() {
  popup.classList.remove("open");
}
