/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    ENTER: 13,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    //-----------------------------
    W: 87,
    A: 65,
    S: 83,
    D: 68
    };
  // Game Item Objects
  var positionX = 10; 
  var positionY = 10; 
  var speedX = 0;
  var speedY = 0;
  //------------------
  var positionA = 380; 
  var positionB = 380; 
  var speedA = 0;
  var speedB = 0;
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp); 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem()
    redrawGameItem()
    repositionGameItem2()
    redrawGameItem2()
    if (positionX === positionA && positionY === positionB) {
      alert("youre it!");
      
    }
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.ENTER){
      console.log("enter pressed");
    }
    else if (event.which === KEY.LEFT){
        speedX = -5;
    }
    else if (event.which === KEY.UP){
      speedY = -5;
    }
    else if (event.which === KEY.RIGHT){
      speedX = +5;
    }
    else if (event.which === KEY.DOWN){
      speedY = +5;
    }
    else if (event.which === KEY.A){
        speedA = -5;
    }
    else if (event.which === KEY.W){
      speedB = -5;
    }
    else if (event.which === KEY.D){
      speedA = +5;
    }
    else if (event.which === KEY.S){
      speedB = +5;
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.ENTER){
      console.log("enter pressed");
    }
    else if (event.which === KEY.LEFT){
        speedX = 0;
    }
    else if (event.which === KEY.UP){
      speedY = 0;
    }
    else if (event.which === KEY.RIGHT){
      speedX = 0;
    }
    else if (event.which === KEY.DOWN){
      speedY = 0;
    }
    else if (event.which === KEY.A){
      speedA = 0;
    }
    else if (event.which === KEY.W){
     speedB = 0;
    }
     else if (event.which === KEY.D){
     speedA = 0;
    }
     else if (event.which === KEY.S){
     speedB = 0;
     }
  }



  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  function repositionGameItem() {
    positionX += speedX;
    positionY += speedY;
  }

  function redrawGameItem() {
    $("#walker").css("left", positionX); 
    $("#walker").css("top", positionY); 
  }

//------------------------------------------------------------
function repositionGameItem2() {
  positionA += speedA;
  positionB += speedB;
}

function redrawGameItem2() {
  $("#walker2").css("left", positionA); 
  $("#walker2").css("top", positionB); 
}
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
