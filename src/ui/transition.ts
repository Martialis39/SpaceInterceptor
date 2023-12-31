import * as Phaser from "phaser";
import { directions } from "../utility/constants";
import { TransitionDirection } from "../types";

export default class Transition extends Phaser.Scene {

    callback
    direction
    fadeOutCallback

    constructor() {
        super('transition')
    }

    init(data) {
        this.callback = data.callback
        this.direction = data.direction
        this.fadeOutCallback = data.fadeOutCallback
        this.fadeOut = this.fadeOut.bind(this)
    }

    fadeOut(graphics) {
        const target = { alpha: 1 };
        this.scene.bringToTop()
        this.tweens.add({
            targets: target,
            alpha: 0,
            duration: 1000,
            ease: 'Linear',
            onUpdate: () => {
                // Update the alpha of the rectangle during the tween
                graphics.setAlpha(target.alpha);
            },
            onComplete: () => {
                if(this.fadeOutCallback){
                    this.fadeOutCallback()
                }
            },
        })
    }

    create() {
        const width = this.cameras.main.width
        const height = this.cameras.main.height

        const rect = new Phaser.Geom.Rectangle(0, 0, width, height);

        const initialValue = this.direction === TransitionDirection.IN ? 0 : 1
        const finalValue = this.direction === TransitionDirection.IN ? 1 : 0

        const target = { alpha: initialValue };

        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000);

        graphics.setAlpha(initialValue)
        graphics.fillRectShape(rect);

        graphics.setDepth(100)

        console.log("Ran me, initial value", initialValue)

        this.tweens.add({
            targets: target,
            alpha: finalValue,
            duration: 1000,
            ease: 'Linear',
            onUpdate: () => {
                // Update the alpha of the rectangle during the tween
                graphics.setAlpha(target.alpha);
            },
            onComplete: () => {
                this.callback()
                this.fadeOut(graphics)
            },
        })
    }
}