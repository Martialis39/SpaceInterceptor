import * as Phaser from "phaser";
import { easeInOutBack } from "../utility/easing";
import { SPRITES } from "../utility/constants";
import { hBoxContainer } from "../utility/containers";

export default class LevelOver extends Phaser.Scene {
  container;
  callback;
  constructor() {
    super("level_over_ui");
  }

  init(data) {
    this.callback = data.callback;
  }

  create() {
    const play = this.add
      .sprite(0, 0, SPRITES.BUTTONS.PLAY)
      .setInteractive()
      .setAlpha(0)
      .setScale(0.5, 0.5);

    const quit = this.add
      .sprite(0, 0, SPRITES.BUTTONS.QUIT)
      .setInteractive()
      .setAlpha(0)
      .setScale(0.5, 0.5);

    const hbox = hBoxContainer({
      children: [quit, play],
      scene: this,
    });

    play.on("pointerdown", () => {
      this.callback();
    });

    hbox.x = this.cameras.main.width / 2 - hbox.width / 2;
    hbox.y = this.cameras.main.height / 2 - hbox.height / 2;

    this.tweens.add({
      targets: [play, quit],
      alpha: 1,
      duration: 600, // Duration of the tween in milliseconds
      ease: "Linear", // Easing function, you can use others like 'Cubic', 'Elastic', etc.
    });
  }
}
