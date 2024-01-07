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
      this.loadNext();
    });

    this.eventBus.addListener("loadFirstLevel", ([index]) => {
      console.log("Index is ", index);
      this.launchFirstLevel(Number(index));
    });

    this.eventBus.addListener("levelOver", () => {
      console.log("Called on levelOver");
      this.onLevelOver();
    });
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
        this.main.scene.launch(this.levels[this.currentLevel]);
      },
      fadeOutCallback: () => {},
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
