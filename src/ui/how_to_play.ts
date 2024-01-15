import * as Phaser from "phaser";
import { vBoxContainer } from "../utility/containers";
import { SPRITES, TEXT_STYLE } from "../utility/constants";
import { eventBus } from "../utility/signals";
import { createButton } from "../utility/creation";

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
    var text = this.add.text(0, 0, labelText, TEXT_STYLE);
    const play = createButton(this, SPRITES.BUTTONS.PLAY);

    play.on("pointerdown", () => {
      eventBus.emit("loadFirstLevel", [0]);
    });

    const vbox = vBoxContainer({ children: [text, play], scene: this });
    vbox.x = this.cameras.main.width / 2 - vbox.width / 2;
    vbox.y = this.cameras.main.height / 2 - vbox.height / 2;
  }
}
