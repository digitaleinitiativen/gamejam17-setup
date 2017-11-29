var SPEED = 180;
var GRAVITY = 1200;
var JUMP = 580;
var ASSET_VERSION = (new Date()).getTime();
var BASE_PATH = '';

var state = {
    preload: function() {
        this.load.image("player",BASE_PATH + 'assets/santa-player.png?' + ASSET_VERSION, 48, 48);
        this.load.image("background.0", BASE_PATH + "assets/background.png?" + ASSET_VERSION, 1600, 200);
        this.load.image("floor", BASE_PATH + "assets/floor.png?" + ASSET_VERSION, 800, 8);
    },
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.background0 = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background.0');
        this.floor = this.add.sprite(0, this.world.height, 'floor');
        this.player = this.add.sprite(0, 0, 'player');

        this.hints = this.add.group();
        this.scoreText = this.add.text(
            this.world.width / 2,
            this.world.height / 3,
            "",
            {
                fill: '#ffdd00',
                align: 'center'
            }
        );
        this.scoreText.anchor.setTo(0.5, 0.5);
        this.scoreText.fontSize = 20;

        this.reset();
    },
    update: function() {
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP) 
            || this.game.input.activePointer.isDown
        ) {
            if(!this.gameStarted) {
                this.start();
            } else if(this.gameOver) {
                if(this.time.now > this.timeOver + 400)
                    this.reset();
            }
        }

    },
    start: function() {
        this.scoreText.setText("SCORE: "+this.score);
        this.gameStarted = true;
    },
    reset: function() {
        this.gameStarted = false;
        this.gameOver = false;
        this.score = 0;
        this.scoreText.setText("TOUCH TO\nSTART GAME");
    },
    addScore: function(addWhat) {
        this.score += addWhat;
        this.scoreText.setText("SCORE: " + this.score);  
    },
    showHint: function(focusOn, text) {
        var hint = this.game.add.text(
            focusOn.x,
            focusOn.y,
            text,
            {
                fill: '#ffdd00',
                align: 'center'
            }
        );
        hint.anchor.setTo(0.5, 0.5);
        hint.fontSize = 20;

        var move = this.game.add.tween(hint);
        move.to({ y: hint.y - 100, x: hint.x - 100 * Math.random() + 50}, 1000);
        move.onComplete.add(function() { hint.kill() }, this);
        move.start();

    },
    setGameOver: function(player, enemy) {
        this.timeOver = this.game.time.now;
        this.gameOver = true;

        this.scoreText.setText("FINAL SCORE: " + this.score +"\nTOUCH TO TRY AGAIN");
        this.shareText.visible = true;
    }
};

var game = new Phaser.Game(
    800,
    200,
    Phaser.CANVAS,
    document.querySelector('#screen'),
    state
);
