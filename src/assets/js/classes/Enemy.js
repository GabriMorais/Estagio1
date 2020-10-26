class Enemy extends Phaser.Physics.Arcade.Sprite{


    constructor(scene,x ,y){

        //pegar nosso monstrinho chamado slime para aplicar no game
        super(scene,x,y,'enemy', 0)
        this.scene = scene
        this.setScale(1.2)

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
        const randNumber = Math.floor(Math.random() * 4 + 1)
        switch(randNumber){
            case 1: 
                this.setVelocityX(50)
                this.anims.play("a",true)
                break
            case 2: 
                this.setVelocityX(-50)
                this.anims.play("b",true)
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
                this.setVelocityX(100)
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

  

}

export default Enemy