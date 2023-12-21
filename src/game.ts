import * as Phaser from "phaser";
import Level from "./levels/level.ts";
import LevelOver from "./ui/index.ts";
import Level_01 from "./levels/level_01.ts";
import Score from "./ui/score.ts";
import { SPRITES } from "./utility/constants.ts";
import { createTextInput } from "./utility/creation.ts";
import { levelsStrings } from "./utility/levelsAsString.ts";
import Level_02 from "./levels/level_02.ts";
import Level_03 from "./levels/level_03.ts";

class Main extends Phaser.Scene {

  index;

  levels = ["level_01", "level_02", "level_03"];
  constructor() {
    super();
    this.index = 0;
    super("main");
    this.onLevelOver = this.onLevelOver.bind(this)
  }

  preload() {
    this.load.image(SPRITES.BUTTONS.PLAY, "assets/play_button.png");
    this.load.image(SPRITES.BUTTONS.QUIT, "assets/cross_button.png");

    this.load.image(SPRITES.BACKGROUND.SPACE_01, "assets/backgrounds/bg.png");
    this.load.image(SPRITES.BACKGROUND.NEBULAE_01, "assets/backgrounds/nebulae.png");
  }

  debugLoadLevel(index) {
    if(this.levels[index]){
        this.scene.stop(this.levels[this.index]).launch(this.levels[index], {
            levelString: levelsStrings[index],
            stars: [],
            callback: this.onLevelOver
        });

        this.index = index
    }

  }

  onLevelOver() {
    this.scene.launch("level_over_ui", {
      callback: () => {
        this.index += 1
        this.scene.stop(this.levels[this.index]).launch(this.levels[this.index + 1]);
      },
    });

  }

  create() {
     this.scene.launch("level_01", {
        callback: this.onLevelOver
    });

    if(process.env.DEBUG){
        createTextInput(this)
    }

    this.add.sprite(0, 0, "bg").setOrigin(0, 0);
    const neb = this.add.sprite(0, 0, "nebulae");
    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height / 2;
    neb.setX(x);
    neb.setY(y);

    this.tweens.add({
      targets: [neb],
      y: neb.y + 400,
      duration: 10000, // Duration of the tween in milliseconds
      ease: "Linear", // Easing function, you can use others like 'Cubic', 'Elastic', etc.
    });

    this.scene.launch("score");

  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 1280,
  height: 720,
  scene: [Main, Level, LevelOver, Score, Level_01, Level_02, Level_03],
  physics: {
    default: "arcade",
    arcade: { debug: true },
  },
};

const game = new Phaser.Game(config);
