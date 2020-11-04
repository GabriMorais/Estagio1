import Enemies from "../classes/Enemies";
export default class BootScene extends Phaser.Scene {
    constructor() {
        super("PlayGame");
        this.enemies;
        this.player;
        this.life = 300
        this.cursors;
        this.golpeesq;
        this.x = 0;
        this.keyA;
        this.keyS;
        this.depgolpeesq = 1;
        this.enemiesGroup;
        this.invincible = false
        this.titulo;
      }
preload(){

}
create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("16", "tiles")

    const mapa = map.createStaticLayer("mapa", tileset, 0, 0);
    const colisao = map.createStaticLayer("colisao", tileset, 0,0);
    const depoiscol = map.createStaticLayer("depoiscol", tileset, 0, 0,);
    colisao.setCollisionByProperty({ coliders: true });
    depoiscol.setCollisionByProperty({ coliders: true });
    this.titulo = this.add.text(250,60, this.life, {
        fontSize: "45px",
        fill: "#FFD700",
    });

    //player

    const spawnPoint = map.findObject(
        //player and not Player like your variable
        "player",
        (objects) => objects.name === "player"
    );

    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player");
    this.player.setScale(1.2)
    this.physics.add.collider(this.player, colisao);
    this.physics.add.collider(this.player, depoiscol);
   //first enemy name of the object
  //secound enemy the name now to object
  this.enemies = map.createFromObjects("enemy", "enemy", {});
  this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemies,this.player);
    this.physics.add.collider( this.player,this.enemiesGroup);
    this.physics.add.collider(
        this.enemiesGroup,
        this.player,
        //funcao para matar o inimigo
        this.hitEnemy,
        null,
        this
      );
    this.physics.add.collider(this.enemiesGroup, colisao);
    this.physics.add.collider(this.enemiesGroup, depoiscol);
    const anims = this.anims;
    anims.create({
        key: "right",
        frames: anims.generateFrameNames("player", { start: 1, end: 8 }),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "left",
        frames: anims.generateFrameNames("player", { start: 21, end: 14}),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "front",
        frames: anims.generateFrameNames("player", { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "back",
        frames: anims.generateFrameNames("player", { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "keyq",
        frames: anims.generateFrameNames("player", { start: 9, end:10}),
        frameRate:17, 
        repeat: -1,
    });
    anims.create({
        key: "keyq1",
        frames: anims.generateFrameNames("player", { start: 28, end:27}),
        frameRate:17, 
        repeat: -1,
    });
    anims.create({
        key: "keyS",
        frames: anims.generateFrameNames("player", { start: 32, end:34}),
        frameRate:13, 
        repeat: -1,
    });
    anims.create({
        key: "keys1",
        frames: anims.generateFrameNames("player", { start: 35, end:37}),
        frameRate:13, 
        repeat: -1,
    });
    anims.create({
        key: "keyd",
        frames: [ { key: 'player', frame: 39 } ],
        frameRate:1, 
    });
    anims.create({
        key: "keyd1",
        frames: [ { key: 'player', frame: 42 } ],
        frameRate:1, 
    });
    anims.create({
        key: "a",
        frames: anims.generateFrameNames("enemy", { start: 0, end:3}),
        frameRate:10, 
        repeat: -1,
    });
    anims.create({
        key: "b",
        frames: anims.generateFrameNames("enemy", { start: 7, end:4}),
        frameRate:10, 
        repeat: -1,
    });
    anims.create({
        key: "c",
        frames: anims.generateFrameNames("enemy", { start: 0, end:1}),
        frameRate:10, 
        repeat: -1,
    });
    anims.create({
        key: "d",
        frames: anims.generateFrameNames("enemy", { start: 1, end:0}),
        frameRate:10, 
        repeat: -1,
    });
    anims.create({
        key: "golpe",
        frames: anims.generateFrameNames("ataque", { start: 0, end:1}),
        frameRate:10, 
        repeat: -1,
    });
    anims.create({
        key: "golpe1",
        frames: anims.generateFrameNames("ataque", { start: 2, end:3}),
        frameRate:10, 
        repeat: -1,
    });
    anims.create({
        key: "damage",
        frames: anims.generateFrameNames("player", { start: 44, end:45}),
        frameRate:50, 
        repeat: -1,
    });
    anims.create({
        key: "parado",
        frames: [ { key: 'player', frame: 0 } ],
        frameRate:1, 
    });
    
    

    //the CAMERA
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cursors = this.input.keyboard.createCursorKeys();
    
}
update() {
    //put here  before your velocity is 0
    const prevVelocity = this.player.body.velocity.clone();
    //stop player when stop press the key
    this.player.body.setVelocity(0);
    
    this.keyA = this.input.keyboard.addKey(65);
    this.keyS = this.input.keyboard.addKey(83);
    this.keyD = this.input.keyboard.addKey(68);
    //keyboard press to move
    if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-100);
    } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(100);
    } else if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
        this.player.body.setVelocityY(80);
    }
    
        //set animations per key pressed
    if (this.cursors.left.isDown) {
        this.x = 1;
        this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
        this.x = 0;
        this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
        //its because when you go, you need see the back of your character
        this.player.anims.play("back", true);
    } else if (this.cursors.down.isDown) {
        this.player.anims.play("front", true);
    }else if (this.keyA.isDown && this.depgolpeesq == 1 && this.x ==1 ) {
        
        this.player.anims.play("keyq1", true); 
    }else if (this.keyA.isDown && this.depgolpeesq == 1 && this.x==0) {
        
        this.player.anims.play("keyq", true); 
        
            
         
       
    }else if (this.keyS.isDown && this.depgolpeesq == 1 && this.x ==1 ) {
        
        this.player.anims.play("keys1", true); 
    }else if (this.keyS.isDown && this.depgolpeesq == 1 && this.x==0) {
         
        this.player.anims.play("keyS", true); 
        
         
             
          
        
    }else if (this.keyD.isDown && this.depgolpeesq == 1 && this.x ==1 ) {
        
        this.player.anims.play("keyd1", true); 
    }else if (this.keyD.isDown && this.depgolpeesq == 1 && this.x==0) {
         
        this.player.anims.play("keyd", true);
    }
    else if (this.cursors.space.isDown) {
        this.player.setVelocityY(-30);
            
         
       
   }else {

    this.player.anims.stop();
        

    }
    if(this.keyA.isUp){
        this.depgolpeesq = 1
    }
    
    
}   
hitEnemy() {
    if (this.keyD.isDown) {
        this.player.anims.play("keyd", true);
    } else {
            if (Math.random(100) < 30) {
                if (!this.invincible) {
                    this.player.anims.play("damage")
                    this.invincible = true;
                    this.events.emit("hitEnemy", --this.life);
                    this.events.removeListener( "hitEnemy",--this.life)
                    this.titulo.destroy();
                    this.titulo = this.add.text(250,60, this.life, {
                    fontSize: "45px",
                    fill: "#FFD700",
                    });
                    this.time.delayedCall(
                        8000,
                        () => {
                          this.invincible = false;
                         
                        },
                        null,
                        this
                      );
            }
            
           
          }
        
    }
    
    if(this.life <= 0){
        this.scene.stop("PlayGame")
    }
  }
}