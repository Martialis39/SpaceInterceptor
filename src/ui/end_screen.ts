import * as Phaser from "phaser";
import { hBoxContainer, vBoxContainer } from "../utility/containers";
import { TEXT_STYLE } from "../utility/constants";
import { eventBus } from "../utility/signals";

export default class EndScreen extends Phaser.Scene {
  eventBus;
  starsSeen;
  finalScore;

  constructor() {
    super("end_screen");
    this.eventBus = eventBus;
  }

  init(data) {
    this.starsSeen = data.starsSeen;
    this.finalScore = data.finalScore;
  }

  create() {
    var labelText =
      "That's all for now! Thank you for playing! I hope you had fun!";

    var text = this.add.text(0, 0, labelText, TEXT_STYLE);

    const scoreText = this.add.text(
      0,
      0,
      `Your final score was ${this.finalScore}/${this.starsSeen}!`,
      {
        ...TEXT_STYLE,
        fontSize: "20px",
      },
    );

    var creditsText = this.add.text(
      0,
      0,
      "Game made by Mart Lepanen (github.com/Martialis39)",
      {
        ...TEXT_STYLE,
        fontSize: "20px",
      },
    );

    const vbox = vBoxContainer({
      children: [text, scoreText, creditsText],
      scene: this,
    });
    vbox.x = this.cameras.main.width / 2 - vbox.width / 2;
    vbox.y = this.cameras.main.height / 2 - vbox.height / 2;
  }
}
