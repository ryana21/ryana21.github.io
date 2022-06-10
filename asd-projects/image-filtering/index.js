// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
  $('#boogie-box').on("click", boogieAndRender)
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}


function boogieAndRender(){

  boogie();
 
  render($("#display"), image);
}
// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilterNoBackground(reddify);
  applyFilterNoBackground(decreaseBlue);
  applyFilterNoBackground(increaseGreenByBlue);

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction){
  for (var r = 0; r < image.length; r++) {
    for (var c = 0; c < image[r].length; c++){
      var rgbString = image[r][c];
        
      var rgbNumbers = rgbStringToArray(rgbString);
      
      filterFunction(rgbNumbers);


      rgbString = rgbArrayToString(rgbNumbers);
      
      image[r][c] = rgbString;
    }
  } 
}
// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){
  for (var r = 0; r < image.length; r++) {
    for (var c = 0; c < image[r].length; c++){
      
      var backgroundColors = image[0][0];

      if (image[r][c] == backgroundColors){
      }

      else{
      var rgbString = image[r][c];
      
      var rgbNumbers = rgbStringToArray(rgbString);
      
      filterFunction(rgbNumbers);

      rgbString = rgbArrayToString(rgbNumbers);
      
      image[r][c] = rgbString;
    }
  }
  } 
}

// TODO 5: Create the keepInBounds function
function keepInBounds(edge){
  // if (edge<0){
  //     return 0;
  // }
  // else if (edge>255){
  //   return 255;
  // }
  // else {
  //   return edge;
  // }

  
var edge1 = Math.max(0, Math.min(edge, 255));
return edge1;

}

// TODO 3: Create reddify function
function reddify(rose){
    rose[RED] = 200;
}

// TODO 6: Create more filter functions
function decreaseBlue(ice){
  
  var result = keepInBounds(ice[BLUE] - 50);
  ice[BLUE] = result;
}

function increaseGreenByBlue(swas){

  var result1 = keepInBounds(swas[BLUE] + swas[GREEN]);
  swas[GREEN] = result1;
}

// CHALLENGE code goes below here
function boogie(){
  var newImage = []
  
  for (var r = image.length-1; r >= 0; r -= 1) {
    var row = []
   
    for (var c = image[r].length-1; c >= 0; c -= 1) {
  
    row.push(image[r][c])
         

       
    }
    newImage.push(row)
  }
  

  image = newImage;
  

}  

  // for (var r = image.length-1; r <= 0; r--) {
  //   for (var c = image.length-1; c < image[r].length; c--){
  //     switch (image[r][c]){
  //       [r][c] = new newImage();
  //     }
 
 
  //   }   
  // }
  // return newImage;