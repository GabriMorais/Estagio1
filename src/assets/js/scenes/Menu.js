export default class Menu extends Phaser.Scene {
    constructor() {
      super("Menu");
    }
  
    preload() {
      
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
          let btnPlay = this.add.image(200,370,"test").setOrigin(0,0);
          btnPlay.setInteractive();
          btnPlay.setScale(0.35)
          btnPlay.setDepth(0)
          this.buttonText = this.add.text(200,380, "INICIAR", {
            fontSize: "30px",
            fill: "#FFD700",
          });
          let btnRegras = this.add.image(400,370,"test").setOrigin(0,0);
          btnRegras.setInteractive();
          btnRegras.setScale(0.35)
          btnRegras.setDepth(0)
          this.buttonText = this.add.text(400,380, "CONTROLES", {
            fontSize: "30px",
            fill: "#FFD700",
          });
          
          
          //center the button text inside the ui button
          
        
          let player = this.add.image(250,200,"teste").setOrigin(0,0);
          player.setScale(1.5)
          
          this.music = this.sound.add('musica',{
          
            volume : .09,
            loop : true,
        });
      
            this.music.play();
  
          //Adicionar o clique do botao
         
          btnPlay.on("pointerdown", () => this.scene.start("PlayGame"));
          btnPlay.on("pointerdown", () => this.music.stop() );
          btnRegras.on("pointerdown", () => this.scene.start("controles"));
          btnRegras.on("pointerdown", () => this.music.stop() );
      }
  }