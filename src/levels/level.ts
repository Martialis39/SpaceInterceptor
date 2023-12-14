import * as Phaser from 'phaser';
import { createBases, getBasesFromStrings, parseLevelString } from '../utility/creation';
import { directions } from '../utility/constants';


export default class Level extends Phaser.Scene {
    satellites;
    ship;
    levelString;

    constructor ()
    {
        super('level');
    }

    init (data)
    {
        this.levelString = data.levelString
    }

    preload ()
    {
        this.load.image('satellite', 'assets/satellite.png');
        this.load.image('ship', 'assets/ship.png');
    }

    getSatellites ()
    {

        return this.satellites
    }

    create ()
    {

        const levelAsString = parseLevelString({
            levelString: this.levelString,
            height: this.cameras.main.height,
            width: this.cameras.main.width,
            directions: directions
        })
        const things = getBasesFromStrings(levelAsString)
        const s = createBases(this, things)
        const shipSprite = this.add.sprite(
            s[0].x,
            s[0].y,
            'ship'
        )
        shipSprite.scale = 0.5
        this.ship = shipSprite

        this.ship.setX(s[0].x)
        this.ship.setY(s[0].y)

        this.satellites = s

        s.forEach(sat => {
            sat.on('pointerdown', () => {
                this.tweens.add({
                    targets: this.ship,
                    y: sat.y,
                    x: sat.x,
                    duration: 200,
                });

                this.physics.add.collider(this.ship, sat, (s, _sat) => {
                    console.log("S is ", s)
                })
            })
        });
    }
}