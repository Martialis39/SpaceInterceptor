import * as Phaser from "phaser";
import { hBoxContainer, vBoxContainer } from "../utility/containers";
import { SPRITES, TEXT_STYLE } from "../utility/constants";
import { getPersistedLevel } from "../utility/localStorage";
import { eventBus } from "../utility/signals";

export default class EndScreen extends Phaser.Scene {
  eventBus;

  constructor() {
    super("end_screen");
  }

  init(data) {
    this.eventBus = eventBus;
  }

  create() {
    var labelText =
      "That's all for now! Thank you for playing! I hope you had fun!";

    var text = this.add.text(0, 0, labelText, TEXT_STYLE);

    var creditsText = this.add.text(
      0,
      0,
      "Game made by Mart Lepanen (github.com/Martialis39)",
      {
        ...textStyle,
        fontSize: "20px",
      },
    );

    const vbox = vBoxContainer({ children: [text, creditsText], scene: this });
    vbox.x = this.cameras.main.width / 2 - vbox.width / 2;
    vbox.y = this.cameras.main.height / 2 - vbox.height / 2;
  }
}
