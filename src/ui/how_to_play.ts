import * as Phaser from "phaser";
import { vBoxContainer } from "../utility/containers";
import { SPRITES } from "../utility/constants";
import { eventBus } from "../utility/signals";

export default class HowToPlay extends Phaser.Scene {
  eventBus;

  constructor() {
    super("how_to_play");
    this.eventBus = eventBus;
  }

  create() {
    var labelText = `
    Collect as many stars as you can by flying from satellite to satellite.\nClick on a satellite to fly to it!
    `.trim();
    var textStyle = {
      fontSize: "20px",
      fontFamily: "FFFForward",
      color: "#fafafa",
      wordWrap: { width: this.cameras.main.width / 2, useAdvancedWrap: false },
    }; // Set your desired text style
    var text = this.add.text(0, 0, labelText, textStyle);
    const play = this.add
      .sprite(0, 0, SPRITES.BUTTONS.PLAY)
      .setInteractive()
      .setAlpha(1)
      .setScale(0.5, 0.5);

    play.on("pointerdown", () => {
      eventBus.emit("loadFirstLevel", [0]);
    });

    const vbox = vBoxContainer({ children: [text, play], scene: this });
    vbox.x = this.cameras.main.width / 2 - vbox.width / 2;
    vbox.y = this.cameras.main.height / 2 - vbox.height / 2;
  }
}
