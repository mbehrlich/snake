const Board = require("./board.js");

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board();
    this.listener();
    // this.endListener();
    this.timerId = undefined;
  }

  // endListener() {
  //   let view = this;
  //   window.setInterval(function() {
  //     if (view.board.isLost()) {
  //       clearInterval(view.timerId);
  //     }
  //   }, 500);
  // }

  listener() {
    let view = this;

    let timerId = setInterval( function() {
      view.render();
      view.board.snake.move();
      if (view.board.isLost()) {clearInterval(timerId);}
    }, 400);

    $(document).on("keypress", function(e) {
      console.log(e.which);
      let direction = {
        97: "W",
        119: "N",
        100: "E",
        115: "S"
      };
      view.board.snake.turn(direction[e.which]);
    });

    // $(document).
  }

  render() {
    $(".snake").children().remove();
    this.board.snake.segments.forEach( (el, index) => {
      let segment = $(`<div id="s${index}" class='segment'></div>`);
      $(".snake").append(segment);
      $(`#s${index}`).css("top", `${(el[0] * 10)}px`);
      $(`#s${index}`).css("left", `${(el[1] * 10)}px`);
    });

    let apple = this.board.apple;
    let appleSegment = $(`<div class='apple'></div>`);
    $(".snake").append(appleSegment);
    $(`.apple`).css("top", `${(apple[0] * 10)}px`);
    $(`.apple`).css("left", `${(apple[1] * 10)}px`);
    this.board.collision();
  }

}

module.exports = View;





// a = 97
// w = 119
// d = 100
// s = 115
