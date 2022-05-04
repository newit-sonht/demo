var Ball = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function Ball() {
        Phaser.Scene.call(this, { key: 'ball', active: true });
    },

    preload: function () {
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('apple', 'assets/sprites/apple.png');
    },

    create: function () {
        this.apple = this.add.image(200, 300, 'apple');
    }
});