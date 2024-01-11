import * as Phaser from "phaser";
import { SPRITES } from "../utility/constants";
import { eventBus } from "../utility/signals";

export default class LevelOver extends Phaser.Scene {
  container;
  signals;
  constructor() {
    super("level_over_ui");
    this.signals = eventBus;
  }

  create() {
    const play = this.add
      .sprite(0, 0, SPRITES.BUTTONS.PLAY)
      .setInteractive()
      .setAlpha(0)
      .setScale(0.5, 0.5)
      .setOrigin(0.5);

    play.on("pointerdown", () => {
      this.signals.emit("loadNextLevel");
    });

    play.x = this.cameras.main.width / 2;
    play.y = this.cameras.main.height / 2;

    this.tweens.add({
      targets: play,
      alpha: 1,
      duration: 600, // Duration of the tween in milliseconds
      ease: "Linear", // Easing function, you can use others like 'Cubic', 'Elastic', etc.
    });
  }
}
