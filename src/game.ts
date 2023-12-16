import * as Phaser from 'phaser';
import Level from './levels/level.ts';


const level_1_string = `
---U---
-------
-B---B-
-------
---D---
`

const level_1_stars = [{"position":{"x":640,"y":0},"dir":{"x":0,"y":1},"time":1100},{"position":{"x":640,"y":720},"dir":{"x":0,"y":-1},"time":3300},{"position":{"x":640,"y":0},"dir":{"x":0,"y":1},"time":5300},{"position":{"x":640,"y":720},"dir":{"x":0,"y":-1},"time":7600}]

class Main extends Phaser.Scene
{
    constructor ()
    {
        super('main');
    }

    create ()
    {
        this.scene.launch('level', {
            levelString: level_1_string,
            stars: level_1_stars
        })
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 1280,
    height: 720,
    scene: [Main, Level],
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
};

const game = new Phaser.Game(config);