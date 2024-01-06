import * as Phaser from "phaser";
import Score from "./ui/score.ts";
import { SFX, SPRITES, levels } from "./utility/constants.ts";
import { createTextInput } from "./utility/creation.ts";
import { levelsStrings } from "./utility/levelsAsString.ts";
import { TransitionDirection } from "./types/index.ts";
import { persistLevel } from "./utility/localStorage.ts";
// Menus and utility
import MainMenu from "./ui/main_menu.ts";
import Continue from "./ui/continue.ts";
import LevelOver from "./ui/index.ts";
import Transition from "./ui/transition.ts";
// Levels 
import Level from "./levels/level.ts";
import Level_01 from "./levels/level_01.ts";
import Level_02 from "./levels/level_02.ts";
import Level_03 from "./levels/level_03.ts";
import Level_04 from "./levels/level_04.ts";
import { Level_05, Level_06, Level_07, Level_08, Level_09, Level_10 } from "./levels/remaining_levels.ts";

class Main extends Phaser.Scene {
  index;

  levels = levels

  constructor() {
    super("main");
    this.index = 0;
    this.onLevelOver = this.onLevelOver.bind(this);
    this.launchFirstLevel = this.launchFirstLevel.bind(this);
  }

  preload() {
    this.load.image(SPRITES.BUTTONS.PLAY, "assets/play_button.png");
    this.load.image(SPRITES.BUTTONS.QUIT, "assets/cross_button.png");
    this.load.image(SPRITES.BUTTONS.FULLSCREEN, "assets/fullscreen_btn.png");

    this.load.image(SPRITES.BACKGROUND.SPACE_01, "assets/backgrounds/bg.png");
    this.load.image(
      SPRITES.BACKGROUND.NEBULAE_01,
      "assets/backgrounds/nebulae.png",
    );

    this.load.audio(SFX.MENU.CONFIRM, "assets/sfx/blip_01.wav");
  }

  debugLoadLevel(index) {
    if (this.levels[index]) {
      this.scene.stop(this.levels[this.index]).launch(this.levels[index], {
        levelString: levelsStrings[index],
        stars: [],
        callback: this.onLevelOver,
      });

      this.index = index;
    }
  }

  launchFirstLevel(index?: number) {
    if(index){
        this.index = index
    } else {
        this.index = 0;
    }
    this.scene.launch("transition", {
      direction: TransitionDirection.IN,
      callback: () => {
        this.scene.stop("main_menu");
        this.scene.launch("score");
        this.scene.launch(this.levels[this.index], {
          callback: this.onLevelOver,
        });
      },
      fadeOutCallback: () => {},
    });
  }

  onLevelOver() {
    this.scene.launch("level_over_ui", {
      callback: () => {
        this.scene
          .stop(this.levels[this.index])
          .launch(this.levels[this.index + 1], {
            callback: this.onLevelOver,
          });
        this.scene.stop("level_over_ui");
        this.index += 1;
        persistLevel(String(this.index))
      },
    });
  }

  create() {
    this.scene.launch("main_menu", {
      callback: (index) => {
        this.launchFirstLevel(index);
      },
      game,
    });

    if (process.env.DEBUG) {
      createTextInput(this);
    }

    this.add.sprite(0, 0, SPRITES.BACKGROUND.SPACE_01).setOrigin(0, 0);
    const neb = this.add.sprite(0, 0, SPRITES.BACKGROUND.NEBULAE_01);
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
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 1280,
  height: 720,
  scene: [
    Main,
    MainMenu,
    Level,
    LevelOver,
    Transition,
    Continue,
    Score,
    Level_01,
    Level_02,
    Level_03,
    Level_04,
    Level_05,
    Level_06,
    Level_07,
    Level_08,
    Level_09,
    Level_10
  ],
  physics: {
    default: "arcade",
    arcade: { debug: true },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);
