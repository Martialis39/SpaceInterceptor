import * as Phaser from 'phaser'
import { hBoxContainer, vBoxContainer } from '../utility/containers';
import { SPRITES } from '../utility/constants';

export default class Continue extends Phaser.Scene {
  callback;

  constructor() {
    super("continue");
  }

  init(data) {
    this.callback = data.callback
  }

  create() {
    var labelText = "There is a save game from a previous session. Would you like to continue?";
    var textStyle = {
      fontSize: "36px",
      fontFamily: "FFFForward",
      color: "#fafafa",
      wordWrap: { width: this.cameras.main.width / 2, useAdvancedWrap: false }
    }; // Set your desired text style
    var text = this.add.text(0, 0, labelText, textStyle);
    const play = this.add
      .sprite(0, 0, SPRITES.BUTTONS.PLAY)
      .setInteractive()
      .setAlpha(1)
      .setScale(0.5, 0.5);

    const quit = this.add
      .sprite(0, 0, SPRITES.BUTTONS.QUIT)
      .setInteractive()
      .setAlpha(1)
      .setScale(0.5, 0.5);

    var continueText = this.add.text(0, 0, 'Continue', { ...textStyle, fontSize: "24px" });
    var quitText = this.add.text(0, 0, 'Quit', { ...textStyle, fontSize: "24px" });

    const hbox1 = hBoxContainer({children: [continueText, play], scene: this})
    const hbox2 = hBoxContainer({children: [quitText, quit], scene: this})

    const vbox = vBoxContainer({ children: [text, hbox1, hbox2], scene: this })
    vbox.x = this.cameras.main.width / 2 - vbox.width / 2;
    vbox.y = this.cameras.main.height / 2 - vbox.height / 2;

  }


}
