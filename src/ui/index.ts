import * as Phaser from "phaser";
import { easeInOutBack } from "../utility/easing";

const SOME_PADDING = 40
const INITIAL_OFFSET = 100
const TEXT_STYLE = { font: "24px FFFForward", fill: "#f0f0f0" }; // Set your desired text style

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
        this.load.image('nineS', 'assets/nine_slice_button.png')
    }

    create() {

        const x = this.cameras.main.width / 2
        const y = this.cameras.main.height / 2
        // Create a container
        var container = this.add.container(x, y + INITIAL_OFFSET);

        // trying nine patch, initial width and height are random
        const box = this.add.nineslice(0, 0, 'nineS', 0, 300, 300, 50, 50, 50, 50)
        container.add(box);


        // Create text button
        var btnText = this.add.text(0, 0, 'Next level', TEXT_STYLE).setInteractive()
        container.add(btnText)

        // Resize the box based on the text width and height
        var textWidth = btnText.width + SOME_PADDING;
        var textHeight = btnText.height + SOME_PADDING;

        box.setSize(textWidth, textHeight);

        // Center text within box
        btnText.setX(-btnText.width / 2)
        btnText.setY(-btnText.height / 2)

        // Set the initial alpha to 0
        container.setAlpha(0);


        // Create a tween to gradually change the alpha from 0 to 1
        this.tweens.add({
            targets: container,
            alpha: 1,
            duration: 600, // Duration of the tween in milliseconds
            ease: 'Linear', // Easing function, you can use others like 'Cubic', 'Elastic', etc.
        });

        this.tweens.add({
            targets: container,
            y: y,
            ease: easeInOutBack,
            duration: 800
        })
    }
}
