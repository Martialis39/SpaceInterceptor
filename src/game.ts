import * as Phaser from "phaser";
import Score from "./ui/score.ts";
import { BGM, SFX, SPRITES } from "./utility/constants.ts";
import { createTextInput, cleanupDebug } from "./utility/creation.ts";
// Menus and utility
import MainMenu from "./ui/main_menu.ts";
import Continue from "./ui/continue.ts";
import LevelOver from "./ui/level_over_ui.ts";
import Transition from "./ui/transition.ts";
// Levels
import Level from "./levels/level.ts";
import Level_01 from "./levels/level_01.ts";
import Level_02 from "./levels/level_02.ts";
import Level_03 from "./levels/level_03.ts";
import Level_04 from "./levels/level_04.ts";
import {
  Level_05,
  Level_06,
  Level_07,
  Level_08,
  Level_09,
  Level_10,
} from "./levels/remaining_levels.ts";
import { LevelManager } from "./levels/levelManager.ts";
import EndScreen from "./ui/end_screen.ts";
import HowToPlay from "./ui/how_to_play.ts";
import { SoundManager } from "./utility/soundManager.ts";

class Main extends Phaser.Scene {
  levelManager;
  soundManager;
  constructor() {
    super("main");
  }

  preload() {
    this.load.image(SPRITES.BUTTONS.PLAY, "assets/play_button.png");
    this.load.image(SPRITES.BUTTONS.QUIT, "assets/cross_button.png");
    this.load.image(SPRITES.BUTTONS.FULLSCREEN, "assets/fullscreen_btn.png");
    this.load.image(SPRITES.BUTTONS.HOW_TO_PLAY, "assets/question_btn.png");

    this.soundManager = new SoundManager(this, game);
    this.levelManager = new LevelManager(this, game);

    this.load.image(SPRITES.BACKGROUND.FRAME, "assets/backgrounds/frame.png");
    this.load.image(
      SPRITES.BACKGROUND.NEBULAE_01,
      "assets/backgrounds/nebulae_01.png",
    );
    this.load.image(
      SPRITES.BACKGROUND.NEBULAE_02,
      "assets/backgrounds/nebulae_02.png",
    );
    this.load.image(
      SPRITES.BACKGROUND.NEBULAE_03,
      "assets/backgrounds/nebulae_03.png",
    );
    this.load.image(
      SPRITES.BACKGROUND.STARS_01,
      "assets/backgrounds/stars_01.png",
    );
    this.load.image(
      SPRITES.BACKGROUND.STARS_02,
      "assets/backgrounds/stars_02.png",
    );

    this.load.audio(SFX.MENU.CONFIRM, "assets/sfx/blip_01.wav");
    this.load.audio(SFX.SHIP.TURN, "assets/sfx/spaceEngineSmall_000.ogg");
    this.load.audio(SFX.SHIP.MOVE, "assets/sfx/laserSmall_003.ogg");
    this.load.audio(SFX.SHIP.PICKUP, "assets/sfx/coin_pickup.wav");

    this.load.audio(BGM.TRACK_01, "assets/bgm/ambient_space_01.wav");
  }

  create() {
    this.levelManager.createBackground();
    this.scene.launch("main_menu", { game });

    if (process.env.DEBUG) {
      console.log("Called with debug");
      console.log(process.env.DEBUG);
      createTextInput(this);
    } else {
      console.log("Called without debug");
      console.log(process.env.DEBUG);
      cleanupDebug();
    }
  }
}

const debug = process.env.DEBUG;

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#000",
  width: 1280,
  height: 720,
  scene: [
    Main,
    MainMenu,
    Level,
    LevelOver,
    Transition,
    HowToPlay,
    EndScreen,
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
    Level_10,
  ],
  physics: {
    default: "arcade",
    arcade: { debug: debug },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);
