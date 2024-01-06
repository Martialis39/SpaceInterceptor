import { TransitionDirection } from "../types";
import { levels } from "../utility/constants";
import { levelsStrings } from "../utility/levelsAsString";
import { persistLevel } from "../utility/localStorage";

export class LevelManager {
  main;
  private currentLevel = 0;
  levels = levels;
  constructor(main) {
    this.main = main;
    this.onLevelOver = this.onLevelOver.bind(this);
    this.loadNext = this.loadNext.bind(this);
    this.launchFirstLevel = this.launchFirstLevel.bind(this);
  }

  launchFirstLevel(index) {
    if (index) {
      this.currentLevel = index;
    } else {
      this.currentLevel = 0;
    }
    this.main.scene.launch("transition", {
      direction: TransitionDirection.IN,
      callback: () => {
        this.main.scene.stop("main_menu");
        this.main.scene.launch("score");
        this.main.scene.launch(this.levels[this.currentLevel], {
          callback: this.onLevelOver,
        });
      },
      fadeOutCallback: () => {},
    });
  }

  loadNext() {
    this.main.scene
      .stop(this.levels[this.currentLevel])
      .launch(this.levels[this.currentLevel + 1], {
        callback: this.onLevelOver,
      });
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
          callback: this.onLevelOver,
        });

      this.currentLevel = index;
    }
  }

  onLevelOver() {
    this.main.scene.launch("level_over_ui", {
      callback: this.loadNext,
    });
  }
}