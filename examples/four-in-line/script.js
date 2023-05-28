const board = document.querySelector(".game_board");
this.template = document.querySelector("#template_cell");
const cells = document.querySelectorAll(".cell");
const popup = document.querySelector('.popup');
const message_el = popup.querySelector('.message');


let index = 0;

for (let y = 0; y < 10; y++) {
  for (let x = 0; x < 10; x++) {
    const new_cell = template.content.firstElementChild.cloneNode(true);
    new_cell.dataset.x = x;
    new_cell.dataset.y = y;
    new_cell.dataset.index = index;
    board.append(new_cell);
    index++;
    // new_cell.textContent = index;
    new_cell.addEventListener("click", clickHandle);
  }
}

let count = 0;
let referee = new Referee();
let storage = new Storage("fourinline");
let entries = storage.getEntries();
let moves = {};

console.log(entries);

for (const index in entries) {
  const entry = entries[index];
  const symbol = entry.symbol;
  const cell = board.children[index];
  cell.textContent = symbol;
  moves[index] = symbol;
}


// where players can put their symbols (board.children)
// clickedHandle function
// must know the coordinates of the clicked cell like x,y and index
// example clickedCell = {x: 4, y: 9, index: 94}
//so it allowed to put symbols into:
//x: 4, y: 8, index: 84  [y - 1] [index - 10] to top
// x: 3, y: 9, index: 93 [x - 1] [y + 1] [index - 1] to left
// x: 5, y: 9, index: 95 [x + 1] [y + 1] [index + 1] to right
// but only if textContent !== ""

function clickHandle() {
  const index = Number(this.dataset.index);
  const x = this.dataset.x;
  const y = this.dataset.y;

  if (moves.hasOwnProperty(index)) {
    return;
  }
  if (index < 90 && !moves.hasOwnProperty(index + 10)) {
    return;
  }
  const symbol = ++count % 2 == 0 ? "o" : "x";
  moves[index] = symbol;
  this.textContent = symbol; 
   storage.add(index, { symbol: symbol });

  console.log(
    "symbol: " +
      symbol +
      ", " +
      "x: " +
      this.dataset.x +
      ", y: " +
      this.dataset.y +
      ", index: " +
      this.dataset.index
  );

  if (referee.checkWinner(moves, index)) {
    showMessage("Player " + symbol + ' has won the game!');
  }
}

document.querySelector(".reset").addEventListener("click", resetHandle);
document.querySelector(".reset_game").addEventListener("click", resetHandle);

popup.addEventListener('click', function (event) {
  if (event.target.classList.contains('popup')) {
    hideMessage();
  }
})

function showMessage(message) {
  popup.classList.add('open');
  message_el.textContent = message;
}

function hideMessage() {
  popup.classList.remove('open');
}


const reset = document.querySelector(".reset");
reset.addEventListener("click", resetHandle);

function resetHandle() {
  console.log("reset");
  const cells = document.querySelectorAll(".cell");
  for (const cell of cells) {
    cell.textContent = "";
  }
  count = "0";
  moves = {};
  storage.clearFunct();
  hideMessage();

}

