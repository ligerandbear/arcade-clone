var victory = false;
var gamesWon = 0;
var playerSpeed = -300;
var deaths = 0;
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype.update = function (dt) {
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
        this.x = -201;
        this.speed = getSpeed();
        this.y = getRow();
    }
};
var getSpeed = function () {
    var enemySpeed = Math.floor(Math.random() * 5) * 50 + 200;
    return enemySpeed;
};
var getRow = function () {
    var enemyRow = Math.floor(Math.random() * 3) * 83 + 60;
    return enemyRow;
};
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var Player = function (x, y, png) {
    this.sprite = png;
    this.x = x;
    this.y = y;
};
Player.prototype.update = function (dt) {
    if (victory) {
        this.victoryCheck(dt);
    }
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (allowedKeys) {
    var verticalMovement = 83,
            horizontalMovement = 100,
            lowerLimit = 410,
            rightLimit = 400,
            upperLimit = -5,
            leftLimit = 0;
    switch (allowedKeys) {
        case "up":
            this.y = this.y - verticalMovement;
            if (this.y <= upperLimit) {
                this.y = upperLimit;
                victory = true;
            }
            break;
        case "left":
            this.x = this.x - horizontalMovement;
            if (this.x <= leftLimit) {
                this.x = leftLimit;
            }
            break;
        case "down":
            this.y = this.y + verticalMovement;
            if (this.y >= lowerLimit) {
                this.y = lowerLimit;
            }
            break;
        case "right":
            this.x = this.x + horizontalMovement;
            if (this.x >= rightLimit) {
                this.x = rightLimit;
            }
            break;
    }
};
var player = new Player(200, 410, "images/char-pink-girl.png");
var enemy1 = new Enemy(-101, getRow(), getSpeed());
var enemy2 = new Enemy(-101, getRow(), getSpeed());
var enemy3 = new Enemy(-101, getRow(), getSpeed());
var allEnemies = [enemy1, enemy2, enemy3];

Player.prototype.victoryCheck = function (dt) {
    if (this.x <= 0) {
        playerSpeed = 300;
    }
    this.x = this.x + playerSpeed * dt;
    if (this.x > 400) {
        victory = false;
        this.x = 200;
        this.y = 410;
        playerSpeed = -300;
        gamesWon++;
        //console.log("Games Won: " + gamesWon);
    }
};
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});