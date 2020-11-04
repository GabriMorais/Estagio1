class Enemy extends Phaser.Physics.Arcade.Sprite{


    constructor(scene,x ,y,player){

        //pegar nosso monstrinho chamado slime para aplicar no game
        super(scene,x,y,'enemy', 0)
        this.scene = scene
        this.walking = 0;
        this.attack = 1;
        this.state = this.walking;
        this.setScale(1.2)
        this.enemyLife = 3;
        this.player = player;
        // habilitando as fisicas do mundo
        this.scene.physics.world.enable(this)

        //adiciona nosso player na cena
        this.scene.add.existing(this)

        //setting time to enemy moves
        this.timeEvent = this.scene.time.addEvent({
            delay: 2500,
            callback: this.move,
            loop: true,
            callbackScope: this
        })
    }

    move(){
        
        if (Phaser.Math.Distance.Between (
            this.x,
            this.y,
            this.player.x,
            this.player.y) < 100 && this.x<this.player.x ) {
            this.anims.play("golpe",true)
        }else if(Phaser.Math.Distance.Between (
            this.x,
            this.y,
            this.player.x,
            this.player.y) < 100 && this.x > this.player.x ){
                this.anims.play("golpe1",true)
        } 
        else {
            if (this.state == this.walking) {
                if (this.x < this.player.x) {
                    this.setVelocityX(50)
                    this.anims.play("b",true)            
                } else {
                    this.setVelocityX(-50)
                    this.anims.play("a",true)
                }    
            }    
        }
        
        this.scene.time.addEvent({
            delay:1300,
            callback: () => {
                this.anims.stop()
                this.setVelocity(0)
            },
            callbackScope: this,
        })
        
        
        const randNumber = Math.floor(Math.random() * 4 + 1)
        switch(randNumber){
            case 1:
                
                break
            case 2: 
                
                break
            case 3: 
                this.setVelocityY(50)
                this.anims.play("c",true)
                
               
                break
            case 4: 
                this.setVelocityY(-50)
                this.anims.play("d",true)
               
                break
            default: 
                this.setVelocityX(50)
                this.anims.stop()
        }

        this.scene.time.addEvent({
            delay:2000,
            callback: () => {
                this.anims.stop()
                this.setVelocity(0)
            },
            callbackScope: this,
        })
    }
    hitEnemy() {
        //this.scene.events.emit("distanceEnemy", this);
        console.log(this.x, this.y);
        let d = Phaser.Math.Distance.Between(
          this.x,
          this.y,
          this.player.x,
          this.player.y
        );
    
        if (d <= 50) {
          console.log("fight");
          if (--this.enemyLife <= 0) {
            this.setVisible(false);
            this.setActive(false);
            this.spawnChest(this.x, this.y, this.player);
            this.body.checkCollision.none = true;
          }
        } else {
          console.log("you cant fight from this distance");
          this.fightText = this.scene.make.text({
            x: 350,
            y: 100,
            text: "You cant fight from this distance.",
            origin: 0.5,
            style: {
              font: "bold 15px Arial",
              fill: "Red",
              wordWrap: { width: 300 },
            },
          });
    
          this.scene.time.addEvent({
            delay: 20,
            callback: () => {
              this.fightText.destroy();
            },
            callbackScope: this,
          });
        }
      }

  

}

export default Enemy