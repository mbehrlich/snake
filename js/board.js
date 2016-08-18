const Snake = require("./snake.js");

class Board {
  constructor() {
    this.snake = new Snake();
    this.apple = this.randomApple();
    this.lost = false;
  }

  randomApple() {
    let pos = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
    if (this.myIndexOf(this.snake.segments, pos) === -1 ) {
      return pos;
    } else {
      return this.randomApple();
    }

  }

  collision() {
    let head = this.snake.segments[0];
    if (this.snake.equals(head, this.apple)) {
      this.snake.eat();
      this.apple = this.randomApple();
    }
    else if (head[0] < 0 || head[0] > 19 || head[1] < 0 || head[1] > 19) {
      alert("You lose!!!");
      this.lost = true;
    }
    else if (this.myIndexOf(this.snake.segments.slice(1), head) !== -1) {
      alert("You lose!!!");
      this.lost = true;
    }
  }

  isLost(callback) {
    return this.lost;
  }

  myIndexOf(posArray, pos2) {
    for (let i = 0; i < posArray.length; i++) {
      if (this.snake.equals(posArray[i], pos2)) {
        return i;
      }
    }
    return -1;
  }

}

module.exports = Board;
