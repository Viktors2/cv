class Referee {
  win_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  checkWinner(moves, s) {
    for (const combination of this.win_combinations) {
      let coord1 = combination[0];
      let coord2 = combination[1];
      let coord3 = combination[2];

      if (moves[coord1] == s && moves[coord2] == s && moves[coord3] == s) {
        return true;
      }
    }

    return false;
  }

  checkDraw(cells) {
    for (const cell of cells) {
      if (cell.textContent === "") {
        return false;
      }
    }
    return true;
  }
}
