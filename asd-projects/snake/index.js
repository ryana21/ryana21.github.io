/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
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
  positionX: randomGrid(2400), 
  positionY: randomGrid(1200), 
  speedX: 0,
  speedY: 0,
  };

  var apple = {
    id: "#apple",
    positionX: randomGrid(2400),
    positionY: randomGrid(1200),
  };

  var snakeArray = [
    head,
    
  ]


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDownW);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keydown', handleKeyDownA);
  $(document).on('keydown', handleKeyDownS);
  $(document).on('keydown', handleKeyDownD);
  $(document).on('keydown', handleKeyDownE);

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
    for (i = 0; i <= snakeArray.length ; i++){
      redrawGameItem(snakeArray[i])
      repositionGameItem(snakeArray[i])
      if (head.positionX === apple.positionX && head.positionY === apple.positionY) {
        spawnApple(apple); 
        addPiece();
        scoreKeep(); 
      }
    }
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDownE(event) {
    if (event.which === KEY.enter){
      addPiece();
    }
  }
  
  function handleKeyDownW(event) {
    if (event.which === KEY.W){
      head.speedY = -40;
      head.speedX = 0;
    }
  }

  function handleKeyDownA(event) {
    if (event.which === KEY.A){
      head.speedX = -40;
      head.speedY = 0;
    }
  }

  function handleKeyDownS(event) {
    if (event.which === KEY.S){
      head.speedY = +40;
      head.speedX = 0;
    }
  }

  function handleKeyDownD(event) {
    if (event.which === KEY.D){
      head.speedX = +40;
      head.speedY = 0;
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
  
  function redrawGameItem(piece) {
    $(piece.id).css("left", piece.positionX); 
    $(piece.id).css("top", piece.positionY); 
  }

  function spawnApple(piece) {
    piece.positionX = randomGrid(2400);
    piece.positionY = randomGrid(1200);
    $(piece.id).css("left", piece.positionX); 
    $(piece.id).css("top", piece.positionY);
  }

  //new pieceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
  function elementObject(id) {
    var newPiece = {};
    
    newPiece.id = id;
    newPiece.backgroundColor = parseFloat($(id).css('background-color'));
    newPiece.borderRadius = parseFloat($(id).css('border-radius'));
    newPiece.positionX = parseFloat($(id).css('left'))
    newPiece.positionY = parseFloat($(id).css('top'));
    newPiece.width = parseFloat($(id).css('width')); 
    newPiece.height = parseFloat($(id).css('height'));   
    newPiece.speedX = 0;
    newPiece.speedY = 0;
  
    return newPiece;
  }


  function createPiece(id){
    $("<div>").attr("id", id)
              .addClass("snakePart")
              .appendTo("#board");
  }
  
  function addPiece(){
    var nextId = "body" + snakeArray.length;
    createPiece(nextId);
    var newObject = elementObject("#" + nextId);
    snakeArray.push(newObject); 
  }


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
 
  //snake pieces





  //scoreeeeeeeeeeeeeeeeeee
  var score = 0;
  var scoreBox = jQuery('#score');
  function scoreKeep(){
    score = score + 1;
    scoreBox.text("score\n" + score);
  }
  scoreBox.text("score\n")
  jquery.score.text(score);

  //grid spot maker
  function randomGrid(maxPixel){
    return Math.floor(Math.random() * (maxPixel/GRID_SIZE)) * GRID_SIZE;
  }
}
