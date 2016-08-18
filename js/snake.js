class Snake {

  constructor() {
    this.direction = "N";
    this.segments = [[10,10]];
    this.maxLength = 1;
  }

  equals(pos1, pos2) {
    if (pos1[0] === pos2[0] && pos1[1] === pos2[1]) {
      return true;
    } else {
      return false;
    }
  }

  isOpposite(dir) {
    let opposites = {
      "N": "S",
      "E": "W",
      "W": "E",
      "S": "N"
    };
    if (this.direction === opposites[dir]) {
      return true;
    } else {
      return false;
    }
  }

  plus(pos1, pos2) {
    return [pos1[0] + pos2[0], pos1[1] + pos2[1]];
  }

  move() {
    let movements = {
      "N": [-1, 0],
      "E": [0, 1],
      "W": [0, -1],
      "S": [1, 0]
    };
    let newSegment = this.plus(this.segments[0], movements[this.direction]);
    this.segments.unshift(newSegment);
    if (this.segments.length > this.maxLength) {
      this.segments.pop();
    }
  }

  eat() {
    this.maxLength += 1;
  }

  turn(newDir) {
    if (!this.isOpposite(newDir)) {
      this.direction = newDir;
    }
  }
}

module.exports = Snake;
