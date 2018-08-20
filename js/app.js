/**
 * TODO:
 * - Add score
 * - Add player lives
 * - Add Gem class
 * - Add gameOver screen
 * - Media query
 */

// Enemies the player must avoid
var Enemy = function(x, y, speed) {
   
    this.x = x;
    this.y = y;
    this.speed = speed;

    
    this.sprite = 'https://raw.githubusercontent.com/udacity/frontend-nanodegree-arcade-game/master/images/enemy-bug.png';
};


Enemy.prototype.update = function(dt) {
    
    this.x += this.speed * dt;

    
    if (this.x > 300) {
        this.x = -50;
        this.speed = 50 + Math.floor(Math.random() * 300);
    }

    // below code will check for any collisions between player and enemy
    if (player.x < this.x + 60 &&
        player.x + 35 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200; // re-aligns position.1
        player.y = 300; // re-aligns position.2
        score = 0; // resets score back to 0 if player collides with enemy
        document.getElementById('lvlScore').innerHTML = score; // 
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'https://raw.githubusercontent.com/udacity/frontend-nanodegree-arcade-game/master/images/char-princess-girl.png';
};

Player.prototype.update = function() {
    // Below code will stop the player from moving off canvas
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 300) {
        this.x = -15;
      this.speed = 15 +
        Math.floor(Math.random() * 15);
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Once player reaches top of canvas/water. 1 point will be added to their lvl/score
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        score++;
        document.getElementById('lvlScore').innerHTML = score;
        if(score >= 1) {
            alert(" You did it!");
            document.getElementById("lvlScore").innerHTML = "0";
        }
   
    } 
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Maneuver around the board using standard arrow keys OR WASD keys
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
        case 'a':
            this.x -= this.speed + 50;
            break;
        case 'w':
            this.y -= this.speed + 30;
            break;
        case 'd':
            this.x += this.speed + 50;
            break;
        case 's':
            this.y += this.speed + 30;
            break;    
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

// Position enemies 
var enemyPosition = [50, 130, 220];
var player = new Player(200, 400, 50);
var enemy;

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 150));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
