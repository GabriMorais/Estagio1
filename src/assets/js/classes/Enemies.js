import Enemy from "./Enemy"

class Enemies extends Phaser.Physics.Arcade.Group{
    constructor(world, scene, children, spriteArray,player){
        super(world, scene, children, {},player)
        this.scene = scene

        this.createEnemies(scene, spriteArray,player)
    }

createEnemies(scene, spriteArray,player) {

    spriteArray.forEach(sprite => {
      //create an enemy
      const enemy = new Enemy(scene, sprite.x, sprite.y,player)
      //add it to the group
      this.add(enemy)
      //destroy the sprite
      sprite.destroy()
    })
  }
    
}

export default Enemies