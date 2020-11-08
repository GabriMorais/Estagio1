import Enemy from "./Enemy"

class Enemies extends Phaser.Physics.Arcade.Group{
    constructor(world, scene, children, spriteArray,player,attack){
        super(world, scene, children, {},player,attack)
        this.scene = scene

        this.createEnemies(scene, spriteArray,player,attack)
    }

createEnemies(scene, spriteArray,player,attack) {

    spriteArray.forEach(sprite => {
      //create an enemy
      const enemy = new Enemy(scene, sprite.x, sprite.y,player,sprite,attack)
      //add it to the group
      this.add(enemy)
      //destroy the sprite
      sprite.destroy()
    })
  }
  
    
}

export default Enemies