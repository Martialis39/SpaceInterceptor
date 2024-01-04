import * as Phaser from "phaser";
import { hBoxContainer, vBoxContainer } from "../utility/containers";
import { SPRITES } from "../utility/constants";
import { easeInOutBack } from "../utility/easing";

export default class MainMenu extends Phaser.Scene {
  callback;

  constructor() {
    super("main_menu");
  }

  preload() {
    this.load.image(SPRITES.BUTTONS.PLAY, "assets/play_button.png");
    this.load.image(SPRITES.BUTTONS.QUIT, "assets/cross_button.png");
  }

  init(data) {
    this.callback = data.callback.bind(this);
    this.game = data.game;
  }

  create() {
    const play = this.add
      .sprite(0, 0, SPRITES.BUTTONS.PLAY)
      .setInteractive()
      .setAlpha(1)
      .setScale(0.5, 0.5);

    play.on("pointerdown", () => {
      if (this.callback) {
        console.log("here now 2");
        this.callback();
      }
    });

    const quit = this.add
      .sprite(0, 0, SPRITES.BUTTONS.QUIT)
      .setInteractive()
      .setAlpha(1)
      .setScale(0.5, 0.5);

    const fs = this.add
      .sprite(0, 0, SPRITES.BUTTONS.FULLSCREEN)
      .setInteractive()
      .setAlpha(1)
      .setScale(0.5, 0.5);

    fs.on("pointerdown", () => {
      this.game.scale.startFullscreen();
    });

    [play, quit, fs].forEach((btn) => {
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

    const vbox = vBoxContainer({ children: [text, play, quit], scene: this });
    vbox.x = this.cameras.main.width / 2 - vbox.width / 2;
    vbox.y = this.cameras.main.height / 2 - vbox.height / 2;

    fs.x = this.cameras.main.width - fs.displayWidth;
    fs.y = 0 + fs.displayHeight;

    window.fs = fs;
  }
}
