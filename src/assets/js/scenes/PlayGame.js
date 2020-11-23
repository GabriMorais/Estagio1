
import Enemies from "../classes/Enemies";
export default class PlayGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
        this.player;
        this.life = 1
        this.golpeesq;
        this.keyA;
        this.keyS; 
        this.x = 0;
        this.depgolpeesq = 1;
        this.invincible = false
        
        this.enemies;
        this.enemiesGroup;

        this.cursors;
        this.textTela;
        this.textTela1;
        this.textTela2
        this.titulo;

        this.enemyfinal;
        this.enemyfinalLife = 1;
        this.walking = 1
        this.defesa = 2
        this.ataque = 3
        this.state = this.walking;
        
        
        this.music;
        this.damage;
        this.attack;
      
        this.timeEvent;
  
        
        
      }
preload(){

}
create() {
    this.timeEvent = this.time.addEvent({
        delay: 2500,
        callback: this.move,
        loop: true,
        callbackScope: this
    })
    this.music = this.sound.add('musica',{
        
        volume : .1,
        loop : true,
    });
	
    this.music.play();
    this.damage = this.sound.add("pdamage", {
        loop: false,
        volume: 5,
      });
  
    this.attack = this.sound.add("edamage", {
        loop: false,
        volume: 5,
      });
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("16", "tiles")

    const mapa = map.createStaticLayer("mapa", tileset, 0, 0);
    const colisao = map.createStaticLayer("colisao", tileset, 0,0);
    const depoiscol = map.createStaticLayer("depoiscol", tileset, 0, 0,);
    colisao.setCollisionByProperty({ coliders: true });
    depoiscol.setCollisionByProperty({ coliders: true });
    this.invincible =false
    //player

    const spawnPoint = map.findObject(
        //player and not Player like your variable
        "player",
        (objects) => objects.name === "player"
    );
    const enemyspawnPoint = map.findObject(
        //player and not Player like your variable
        "enemyfinal",
        (objects) => objects.name === "enemyfinal"
    );

    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player");
    this.player.setScale(1.5)
    this.physics.add.collider(this.player, colisao);
    this.physics.add.collider(this.player, depoiscol);

   //first enemy name of the object
  //secound enemy the name now to object
  this.enemies = map.createFromObjects("enemy", "enemy", {});
  this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemies,this.player,this.attack);
  this.physics.add.overlap(
    this.enemiesGroup,
    this.player,
    //funcao para matar o player
    this.hitEnemy,
    null,
    this
  );      
    this.physics.add.collider(this.enemiesGroup, colisao);
    this.physics.add.collider(this.enemiesGroup, depoiscol);
    this.enemyfinal = this.physics.add.sprite(enemyspawnPoint.x , enemyspawnPoint.y  , "enemyfinal");
    this.player.setScale(0.8)
    this.physics.add.collider(this.enemyfinal, colisao);
    this.physics.add.collider(this.enemyfinal, depoiscol);
    this.physics.add.overlap(
    this.player,
    this.enemyfinal,
    //funcao para matar o player
    this.hitEnemyfinal,
    null,
    this
  );      
    
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
        key: "efinald",
        frames: anims.generateFrameNames("enemyfinal", { start: 6, end: 11 }),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "efinale",
        frames: anims.generateFrameNames("enemyfinal", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "efinalb",
        frames: anims.generateFrameNames("enemyfinal", { start: 2, end: 1 }),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "efinals",
        frames: anims.generateFrameNames("enemyfinal", { start: 8, end: 9 }),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "efinalgolpe",
        frames: anims.generateFrameNames("enemyfinal", { start: 12, end: 13 }),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "efinalgolpe1",
        frames: anims.generateFrameNames("enemyfinal", { start: 14, end: 15 }),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "efinalgolpe2",
        frames: anims.generateFrameNames("enemyfinal", { start: 20, end: 21 }),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "efinalgolpe3",
        frames: anims.generateFrameNames("enemyfinal", { start: 22, end: 23}),
        frameRate: 10,
        repeat: -1,
    });
    anims.create({
        key: "efinaldefesa",
        frames: [ { key: "enemyfinal", frame: 17 } ],
        frameRate:1, 
    });
    anims.create({
        key: "efinaldefesa1",
        frames: [ { key: "enemyfinal", frame: 18 } ],
        frameRate:1, 
    });
    anims.create({
        key: "efinaldamage",
        frames: [ { key: "enemyfinal", frame: 20 } ],
        frameRate:1, 
    });
    anims.create({
        key: "efinaldamage1",
        frames: [ { key: "enemyfinal", frame: 16 } ],
        frameRate:1, 
    });
    anims.create({
        key: "morte",
        frames: [ { key: "enemyfinal", frame: 17 } ],
        frameRate:1, 
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
        key: "morto",
        frames: [ { key: 'player', frame: 46 } ],
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
    const camera = this.cameras.main.setBounds();
    this.physics.world.setBounds();
    camera.startFollow(this.player,true);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.textTela = this.add.text(60, 20,'Vidas: '+ this.life, {
        fontFamily: 'Verdana',
        fontSize: '22px',
        fill: 'Pink'
    }).setScrollFactor(0);
    this.textTela1 = this.add.text(60,40,'Inimigos: 33', {
        fontFamily: 'Verdana',
        fontSize: '22px',
        fill: 'Pink'
    }).setScrollFactor(0);
    this.textTela2 = this.add.text(60, 60,'Vida Boss: '+ this.enemyfinalLife, {
        fontFamily: 'Verdana',
        fontSize: '22px',
        fill: 'Pink'
    }).setScrollFactor(0);
    
    if (this.cameras.main.deadzone){
        graphics = this.add.graphics().setScrollFactor(0);
        graphics.lineStyle(2, 0x00ff00, 1);
        graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);      
    }
    this.cursors = this.input.keyboard.createCursorKeys();
    
}
update() {
    
    //stop player when stop press the key
    this.player.body.setVelocity(0);
    
    this.keyA = this.input.keyboard.addKey(65);
    this.keyS = this.input.keyboard.addKey(83);
    this.keyD = this.input.keyboard.addKey(68);
    //keyboard press to move
   
    if (this.cursors.left.isDown ) {
        
        this.player.body.setVelocityX(-100);
      
    } else if (this.cursors.right.isDown) {
        
        this.player.body.setVelocityX(100);
     
    } else if (this.cursors.up.isDown ) {
       
        this.player.body.setVelocityY(-80);
    
    } else if (this.cursors.down.isDown) {
        
        this.player.body.setVelocityY(80);
    
    }
   
        //set animations per key pressed
    if ( this.cursors.left.isDown  ) {
       
        this.x = 1;
        this.player.anims.play("left", true);
 
       
    } else if (this.cursors.right.isDown) {
      
             this.x = 0;
        this.player.anims.play("right", true);
      
       
    } else if ( this.cursors.up.isDown ) {
        //its because when you go, you need see the back of your character
        this.player.anims.play("back", true);
    } else if (this.cursors.down.isDown ) {
        this.player.anims.play("front", true);
    }else if (this.keyA.isDown && this.depgolpeesq == 1 && this.x ==1 ) {
        
        this.player.anims.play("keyq1", true); 
    }else if (this.keyA.isDown && this.depgolpeesq == 1 && this.x==0 ) {
        
        this.player.anims.play("keyq", true); 
        
            
         
       
    }else if (this.keyS.isDown && this.depgolpeesq == 1 && this.x ==1  ) {
        
        this.player.anims.play("keys1", true); 
    }else if (this.keyS.isDown && this.depgolpeesq == 1 && this.x==0 ) {
         
        this.player.anims.play("keyS", true); 
        
         
             
          
        
    }else if (this.keyD.isDown && this.depgolpeesq == 1 && this.x ==1   ) {
        
        this.player.anims.play("keyd1", true); 
    }else if (this.keyD.isDown && this.depgolpeesq == 1 && this.x==0 ) {
         
        this.player.anims.play("keyd", true);
    }
    else if (this.cursors.space.isDown && this.life >=0) {
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
        const r = Math.random()*100 
            
            if (r <1) {
                if (!this.invincible) {
                    this.damage.play();
                    this.player.anims.play("damage")
                    this.invincible = true;
                    this.events.emit("hitEnemy", --this.life);
                    this.textTela.setText('Vidas: '+ this.life);
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
            
}
move(){
    const d = Phaser.Math.Distance.Between (
        this.enemyfinal.x,
        this.enemyfinal.y,
        this.player.x,
        this.player.y);
        
    if (d < 100 && this.enemyfinal.x<this.player.x ) {
        const randNumber = Math.floor(Math.random() * 3 + 1)
        
        switch(randNumber){
            case 1:
            this.state = this.ataque
            this.enemyfinal.anims.play("efinalgolpe1",true)
            this.time.addEvent({
            delay:1300,
            callback: () => {
                this.enemyfinal.anims.stop()
                this.enemyfinal.setVelocity(0)
               
            },
            callbackScope: this,
        })
               
                
            break
            case 2: 
            this.state = this.ataque
            this.enemyfinal.anims.play("efinalgolpe2",true)
            this.time.addEvent({
            delay:1300,
            callback: () => {
                this.enemyfinal.anims.stop()
                this.enemyfinal.setVelocity(0)
                
            },
            callbackScope: this,
        })
              
                break
           
            case 3: 
            this.state = this.defesa
            this.enemyfinal.anims.play("efinaldefesa",true)
           
            this.time.addEvent({
                delay:1300,
                callback: () => {
                    this.enemyfinal.anims.stop()
                    this.enemyfinal.setVelocity(0)
                    this.state = this.walking
                },
                callbackScope: this,
            })
               
                break
            default: 
                this.setVelocityX(0)
                this.enemyfinal.anims.stop()
                this.state = this.ataque
        }
        
    }else if(d < 100 && this.enemyfinal.x > this.player.x ){
        const randNumber = Math.floor(Math.random() * 3 + 1)
        switch(randNumber){
            case 1:
            this.state = this.ataque
            this.enemyfinal.anims.play("efinalgolpe",true)
            this.time.addEvent({
            delay:1300,
            callback: () => {
                this.enemyfinal.anims.stop()
                this.enemyfinal.setVelocity(0)
                this.state = this.walking
            },
            callbackScope: this,
        })
               
                
                break
            case 2: 
            this.state = this.ataque
            this.enemyfinal.anims.play("efinalgolpe3",true)
        this.time.addEvent({
            delay:1300,
            callback: () => {
                this.enemyfinal.anims.stop()
                this.enemyfinal.setVelocity(0)
                this.state = this.walking
            },
            callbackScope: this,
        })
              
                break
           
            case 3: 
            this.state = this.defesa
            this.enemyfinal.anims.play("efinaldefesa1",true)
            
            this.time.addEvent({
                delay:1300,
                callback: () => {
                    this.enemyfinal.anims.stop()
                    this.enemyfinal.setVelocity(0)
                    this.state = this.walking
                },
                callbackScope: this,
            })
               
                break
            default: 
                this.setVelocityX(0)
                this.enemyfinal.anims.stop()
        }
    } 
    else {
        if (this.state == this.walking) {
            if (d < 500) {
                const randNumberr = Math.floor(Math.random() * 4 + 1)
                switch(randNumberr){
            case 1:
               
                
                break
            case 2: 
              
                break
            case 3: 
            this.enemyfinal.setVelocityX(30)
            this.enemyfinal.anims.play("efinalb",true)
                
               
                break
            case 4: 
            this.enemyfinal.setVelocityX(-30)
            this.enemyfinal.anims.play("efinals",true)
                break
            default: 
                this.setVelocityX(30)
                this.enemyfinal.anims.stop()
            }
                if (this.enemyfinal.x < this.player.x  ) {
                    this.enemyfinal.setVelocityX(30)
                    this.enemyfinal.anims.play("efinald",true)            
                } else if(this.enemyfinal.x > this.player.x) {
                    this.enemyfinal.setVelocityX(-30)
                    this.enemyfinal.anims.play("efinale",true)
                } else{
                    this.enemyfinal.anims.stop();
                }
                
            } else {
                this.enemyfinal.anims.stop();
            }
            
        }    
    }
    
   
    
    /*const randNumber = Math.floor(Math.random() * 4 + 1)
    switch(randNumber){
        case 1:
            
            break
        case 2: 
        
            break
        case 3: 
            this.enemyfinal.setVelocityY(30)
            this.enemyfinal.anims.play("efinald",true)
            
           
            break
        case 4: 
            this.enemyfinal.setVelocityY(-30)
            this.enemyfinal.anims.play("efinale",true)
           
            break
        default: 
            this.enemyfinal.setVelocityX(30)
            this.enemyfinal.anims.stop()
    }*/
    if (Math.random(100) < 40) {
        if (d < 30 && (this.state != this.defesa) && this.keyD.isUp &&(this.keyA.isDown ||this.keyS.isDown)) {
            this.attack.play();
            this.enemyfinalLife = this.enemyfinalLife - 1;
            this.textTela2.setText('Vida Boss: '+ this.enemyfinalLife);
        } 
    }
    
    if (this.enemyfinalLife <= 0) {
        this.enemyfinal.anims.play("morte");
        this.enemyfinal.setVisible(false);
        this.enemyfinal.setActive(false);
        this.physics.pause();
        this.time.addEvent({
            delay:2000,
        callback: () => {
            this.scene.start("vitoria")
        },
        callbackScope: this,
    })
      
        this.life = 15
        this.enemyfinalLife = 1
        
    }
    if(this.life <= 0){
       this.player.body.setVelocity(0);
       
        
        
        this.player.anims.play("morto");
        this.physics.pause();
        this.time.addEvent({
        delay:2000,
        callback: () => {
            this.player.anims.play("morto");

            this.scene.start("derrota")
        },
        callbackScope: this,
    })
        this.enemyfinalLife = 15
        this.life = 1
    }
    

    
}
  hitEnemyfinal() {
    if (this.keyD.isDown) {
        this.player.anims.play("keyd", true);
    } else {
            
        if ((this.state ==this.ataque)) {
               
                if (!this.invincible) {
                    this.damage.play();
                    this.player.anims.play("damage")
                    this.invincible = true;
                    this.events.emit("hitEnemyfinal", --this.life);
                    this.textTela.setText('Vidas: '+ this.life);
                    this.time.delayedCall(
                        2000,
                        () => {
                          this.invincible = false;
                         
                        },
                        null,
                        this
                      );
            }
            
           
          }
        
    }
}



}