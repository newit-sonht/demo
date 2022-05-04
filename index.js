var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    // physics: {
    //     default: 'arcade',
    //     arcade: {
    //         gravity: { y: 0 }
    //     }
    // },
    parent: 'phaser-example',
    scene: [ Ball ]
};

var game = new Phaser.Game(config);
