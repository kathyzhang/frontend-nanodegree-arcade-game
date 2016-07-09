var colUnit = 101;
var rowUnit = 83;
var _score = 0;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed*dt*colUnit;
    this.col = Math.floor(this.x / colUnit);
    if (this.col > _numCols) {
        this.reset();
    }
    this.y = this.row * rowUnit;
    if (this.col === player.col && this.row === player.row) {
        _score --;
        if (_score < 0) {
            alert("game over");
            location.reload();
        }
        var score = document.getElementById("score");
        score.removeChild(score.lastChild);
        document.getElementById("counter").innerHTML = _score;
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.x = -1 * colUnit;
    this.row = getRandomInt(1,3);
    this.speed = getRandomInt(1,3);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';

    this.col = getRandomInt(0,4);
    this.row = 5;
    this.speed = 1;
};

Player.prototype.update = function(dt) {


    this.x = this.col * colUnit;
    this.y = this.row * rowUnit;

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.row === 0) {
        _score++;
        var node = document.createElement("img");
        node.src = "images/Star.png"
        document.getElementById("score").appendChild(node);
        document.getElementById("counter").innerHTML = _score;
        player.reset();

    }
};

Player.prototype.reset = function() {
    this.row = 5;
}

Player.prototype.handleInput = function(key) {
    switch (key){
        case 'left':
            this.col--;
            break;
        case 'up':
            this.row--;
            break;
        case 'right':
            this.col++;
            break;
        case 'down':
            this.row++;
            break;
    }
    if(this.col < 0) this.col = 0;
    if(this.col > 4) this.col = 4;
    if(this.row < 0) this.row = 0;
    if(this.row > 5) this.row = 5;


};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for(var i = 0; i < 3; i++){
    allEnemies.push(new Enemy());
}

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
