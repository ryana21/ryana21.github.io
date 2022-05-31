var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        // ANIMATION VARIABLES HERE:
        var tree;
        var streetlight;
        var streetlight2;
        var buildings = [];
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();
            
            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'#310047');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var moon = draw.bitmap('img/moon.png');
            moon.x = 800;
            moon.y = 50;
            moon.scaleX = 0.4;
            moon.scaleY = 0.4;
            background.addChild(moon);

            var circle = draw.circle(10,'white','LightGray',2);
            circle.x = canvasWidth*Math.random();
            circle.y = groundY*Math.random();
            background.addChild(circle);
            
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for(var i=0;i<8;++i) {
                var buildingHeight = canvasWidth*Math.random()/3;
                var building = draw.rect(75,buildingHeight,"#" +randomHex256() + randomHex256() + randomHex256(),1);
                building.x = 200*i;
                building.y = groundY-buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            
            function randomHex256(){
                return Math.floor(Math.random()*256).toString(16);
            }

            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png');
            tree.x = 180;
            tree.y = 90;
            background.addChild(tree);
            

            streetlight = draw.bitmap('img/street-light.png');
            streetlight.scaleX = 0.05;
            streetlight.scaleY = 0.05;
            streetlight.x = 180;
            streetlight.y = 100;
            background.addChild(streetlight);

            streetlight2 = draw.bitmap('img/street-light.png');
            streetlight2.scaleX = 0.05;
            streetlight2.scaleY = 0.05;
            streetlight2.x = 1000;
            streetlight2.y = 100;
            background.addChild(streetlight2);

        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 3;

            if(tree.x < -200) {
                tree.x = canvasWidth;
            }

            streetlight.x = streetlight.x - 4;

            if(streetlight.x < -200) {
                streetlight.x = canvasWidth;
            }

            streetlight2.x = streetlight2.x - 4;

            if(streetlight2.x < -200) {
                streetlight2.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++) {
                var eachElement = buildings[i];
                
                eachElement.x = eachElement.x - 1;

                if(eachElement.x < -200) {
                    eachElement.x = canvasWidth;
                }
                
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
