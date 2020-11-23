export default class controles extends Phaser.Scene {
    constructor() {
      super("controles");
      this.teclas;
    }
  
    preload() {
      
    }
   
  
    create()
      {
        this.add.image(0,0,"fundo").setOrigin(0,0);
       this.teclas =  this.add.image(535,95,"teclas").setOrigin(0,0);
        this.teclas.setScale(0.3)
        this.titulo = this.add.text(150,120, "Movimentação nas setas do teclado" + "\n" + "“A” para dar um soco"+ "\n" +"“D” para movimento de defesa"+ "\n" +"“S“ para dar um chute", {
            fontSize: "20px",
            fill: "#FFD700",
          });
         
          let btnBack = this.add.image(300,370,"test").setOrigin(0,0);
          btnBack.setInteractive();
          btnBack.setScale(0.35)
          btnBack.setDepth(0)
          this.buttonText = this.add.text(310,380, "VOLTAR", {
            fontSize: "30px",
            fill: "#FFD700",
          });
          
          
          //center the button text inside the ui button
          
        
          let player = this.add.image(250,200,"teste").setOrigin(0,0);
          player.setScale(1.5)
          
          this.music = this.sound.add('musica',{
          
            volume : .05,
            loop : true,
        });
      
        this.music.play();
  
          //Adicionar o clique do botao
         
          btnBack.on("pointerdown", () => this.scene.start("Menu"));
          btnBack.on("pointerdown", () => this.music.stop() );
         
      }
  }