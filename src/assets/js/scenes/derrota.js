export default class derrota extends Phaser.Scene {
  constructor() {
    super("derrota");

  }

  preload() {
    
  }

  create()
    {
        this.add.image(0,0,"fundo").setOrigin(0,0);
        this.titulo = this.add.text(220,60, "Você perdeu", {
          fontSize: "45px",
          fill: "#FFD700",
        });
        this.titulo = this.add.text(100,100, "Boa sorte na próxima", {
          fontSize: "45px",
          fill: "#FFD700",
        });
      
        let btnPlay = this.add.image(300,320,"test").setOrigin(0,0);
        btnPlay.setInteractive();
        btnPlay.setScale(0.35)
        btnPlay.setDepth(0)
        this.buttonText = this.add.text(330,330, "MENU", {
          fontSize: "30px",
          fill: "#FFD700",
        });
        
        //center the button text inside the ui button
        
      
        let player = this.add.image(120,200,"teste").setOrigin(0,0);
        player.setScale(1.5)
        
       

        //Adicionar o clique do botao
        btnPlay.on("pointerdown", () => this.scene.start("BootScene"));
    }
    update(){

    }
}