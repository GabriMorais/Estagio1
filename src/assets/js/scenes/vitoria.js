export default class vitoria extends Phaser.Scene {
  constructor() {
    super("vitoria");
  }

  preload() {
   
  }
  
  create()
    {
        this.add.image(0,0,"fundo").setOrigin(0,0);
        this.titulo = this.add.text(220,60, "Você ganhou", {
          fontSize: "45px",
          fill: "#FFD700",
        });
      
        let btnPlay = this.add.image(350,370,"test").setOrigin(0,0);
        btnPlay.setInteractive();
        btnPlay.setScale(0.35)
        btnPlay.setDepth(0)
        this.buttonText = this.add.text(380,370, "JOGAR", {
          fontSize: "25px",
          fill: "#FFD700",
        });
        this.buttonText = this.add.text(355,390, "NOVAMENTE", {
          fontSize: "25px",
          fill: "#FFD700",
        });
        let btnMENU = this.add.image(210,380,"test").setOrigin(0,0);
        btnMENU.setInteractive();
        btnMENU.setScale(0.35)
        btnMENU.setDepth(0)
        this.buttonText = this.add.text(240,380, "MENU", {
          fontSize: "30px",
          fill: "#FFD700",
        });
        
        //center the button text inside the ui button
        
      
        let player = this.add.image(120,200,"teste").setOrigin(0,0);
        player.setScale(1.5)
        
       

        //Adicionar o clique do botao
        btnPlay.on("pointerdown", () => this.scene.start("PlayGame"));
        btnMENU.on("pointerdown", () => this.scene.start("BootScene"));
    }
}