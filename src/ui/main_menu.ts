
import * as Phaser from "phaser";
import { hBoxContainer, vBoxContainer } from "../utility/containers";
import { SPRITES } from "../utility/constants";
import { easeInOutBack } from "../utility/easing";

export default class MainMenu extends Phaser.Scene {

    callback

    constructor() {
        super("main_menu");
        this.fadeOut = this.fadeOut.bind(this)
    }

    preload() {
        this.load.image(SPRITES.BUTTONS.PLAY, "assets/play_button.png");
        this.load.image(SPRITES.BUTTONS.QUIT, "assets/cross_button.png");
    }

    init(data) {
        this.callback = data.callback
    }

    fadeOut() {
        const cs = this.children.getChildren()
        cs.forEach(child => {
            this.tweens.add({
                targets: child,
                alpha: 0,
                ease: 'linear',
                duration: 400,
            });
        })
    }

    create() {

        const play = this.add
            .sprite(0, 0, SPRITES.BUTTONS.PLAY)
            .setInteractive()
            .setAlpha(1)
            .setScale(0.5, 0.5);

        play.on('pointerdown', () => {
            if (this.callback) {
                this.callback()
                this.fadeOut()
            }
        })

        const quit = this.add
            .sprite(0, 0, SPRITES.BUTTONS.QUIT)
            .setInteractive()
            .setAlpha(1)
            .setScale(0.5, 0.5);

        [play, quit].forEach((btn) => {
            btn.on('pointerover', () => {
                this.tweens.add({
                    targets: btn,
                    y: btn.y - 6,
                    ease: easeInOutBack,
                    duration: 200,
                });
            })
            btn.on('pointerout', () => {
                this.tweens.add({
                    targets: btn,
                    y: btn.y + 6,
                    ease: easeInOutBack,
                    duration: 200,
                });
            })
        })

        var labelText = "Space Interceptor"
        var textStyle = { fontSize: "48px", fontFamily: 'FFFForward', color: '#fafafa' }; // Set your desired text style
        var text = this.add.text(0, 0, labelText, textStyle);

        const vbox = vBoxContainer({ children: [text, play, quit], scene: this })
        vbox.x = this.cameras.main.width / 2 - vbox.width / 2
        vbox.y = this.cameras.main.height / 2 - vbox.height / 2
    }
}
