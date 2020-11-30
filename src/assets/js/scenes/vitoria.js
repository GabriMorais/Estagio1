export default class vitoria extends Phaser.Scene {
  constructor() {
    super("vitoria");
    this.back;
  }

  preload() {
   
  }
  
  create()
    {
      this.back =this.add.sprite(0,0,"a").setOrigin(0,0);
      this.back.setScale(1.3)  
      this.titulo = this.add.text(240,110, "Parabéns", {
          fontSize: "45px",
          fill: "#FFD700",
        });
        this.titulo = this.add.text(200,150, "Você venceu", {
          fontSize: "45px",
          fill: "#FFD700",
        });
      
        let btnPlay = this.add.image(350,370,"test").setOrigin(0,0);
        btnPlay.setInteractive();
        btnPlay.setScale(0.35)
        btnPlay.setDepth(0)
        this.buttonText = this.add.text(380,370, "JOGAR", {
          fontSize: "23px",
          fill: "#FFD700",
        });
        this.buttonText = this.add.text(355,390, "NOVAMENTE", {
          fontSize: "23px",
          fill: "#FFD700",
        });
        let btnMENU = this.add.image(210,380,"test").setOrigin(0,0);
        btnMENU.setInteractive();
        btnMENU.setScale(0.25)
        btnMENU.setDepth(0)
        this.buttonText = this.add.text(235,385, "MENU", {
          fontSize: "25px",
          fill: "#FFD700",
        });
        
        //center the button text inside the ui button
        
      
        let player = this.add.image(210,180,"imgvit").setOrigin(0,0);
        player.setScale(2)
        
       

        //Adicionar o clique do botao
        btnPlay.on("pointerdown", () => this.scene.start("PlayGame"));
        btnMENU.on("pointerdown", () => this.scene.start("BootScene"));
    }
}