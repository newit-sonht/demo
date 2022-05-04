var Common = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function Common() {
        Phaser.Scene.call(this, { key: 'common', active: true });
    },

    preload: function () {
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('beer', 'assets/sprites/beer.png');
    },

    create: function () {
        this.beer = this.add.image(100, 300, 'beer');
    }

});
