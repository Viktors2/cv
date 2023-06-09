class Referee {
  constructor(size = 10) {
    this.size = size;

    const STAY = 0,
      LEFT = -1,
      RIGHT = 1,
      UP = -1,
      DOWN = 1;

    this.all_lines = [
      /* Horizontal line */
      [
        [STAY, RIGHT],
        [STAY, LEFT],
      ],
      /* Vertical line */
      [[DOWN, STAY]],
      /* dioganal_up_right line */
      [
        [UP, RIGHT],
        [DOWN, LEFT],
      ],
      /* dioganal_down_right line */
      [
        [DOWN, RIGHT],
        [UP, LEFT],
      ],
    ];
  }

  checkWinner(moves, index) {
    this.moves = moves;
    const symbol = moves[index],
      x = index % this.size,
      y = (index - x) / this.size;

    for (const line of this.all_lines) {
      if (this.checkLine(symbol, y, x, line)) {
        return true;
      }
    }

    return false;
  }

  checkLine(symbol, y, x, line) {
    let match_count = 0;
    for (const vector of line) {
      match_count += this.countMatchesOneDirection(symbol, y, x, vector);
    }

    if (match_count >= 3) {
      return true;
    }
    return false;
  }

  countMatchesOneDirection(symbol, y, x, vector) {
    let match_count = 0;
    for (let step = 1; step <= 3; step++) {
      y += vector[0];
      x += vector[1];
      if (symbol != this.getSymbol(y, x)) {
        break;
      }

      match_count++;
    }

    return match_count;
  }

  getSymbol(y, x) {
    if (y < 0 || y > this.size - 1 || x < 0 || x > this.size - 1) {
      return null;
    }

    const index = y * this.size + x;
    if (!moves.hasOwnProperty(index)) {
      return null;
    }

    return this.moves[index];
  }
}
