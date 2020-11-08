import PlayGame from "../scenes/PlayGame";
class Enemy extends Phaser.Physics.Arcade.Sprite{


    constructor(scene,x ,y,player,sprite,attack){

        //pegar nosso monstrinho chamado slime para aplicar no game
        super(scene,x,y,'enemy', 0)
        this.sprite = sprite
        this.scene = scene
        this.walking = 0;
        this.attack = attack;
        this.titulo;
        this.invencible = false;
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
    create(){
        this.scene.physics.add.collider(
            this.player,
            this.sprite,
            //funcao para matar o inimigo
            this.hitEnemy,
            null
          );
    }
    
    move(){
        
        if (Phaser.Math.Distance.Between (
            this.x,
            this.y,
            this.player.x,
            this.player.y) < 100 && this.x<this.player.x ) {
            this.anims.play("golpe",true)
            this.hitEnemy;
            this.scene.time.addEvent({
                delay:1300,
                callback: () => {
                    this.anims.stop()
                    this.setVelocity(0)
                },
                callbackScope: this,
            })
        }else if(Phaser.Math.Distance.Between (
            this.x,
            this.y,
            this.player.x,
            this.player.y) < 100 && this.x > this.player.x ){
                this.anims.play("golpe1",true)
                this.scene.time.addEvent({
                    delay:1300,
                    callback: () => {
                        this.anims.stop()
                        this.setVelocity(0)
                    },
                    callbackScope: this,
                })
        } 
        else {
            if (this.state == this.walking) {
                if (this.x < this.player.x) {
                    this.setVelocityX(30)
                    this.anims.play("a",true)            
                } else if(this.x > this.player.x) {
                    this.setVelocityX(-30)
                    this.anims.play("b",true)
                }    
            }    
        }
        
       
        
        const randNumber = Math.floor(Math.random() * 4 + 1)
        switch(randNumber){
            case 1:
                
                break
            case 2: 
            
                break
            case 3: 
                this.setVelocityY(30)
                this.anims.play("c",true)
                
               
                break
            case 4: 
                this.setVelocityY(-30)
                this.anims.play("d",true)
               
                break
            default: 
                this.setVelocityX(30)
                this.anims.stop()
        }
        let d = Phaser.Math.Distance.Between(
            this.x,
            this.y,
            this.player.x,
            this.player.y
          );
        if (d < 50) {
            this.attack.play();
            this.enemyLife = this.enemyLife - 1;
        } 
        if (this.enemyLife <= 0) {
            this.setVisible(false);
            this.setActive(false);
            this.body.checkCollision.none = true;
          }

    }
}
    
      
        
        
        
        
    

  



export default Enemy