import * as Phaser from "phaser";
import { hBoxContainer, vBoxContainer } from "../utility/containers";
import { SPRITES, TEXT_STYLE } from "../utility/constants";
import { getPersistedLevel } from "../utility/localStorage";
import { eventBus } from "../utility/signals";

export default class Continue extends Phaser.Scene {
  eventBus;

  constructor() {
    super("continue");
  }

  init(data) {
    this.eventBus = eventBus;
  }

  create() {
    var labelText =
      "There is a save game from a previous session. Would you like to continue?";
    var text = this.add.text(0, 0, labelText, TEXT_STYLE);
    const play = this.add
      .sprite(0, 0, SPRITES.BUTTONS.PLAY)
      .setInteractive()
      .setAlpha(1)
      .setScale(0.5, 0.5);

    play.on("pointerdown", () => {
      this.scene.stop("continue");
      const persistedLevel = getPersistedLevel();
      console.log("persisted level is", persistedLevel);
      eventBus.emit("loadFirstLevel", [persistedLevel]);
    });

    const quit = this.add
      .sprite(0, 0, SPRITES.BUTTONS.QUIT)
      .setInteractive()
      .setAlpha(1)
      .setScale(0.5, 0.5);

    quit.on("pointerdown", () => {
      this.scene.stop("continue");
      eventBus.emit("loadFirstLevel", [0]);
    });

    var continueText = this.add.text(0, 0, "Continue", {
      ...TEXT_STYLE,
      fontSize: "24px",
    });
    var quitText = this.add.text(0, 0, "Quit", {
      ...TEXT_STYLE,
      fontSize: "24px",
    });

    const hbox1 = hBoxContainer({
      children: [continueText, play],
      scene: this,
    });
    const hbox2 = hBoxContainer({ children: [quitText, quit], scene: this });

    const vbox = vBoxContainer({ children: [text, hbox1, hbox2], scene: this });
    vbox.x = this.cameras.main.width / 2 - vbox.width / 2;
    vbox.y = this.cameras.main.height / 2 - vbox.height / 2;
  }
}
