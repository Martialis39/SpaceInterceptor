import * as Phaser from "phaser";
import { hBoxContainer, vBoxContainer } from "../utility/containers";
import { SFX, SPRITES, TEXT_STYLE } from "../utility/constants";
import { easeInOutBack } from "../utility/easing";
import { getPersistedLevel } from "../utility/localStorage";
import { eventBus } from "../utility/signals";
import { createButton } from "../utility/creation";

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
    const play = createButton(this, SPRITES.BUTTONS.PLAY);
    play.on("pointerdown", () => {
      this.scene.stop("main_menu");

      const persistedLevel = getPersistedLevel();

      if (persistedLevel) {
        this.scene.launch("continue");
      } else {
        this.eventBus.emit("loadFirstLevel", [0]);
      }
    });

    const howToPlay = createButton(this, SPRITES.BUTTONS.HOW_TO_PLAY);

    howToPlay.on("pointerdown", () => {
      this.eventBus.emit("loadHowToPlayPage", [0]);
    });

    const fs = createButton(this, SPRITES.BUTTONS.FULLSCREEN);

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

    var labelText = "Space Interceptor";
    var text = this.add.text(0, 0, labelText, {
      ...TEXT_STYLE,
      fontSize: "48px",
    });
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
