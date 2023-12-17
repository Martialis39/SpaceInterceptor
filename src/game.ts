import * as Phaser from 'phaser';
import Level from './levels/level.ts';
import LevelOver from './ui/index.ts';
import Level_01 from './levels/level_01.ts';
import Score from './ui/score.ts';


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
    index
    constructor ()
    {
        super()
        this.index = 0
        super('main');
    }

    create ()
    {

        const level = ['level_01', 'level_01']
        let current = this.scene.launch('level_01', {
            levelString: level_1_string,
            stars: level_1_stars
        })

        this.scene.launch('score')

        const scoreScene = this.scene.get('score') as Score

        if(scoreScene.setScore){
            window.doSth = scoreScene.setScore
        }

        this.scene.launch('level_over_ui', {
            callback: () => {
                this.scene.stop(level[this.index]).launch(level[this.index + 1]);

            }
        })
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 1280,
    height: 720,
    scene: [Main, Level, LevelOver, Level_01, Score],
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
};

const game = new Phaser.Game(config);