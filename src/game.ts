import * as Phaser from 'phaser';
import {createBases} from "./utility/creation.ts"
import Level1 from './levels/level_1.ts';
import BaseScene from './levels/base_level.ts';



export default class StarInterceptor extends Phaser.Scene
{

    private ship
    private cursors

    constructor ()
    {
        super('star_interceptor');
    }

    preload ()
    {
        this.load.image('ship', 'assets/ship.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('satellite', 'assets/satellite.png');
    }

    create ()
    {
        // const ship = this.add.container();
        // ship.setX(60)
        // ship.setY(60)




        this.cursors = this.input.keyboard.createCursorKeys();
        //  Create a Sprite via the group.

        //  The Sprite is added to the Scene display list, and to the group, at the same time.


        //  The above is a short-cut for:
        //  var sprite = this.add.sprite(400, 300, 'phaser');
        //  group.add(sprite);
        const shipSprite = this.add.sprite(0, 0, 'ship')
        shipSprite.scale = 0.5
        this.ship = shipSprite
        // const star = this.add.sprite(
        //     0, 10, 'star'
        // )
        // ship.add(star);

        this.physics.add.existing(this.ship)

        const level1 = new Level1('level_1')
        const s = level1.getSatellites()
        s.forEach(sat => {
            sat.on('pointerup', () => {
                // this.tweens.add({
                //     targets: this.ship,
                //     y: sat.y,
                //     x: sat.x,
                //     duration: 200,
                //     // ease: 'Sine.easeInOut',
                // });

                this.physics.add.collider(this.ship, sat, (s, _sat) => {
                    console.log("S is ", s)
                })
            })
        });
    }

    update ()
    {
        // this.ship.body.setVelocity(0);

        // if (this.cursors.left.isDown)
        // {
        //     this.ship.body.setVelocityX(-300);
        // }
        // else if (this.cursors.right.isDown)
        // {
        //     this.ship.body.setVelocityX(300);
        // }

        // if (this.cursors.up.isDown)
        // {
        //     this.ship.body.setVelocityY(-300);
        // }
        // else if (this.cursors.down.isDown)
        // {
        //     this.ship.body.setVelocityY(300);
        // }
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 1280,
    height: 720,
    scene: Level1,
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
};

const game = new Phaser.Game(config);