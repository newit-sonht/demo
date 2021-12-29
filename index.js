
// start 
var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: {
        init: init,
        preload: preload,
        create: create,
        update: update,
    }
    
};
var game = new Phaser.Game(config);

var keyUp;
var keyDown;
var keyLeft;
var keyRight;

var paddleleft;
var ball;
var crate;

var score = 0;
var text;

function init() 
{
    console.log('Start Game making ...');
}

function preload ()
{
    this.load.image('crate', 'res/crate.png');
}

function create ()
{
    // create key 
    keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    // this.physics.world.
    // var crate = this.add.sprite(400, 300, 'crate');
    // this.physics.add.existing(crate,true);
    row1 = this.physics.add.group( 
    {
        key: 'crate',
        repeat: 2,
        setXY: {x: 600,y: 100, stepX : 80, stepY: 0}
    },
    );
    row2 = this.physics.add.group( 
        {
            key: 'crate',
            repeat: 2,
            setXY: {x: 600,y: 180, stepX : 80, stepY: 0}
    },
    );
    row3 = this.physics.add.group( 
        {
            key: 'crate',
            repeat: 2,
            setXY: {x: 600,y: 260, stepX : 80, stepY: 0}
        }
    );
    row4 = this.physics.add.group( 
        {
            key: 'crate',
            repeat: 2,
            setXY: {x: 600,y: 340, stepX : 80, stepY: 0}
        }
    );

    // score
    text = this.add.text(20, 20, "Score : " + score);

    // ball
    ball = this.add.circle(400,200, 10 ,0xffffff);
    this.physics.add.existing(ball);
    ball.body.setCollideWorldBounds(true, 1, 1);
    ball.body.setVelocity(150,150);
    ball.body.setBounce(1,1);

    // create some rectangel
    paddleleft = this.add.rectangle(150, 230, 40, 120, 0xffffff).setInteractive();
    this.physics.add.existing(paddleleft,true);
    this.physics.add.collider(paddleleft,ball);

    // red line
    redLine = this.add.rectangle(0, 250, 20, 500, 0xFF0000);

    // physics
    this.physics.add.overlap(ball, row1, destroyBox, null, this);
    this.physics.add.overlap(ball, row2, destroyBox, null, this);
    this.physics.add.overlap(ball, row3, destroyBox, null, this);
    this.physics.add.overlap(ball, row4, destroyBox, null, this);
}

function update() 
{
    if (keyUp.isDown)
    {
        if(paddleleft.y >= 45) {
            paddleleft.y -= 5;
            paddleleft.body.updateFromGameObject();
        }
    }
    if (keyDown.isDown)
    {
        if(paddleleft.y <= 450) {
            paddleleft.y += 5;
            paddleleft.body.updateFromGameObject();
        }
    }
    if (keyLeft.isDown)
    {
        console.log('Left');
    }
    if (keyRight.isDown)
    {
        console.log('Right');
    }

    // win
    if(score == 12) {
        console.log("You win");
        ball.body.setVelocity(0,0);
        this.add.text(400, 250, "You Win");
        game.destroy();
    }

    if(ball.x <= 10) {
        console.log("You Lost");
        this.add.text(400, 250, "You Lose");
        game.destroy();
    }

}

function destroyBox (ball, box)
{
    score++;
    text.text = "Score : " + score;
    box.destroy()
}




/*
    Phase 3 dictionary : 

    -- add some texT: this.add.text(250, 250, "Hello World");

    -- set resource url : this.load.setBaseURL('http://labs.phaser.io');

    -- load image : this.load.image('sky', 'assets/skies/space3.png');

    -- add a circle : this.add.circle(400,200, 10 ,0xffffff);



*/