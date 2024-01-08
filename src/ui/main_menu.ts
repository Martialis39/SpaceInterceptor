import * as Phaser from "phaser";
import { hBoxContainer, vBoxContainer } from "../utility/containers";
import { SFX, SPRITES } from "../utility/constants";
import { easeInOutBack } from "../utility/easing";
import { getPersistedLevel } from "../utility/localStorage";
import { eventBus } from "../utility/signals";

export default class MainMenu extends Phaser.Scene {
  eventBus;
  constructor() {
    super("main_menu");
    this.eventBus = eventBus;
  }

  init(data) {
    this.game = data.game;
  }

  create() {
    const play = this.add
      .sprite(0, 0, SPRITES.BUTTONS.PLAY)
      .setInteractive()
      .setAlpha(1)
      .setScale(0.5, 0.5);

    play.on("pointerdown", () => {
      this.scene.stop("main_menu");

      const persistedLevel = getPersistedLevel();

      if (persistedLevel) {
        this.scene.launch("continue");
      } else {
        this.eventBus.emit("loadFirstLevel", [0]);
      }
    });

    const howToPlay = this.add
      .sprite(0, 0, SPRITES.BUTTONS.HOW_TO_PLAY)
      .setInteractive()
      .setAlpha(1)
      .setScale(0.5, 0.5);

    howToPlay.on("pointedown", () => {});

    const fs = this.add
      .sprite(0, 0, SPRITES.BUTTONS.FULLSCREEN)
      .setInteractive()
      .setAlpha(1)
      .setScale(0.5, 0.5);

    const confirmSFX = this.sound.add(SFX.MENU.CONFIRM);

    fs.on("pointerdown", () => {
      this.game.scale.startFullscreen();
    });

    play.on("pointerdown", () => {
      confirmSFX.play();

      this.tweens.add({
        targets: play,
        y: play.y + 6,
        ease: easeInOutBack,
        duration: 100,
        yoyo: true,
      });
    });

    [play, howToPlay, fs].forEach((btn) => {
      btn.on("pointerover", () => {
        this.tweens.add({
          targets: btn,
          y: btn.y - 6,
          ease: easeInOutBack,
          duration: 200,
        });
      });

      btn.on("pointerout", () => {
        this.tweens.add({
          targets: btn,
          y: btn.y + 6,
          ease: easeInOutBack,
          duration: 200,
        });
      });
    });

    var labelText = "Space Interceptor";
    var textStyle = {
      fontSize: "48px",
      fontFamily: "FFFForward",
      color: "#fafafa",
    }; // Set your desired text style
    var text = this.add.text(0, 0, labelText, textStyle);
    const vbox = vBoxContainer({
      children: [text, play, howToPlay],
      scene: this,
    });
    vbox.x = this.cameras.main.width / 2 - vbox.width / 2;
    vbox.y = this.cameras.main.height / 2 - vbox.height / 2;
    fs.x = this.cameras.main.width - fs.displayWidth;
    fs.y = 0 + fs.displayHeight;
  }
}
