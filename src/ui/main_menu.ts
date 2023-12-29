
import * as Phaser from "phaser";
import { vBoxContainer } from "../utility/containers";
import { SPRITES } from "../utility/constants";

export default class MainMenu extends Phaser.Scene {

    callback

    constructor() {
        super("main_menu");
    }

    preload() {
        this.load.image(SPRITES.BUTTONS.PLAY, "assets/play_button.png");
        this.load.image(SPRITES.BUTTONS.QUIT, "assets/cross_button.png");
    }

    init(data) {
        this.callback = data.callback
    }

    create() {

        const play = this.add
            .sprite(0, 0, SPRITES.BUTTONS.PLAY)
            .setInteractive()
            .setAlpha(1)
            .setScale(0.5, 0.5);
        //   .setOrigin(0, 0);
        const quit = this.add
            .sprite(0, 0, SPRITES.BUTTONS.QUIT)
            .setInteractive()
            .setAlpha(1)
            .setScale(0.5, 0.5);

        var labelText = "Space Interceptor"
        var textStyle = { fontSize: "48px", fontFamily: 'FFFForward', color: '#000000' }; // Set your desired text style
        var text = this.add.text(0, 0, labelText, textStyle);

        const vbox = vBoxContainer({ children: [text, play, quit], scene: this })
        vbox.x = this.cameras.main.width / 2 - vbox.width / 2
        vbox.y = this.cameras.main.height / 2 - vbox.height / 2
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0x00ff00); // Green color, 2-pixel line
        graphics.strokeRect(vbox.x, vbox.y, vbox.width, vbox.height);

    }
}
