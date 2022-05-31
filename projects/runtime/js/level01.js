var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x,y) {
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = x;
        sawBladeHitZone.y = y;
        game.addGameItem(sawBladeHitZone); 
        var obstacleImage = draw.bitmap('img/sawblade.png',-24,-25);
        sawBladeHitZone.addChild(obstacleImage); 
        };
        createSawBlade(850, 200);
        createSawBlade(450, 290);
        createSawBlade(1200, 290);


        function createMyObstacle(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            obstacleHitZone.x = x;
            obstacleHitZone.y = y;
            game.addGameItem(obstacleHitZone); 
            var obstacleImage = draw.bitmap('img/cars.png',-24,-25);
            obstacleHitZone.addChild(obstacleImage); 
        };
        createMyObstacle(400, 200);
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
