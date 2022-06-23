/* global $, sessionStorage */

$(document).ready(startGame); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function startGame() {
  var menuBox = jQuery("#menu");

  menuBox.text("THE GREAT REVENGE      ~click to begin~");

  $("#menu").show();
  $("#menu").on("click", hide);

  function hide(event) {
    if ($("#menu").is(":visible")) {
      $("#menu").hide();
      runProgram();
    }
  }

  function runProgram() {
    ////////////////////////////////////////////////////////////////////////////////
    //////////////////////////// SETUP /////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    // Constant Variables
    var FRAME_RATE = 10;
    var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
    var KEY = {
      W: 87,
      A: 65,
      S: 83,
      D: 68,
      enter: 13,
    };

    var GRID_SIZE = 40;
    // Game Item Objects

    var head = {
      id: "#snake",
      positionX: randomGrid(2360),
      positionY: randomGrid(1120),
      speedX: 0,
      speedY: 0,
    };

    var tongue = {
      id: "#tongue",
      positionX: head.positionX + 20,
      positionY: head.positionY + 10,
      speedX: 0,
      speedY: 0,
    };

    var pupil1 = {
      id: "#pupil1",
      positionX: head.positionX + 20,
      positionY: head.positionY + 10,
      speedX: 0,
      speedY: 0,
    };

    var pupil2 = {
      id: "#pupil2",
      positionX: head.positionX + 20,
      positionY: head.positionY + 10,
      speedX: 0,
      speedY: 0,
    };

    var eye1 = {
      id: "#eye1",
      positionX: head.positionX,
      positionY: head.positionY + 10,
      speedX: 0,
      speedY: 0,
      width: 15,
      height: 15,
    };

    var eye2 = {
      id: "#eye2",
      positionX: head.positionX,
      positionY: head.positionY,
      speedX: 0,
      speedY: 0,
      width: 15,
      height: 15,
    };

    var apple = {
      id: "#apple",
      positionX: randomGrid(2360),
      positionY: randomGrid(1120),
      width: 40,
      height: 40,
    };

    var snakeArray = [head];

    // one-time setup
    var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
    $(document).on("keydown", handleKeyDownW); // change 'eventType' to the type of event you want to handle
    $(document).on("keydown", handleKeyDownA);
    $(document).on("keydown", handleKeyDownS);
    $(document).on("keydown", handleKeyDownD);
    $(document).on("keydown", handleKeyDownE);

    spawnApple(apple);

    // $(document).on('keyup', handleKeyUp);
    ////////////////////////////////////////////////////////////////////////////////
    ///////////////////////// CORE LOGIC ///////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    /* 
    On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
    by calling this function and executing the code inside.
    */
    function newFrame() {
      if (
        head.positionX === apple.positionX &&
        head.positionY === apple.positionY
      ) {
        spawnApple(apple);
        addPiece();
        scoreKeep();
      }

      for (var i = snakeArray.length - 1; i > 0; i--) {
        repositionBodyItem(snakeArray[i], i);
        redrawGameItem(snakeArray[i]);
      }

      repositionGameItem(snakeArray[0]);
      redrawGameItem(snakeArray[0]);

      winGame();

      collision();

      outOfBounds();

      eyes();
    }

    /* 
    Called in response to events.
    */
    function handleKeyDownE(event) {
      if (event.which === KEY.enter) {
        addPiece();
        // $('.snakePart').css("background-color", `rgb(${randomRGB()}, ${randomRGB()}, ${randomRGB()})`);
      }
    }

    function handleKeyDownW(event) {
      if (event.which === KEY.W && head.speedY != 40) {
        head.speedY = -40;
        head.speedX = 0;

        $(head.id).css("transform", "rotate(0deg)");
        head.angle = 0;
      }
    }

    function handleKeyDownA(event) {
      if (event.which === KEY.A && head.speedX != 40) {
        head.speedX = -40;
        head.speedY = 0;
        $(head.id).css("transform", "rotate(270deg)");
        head.angle = 270;
      }
    }

    function handleKeyDownS(event) {
      if (event.which === KEY.S && head.speedY != -40) {
        head.speedY = +40;
        head.speedX = 0;
        $(head.id).css("transform", "rotate(180deg)");
        head.angle = 180;
      }
    }

    function handleKeyDownD(event) {
      if (event.which === KEY.D && head.speedX != -40) {
        head.speedX = +40;
        head.speedY = 0;
        $(head.id).css("transform", "rotate(90deg)");
        head.angle = 90;
      }
    }

    //KEYUPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP

    // function handleKeyUp(event) {
    //   if (event.which === KEY.A){
    //     head.speedX = 0;
    //   }
    //   else if (event.which === KEY.W){
    //    head.speedY = 0;
    //   }
    //    else if (event.which === KEY.D){
    //    head.speedX = 0;
    //   }
    //   else if (event.which === KEY.S){
    //   head.speedY = 0;
    //  }
    // }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

    function repositionGameItem(piece) {
      piece.positionX += piece.speedX;
      piece.positionY += piece.speedY;
    }

    function repositionBodyItem(piece, i) {
      piece.positionX = snakeArray[i - 1].positionX;
      piece.positionY = snakeArray[i - 1].positionY;
    }

    function redrawGameItem(piece) {
      $(piece.id).css("left", piece.positionX);
      $(piece.id).css("top", piece.positionY);
    }

    function spawnApple(apple) {
      apple.positionX = randomGrid(2360);
      apple.positionY = randomGrid(1120);

      for (var i = snakeArray.length - 1; i > 0; i--) {
        if (
          snakeArray.positionX === apple.positionX &&
          snakeArray.positionY === apple.positionY
        ) {
          spawnApple();
          break;
        }
      }

      $(apple.id).css("left", apple.positionX);
      $(apple.id).css("top", apple.positionY);
    }

    //new pieceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    function elementObject(id) {
      var newPiece = {};

      newPiece.id = id;
      newPiece.backgroundColor = parseFloat(
        $(id).css(
          "background-color",
          `rgb(${randomRGB()}, ${randomRGB()}, ${randomRGB()})`
        )
      );
      newPiece.borderRadius = parseFloat($(id).css("border-radius"));
      newPiece.positionX = parseFloat($(id).css("left"));
      newPiece.positionY = parseFloat($(id).css("top"));
      newPiece.width = parseFloat($(id).css("width"));
      newPiece.height = parseFloat($(id).css("height"));
      newPiece.speedX = 0;
      newPiece.speedY = 0;

      return newPiece;
    }

    function createPiece(id) {
      $("<div>")
        .attr("id", id)
        .addClass("snakePart")
        .appendTo("#board")
        .css("top", head.positionY)
        .css("left", head.positionX);
    }

    function addPiece() {
      var nextId = "body" + snakeArray.length;
      createPiece(nextId);
      var newObject = elementObject("#" + nextId);
      snakeArray.push(newObject);
    }

    function collision() {
      for (var i = 1; i <= snakeArray.length - 1; i++) {
        // var oops = snakeArray[i];
        if (
          head.positionX === snakeArray[i].positionX &&
          head.positionY === snakeArray[i].positionY
        ) {
          finish();
        }
      }
    }

    function outOfBounds() {
      if (
        head.positionX < 0 ||
        head.positionX > 2320 ||
        head.positionY < 0 ||
        head.positionY > 1120
      ) {
        finish();
      }
    }

    function winGame() {
      if (snakeArray.length === 1711) {
        alert("you win!!!");
      }
    }

    //scoreeeeeeeeeeeeeeeeeee
    var score = 0;
    var scoreBox = $("#score");
    function scoreKeep() {
      score = score + 1;
      scoreBox.text("score\n" + score);
    }
    scoreBox.text("score\n" + score);

    //grid spot maker
    function randomGrid(maxPixel) {
      return Math.floor(Math.random() * (maxPixel / GRID_SIZE)) * GRID_SIZE;
    }

    function finish() {
      $("#death").show();

      var deathBox = jQuery("#death");

      deathBox.html("YOU DIED<br>score<br> ~" + score + "~");

      endGame();
    }

    function randomRGB() {
      return Math.floor(Math.random() * 256);
    }

    function eyes() {
      var pupAngle1 = calculatePupilAngle(eye1);
      var pupAngle2 = calculatePupilAngle(eye2);

      $(scoreBox).text(pupAngle1 + " " + pupAngle2);
    }

    function calculatePupilAngle(eye) {
      var eyeCenterX = eye.positionX + eye.width / 2;
      var eyeCenterY = eye.positionY + eye.height / 2;
      var appleCenterX = apple.positionX + apple.width / 2;
      var appleCenterY = apple.positionY + apple.height / 2;

      var offsetX = eyeCenterX - appleCenterX;
      var offsetY = eyeCenterY - appleCenterY;

      var tempAngle = Math.atan2(offsetY, offsetX);

      return (tempAngle * 180) / Math.PI + head.angle;
    }

    function endGame() {
      // stop the interval timer
      clearInterval(interval);

      // turn off event handlers
      // $(document).off();
    }
  }
}
