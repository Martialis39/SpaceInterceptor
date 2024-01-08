import { TransitionDirection } from "../types";
import { levels } from "../utility/constants";
import { levelsStrings } from "../utility/levelsAsString";
import { persistLevel } from "../utility/localStorage";
import { eventBus } from "../utility/signals";

export class LevelManager {
  main;
  private currentLevel = 0;
  levels = levels;
  eventBus;
  constructor(main) {
    this.main = main;
    this.onLevelOver = this.onLevelOver.bind(this);
    this.loadNext = this.loadNext.bind(this);
    this.launchFirstLevel = this.launchFirstLevel.bind(this);
    this.eventBus = eventBus;

    this.eventBus.addListener("loadNextLevel", () => {
      console.log("Called loadNextLevel");
      if (this.currentLevel + 1 === this.levels.length) {
        console.log("INFO: This was the last level");
        this.main.scene.launch("end_screen");
      } else {
        this.loadNext();
      }
    });

    this.eventBus.addListener("loadFirstLevel", ([index]) => {
      console.log("Index is ", index);
      this.launchFirstLevel(Number(index));
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
      console.log("Called onFadeToBlack");
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
}
