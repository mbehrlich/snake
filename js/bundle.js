/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const View = __webpack_require__(3);
	const Board = __webpack_require__(2);

	$(function() {
	  let $el = $('.snake');
	  let view = new View($el);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(1);

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);

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


/***/ }
/******/ ]);