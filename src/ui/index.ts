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

  preload() {
    this.load.image("stt", "assets/star.png");
  }

  create() {
    const play = this.add
      .sprite(0, 0, SPRITES.BUTTONS.PLAY)
      .setInteractive()
      .setAlpha(0)
      .setScale(0.5, 0.5);
    //   .setOrigin(0, 0);
    const quit = this.add
      .sprite(0, 0, SPRITES.BUTTONS.QUIT)
      .setInteractive()
      .setAlpha(0)
      .setScale(0.5, 0.5);

    hBoxContainer({
      children: [quit, play],
      scene: this,
    });

    // Create a tween to gradually change the alpha from 0 to 1
    this.tweens.add({
      targets: [play, quit],
      alpha: 1,
      duration: 600, // Duration of the tween in milliseconds
      ease: "Linear", // Easing function, you can use others like 'Cubic', 'Elastic', etc.
    });
  }
}
