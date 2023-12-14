import * as Phaser from 'phaser';
import {createBases} from "./utility/creation.ts"
import Level from './levels/level.ts';
import BaseScene from './levels/base_level.ts';


const level_1_string = `
---U---
-------
-B---B-
-------
---D---
`
class Main extends Phaser.Scene
{
    constructor ()
    {
        super('main');
    }

    create ()
    {
        this.scene.launch('level', {
            levelString: level_1_string
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