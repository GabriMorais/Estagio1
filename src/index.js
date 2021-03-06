import Phaser from "phaser";
import BootScene from "./assets/js/scenes/BootScene";
import Menu from "./assets/js/scenes/Menu";
import controles from "./assets/js/scenes/controles";
import PlayGame from "./assets/js/scenes/PlayGame";
import vitoria from "./assets/js/scenes/vitoria";
import derrota from "./assets/js/scenes/derrota";
const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 700,
    height: 500,
    scale: {
      // Fit to window
      mode: Phaser.Scale.FIT,
      // Center vertically and horizontally
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    
    scene: [
      BootScene,
      Menu,
      controles,
      PlayGame,
      vitoria,
      derrota
    ],
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
        gravity: {
          y: 0,
        },
      },
    },
  };
  
const game = new Phaser.Game(config);

