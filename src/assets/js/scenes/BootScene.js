export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    //load tiledmap
    this.loadTiledMap();
    //images
    this.loadImages();
    //load spritesheets
    this.loadSpriteSheets();
    this.loadAudio();
  }
  loadAudio(){
    this.load.audio("musica", "src/assets/audio/music.wav")
    this.load.audio("pdamage", "src/assets/audio/PlayerDamage.wav")
    this.load.audio("edamage", "src/assets/audio/Punch_04.wav")
  }



  loadImages() {
    this.load.image("tiles", "src/assets/img/teste.png");
    this.load.image("fundo", "src/assets/img/background3.jpg");
    this.load.image("test", "src/assets/img/bt2.png");
    this.load.image("teste", "src/assets/img/imginic.png");
    this.load.image("teclas", "src/assets/img/teclass.png");
    this.load.image("morto", "src/assets/img/morto.png");
    this.load.image("life", "src/assets/img/life1.png");

  }

  loadTiledMap() {
    this.load.tilemapTiledJSON("map", "src/assets/map/mapa6.json");
  }

  loadSpriteSheets() {
    this.load.spritesheet("player","src/assets/img/teste30.png",{
      frameWidth: 51.05,
      frameHeight: 64,
  });
 
    this.load.spritesheet("enemyfinal","src/assets/img/enemyfinal1.png",{
      frameWidth: 64.15,
      frameHeight: 62,
  });
  this.load.spritesheet("enemy","src/assets/img/enemy3.png", {
      frameWidth: 51.05,
      frameHeight: 64,
  });
  this.load.spritesheet("ataque","src/assets/img/ataque4.png", {
    frameWidth: 91,
    frameHeight: 62,
});

  }

  create(){
    this.scene.start("Menu")
}}