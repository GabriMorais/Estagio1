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
  }



  loadImages() {
    this.load.image("tiles", "src/assets/img/teste.png");
    this.load.image("fundo", "src/assets/img/background3.jpg");
    this.load.image("test", "src/assets/img/bt2.png");
    this.load.image("teste", "src/assets/img/imginic.png");

  }

  loadTiledMap() {
    this.load.tilemapTiledJSON("map", "src/assets/map/mapa1.json");
  }

  loadSpriteSheets() {
    this.load.spritesheet("player","src/assets/img/teste28.png",{
      frameWidth: 51.05,
      frameHeight: 64,
  });
  this.load.spritesheet("enemy","src/assets/img/enemy1.png", {
      frameWidth: 51.05,
      frameHeight: 64,
  });
  }

  create()
    {
        this.add.image(0,0,"fundo").setOrigin(0,0);
        this.titulo = this.add.text(250,60, "Triunfo:", {
          fontSize: "45px",
          fill: "#FFD700",
        });
        this.titulo = this.add.text(150,110, "lutar ou morrer", {
          fontSize: "45px",
          fill: "#FFD700",
        });
        let btnPlay = this.add.image(300,320,"test").setOrigin(0,0);
        btnPlay.setInteractive();
        btnPlay.setScale(0.35)
        btnPlay.setDepth(0)
        this.buttonText = this.add.text(300,330, "INICIAR", {
          fontSize: "30px",
          fill: "#FFD700",
        });
        
        //center the button text inside the ui button
        
      
        let player = this.add.image(120,200,"teste").setOrigin(0,0);
        player.setScale(1.5)
		
        

        //Adicionar o clique do botao
        btnPlay.on("pointerdown", () => this.scene.start("PlayGame"));
    }
}