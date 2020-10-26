import Phaser from "phaser";
import BootScene from "./assets/js/scenes/BootScene";
import PlayGame from "./assets/js/scenes/PlayGame";
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
    dom: {
      createContainer: true,
    },
    scene: [
      BootScene,
      PlayGame,
    ],
    physics: {
      default: "arcade",
      arcade: {
        debug: true,
        gravity: {
          y: 0,
        },
      },
    },
  };
  
const game = new Phaser.Game(config);

