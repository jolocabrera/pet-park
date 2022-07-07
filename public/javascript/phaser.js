var config = {
  type: Phaser.AUTO,
  width: 720,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

// var platforms;
var player;
// var stars;
// var bombs;
var score = 0;
var scoreText;
var game = new Phaser.Game(config);

function preload() {
  // this.load.image('sky', '/assets/sky.png');
  // this.load.image('ground', 'assets/platform.png');
  // this.load.image('star', 'assets/star.png');
  // this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.image("tiles", "../assets/scenesheet.png");
  this.load.tilemapTiledJSON("map", "../assets/petpark.json");
}

function create() {
  // this.add.image(360,300, 'tiles');
  //load map from JSON file and load tile images from bmp image
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("scenesheet", "tiles");

  //create map layers
  const groundLayer = map.createStaticLayer("Ground", tileset);
  const flowersLayer = map.createStaticLayer("FLOWERS", tileset);
  const midLayer = map.createStaticLayer("Mid", tileset);
  const topLayer = map.createStaticLayer("Top", tileset);

  player = this.physics.add.sprite(100, 450, "dude");

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "stop",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "down",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "up",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  //set colliders
  topLayer.setCollisionByProperty({ collide: true });
  this.physics.add.collider(player, topLayer);

  midLayer.setCollisionByProperty({ collide: true });
  this.physics.add.collider(player, midLayer);

  cursors = this.input.keyboard.createCursorKeys();

  // stars = this.physics.add.group({
  //     key: 'star',
  //     repeat: 11,
  //     setXY: { x: 12, y: 0, stepX: 70 }
  // });

  // stars.children.iterate(function (child) {
  //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  // });

  // this.physics.add.collider(stars, platforms);
  // this.physics.add.overlap(player, stars, collectStar, null, this);

  // scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000'});

  // bombs = this.physics.add.group();
  // this.physics.add.collider(bombs, platforms);
  // this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play("right", true);
  } else if (cursors.up.isDown) {
    player.setVelocityY(-160);
    player.anims.play("up", true);
  } else if (cursors.down.isDown) {
    player.setVelocityY(160);
    player.anims.play("down", true);
  } else {
    player.setVelocityX(0);
    player.setVelocityY(0);
    player.anims.play("stop");
  }

  // if(cursors.up.isDown && player.body.touching.down) {
  //     player.setVelocityY(-330);
  // }
}

function collectStar(player, star) {
  star.disableBody(true, true);

  score += 10;
  scoreText.setText("Score: " + score);

  if (stars.countActive(true) === 0) {
    stars.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
    });

    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, "bomb");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
}

function hitBomb(player, bomb) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play("turn");
  gameOver = true;
}