import { TransitionDirection } from "../types";
import { SPRITES, levels } from "../utility/constants";
import { levelsStrings } from "../utility/levelsAsString";
import { persistLevel } from "../utility/localStorage";
import { eventBus } from "../utility/signals";

export class LevelManager {
  game: Phaser.Game;
  main: Phaser.Scene;
  levels = levels;
  eventBus;
  points;
  starsSeen = 0;

  private currentLevel = 0;

  constructor(main: Phaser.Scene, game) {
    this.main = main;
    this.game = game;
    this.onLevelOver = this.onLevelOver.bind(this);
    this.loadNext = this.loadNext.bind(this);
    this.launchFirstLevel = this.launchFirstLevel.bind(this);
    this.createBackground = this.createBackground.bind(this);
    this.eventBus = eventBus;

    this.eventBus.addListener("updateStarsSeen", ([payload]) => {
      console.log("INFO: stars seen updated by", payload);
      this.starsSeen += payload;
      console.log("INFO: Now its", this.starsSeen);
    });

    this.eventBus.addListener("loadNextLevel", () => {
      console.log("INFO: Called loadNextLevel");
      if (this.currentLevel + 1 === this.levels.length) {
        console.log("INFO: This was the last level");
        game.scene.getScenes().forEach((s) => s.scene.stop());
        this.main.scene.launch("end_screen");
      } else {
        this.loadNext();
      }
    });

    this.eventBus.addListener("loadFirstLevel", ([index]) => {
      console.log("INFO: Index is ", index);
      this.launchFirstLevel(Number(index));

      eventBus.emit("playBGM");
    });

    this.eventBus.addListener("levelOver", () => {
      console.log("INFO: Called on levelOver");
      console.log("INFO: Current level is ", this.currentLevel);
      this.onLevelOver();
    });

    const loadHowToPlayListener = () => {
      this.loadHowToPlay();
      this.eventBus.removeListener(loadHowToPlayListener);
    };

    this.eventBus.addListener("loadHowToPlayPage", loadHowToPlayListener);
  }

  loadHowToPlay() {
    this.main.scene.stop("main_menu");
    this.main.scene.launch("how_to_play");
  }

  launchFirstLevel(index) {
    if (index) {
      this.currentLevel = index;
    } else {
      this.currentLevel = 0;
    }
    const onFadeToBlack = () => {
      console.log("INFO: Called onFadeToBlack");
      this.main.scene.stop("main_menu");
      this.main.scene.stop("how_to_play");
      this.main.scene.launch("score");
      this.main.scene.launch(this.levels[this.currentLevel]);
      this.eventBus.removeListener(onFadeToBlack);
    };
    this.eventBus.addListener("fadeToBlackComplete", onFadeToBlack);
    this.main.scene.launch("transition", {
      direction: TransitionDirection.IN,
    });
  }

  loadNext() {
    this.main.scene
      .stop(this.levels[this.currentLevel])
      .launch(this.levels[this.currentLevel + 1], {});
    this.main.scene.stop("level_over_ui");
    this.currentLevel += 1;
    persistLevel(String(this.currentLevel));
  }

  debugLoadLevel(index) {
    if (this.levels[index]) {
      this.main.scene
        .stop(this.levels[this.currentLevel])
        .launch(this.levels[index], {
          levelString: levelsStrings[index],
          stars: [],
        });

      this.currentLevel = index;
    }
  }

  onLevelOver() {
    this.main.scene.launch("level_over_ui");
  }

  createBackground() {
    const nebulae_01 = this.main.add.sprite(
      0,
      0,
      SPRITES.BACKGROUND.NEBULAE_01,
    );
    const nebulae_02 = this.main.add.sprite(
      0,
      0,
      SPRITES.BACKGROUND.NEBULAE_02,
    );
    const nebulae_03 = this.main.add.sprite(
      0,
      0,
      SPRITES.BACKGROUND.NEBULAE_03,
    );
    const stars_01 = this.main.add.sprite(0, 0, SPRITES.BACKGROUND.STARS_01);
    const stars_02 = this.main.add.sprite(0, 0, SPRITES.BACKGROUND.STARS_02);
    const frame = this.main.add
      .sprite(0, 0, SPRITES.BACKGROUND.FRAME)
      .setOrigin(0);

    const backgroundElements = [
      nebulae_01,
      nebulae_02,
      nebulae_03,
      stars_01,
      stars_02,
    ];
    backgroundElements.forEach((bgElement, index) => {
      bgElement.setOrigin(0);
      bgElement.setY(-bgElement.height);
      bgElement.setX(bgElement.x - bgElement.width / 4);
      this.main.tweens.add({
        targets: bgElement,
        y: 1440,
        duration: 35000 + index * 5000,
        repeat: -1,
      });
    });
  }
}
