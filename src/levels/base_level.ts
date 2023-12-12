
import * as Phaser from 'phaser';
import { createBases } from '../utility/creation';

export default class BaseScene extends Phaser.Scene {

    ship
    satellites
    cursors

    constructor(key){
        super(key)
    }

    
    preload ()
    {
        this.load.image('satellite', 'assets/satellite.png');
        this.load.image('ship', 'assets/ship.png');
        this.load.image('star', 'assets/star.png');
    }

    getSatellites ()
    {

        return this.satellites
    }

    create ()
    {

        const things = [
            {
                type: 'base',
                position: {
                x: -100,
                y: this.cameras.main.centerY / 2
            }},
            {
                type: 'base',
                position: {
                x: 100,
                y: this.cameras.main.centerY / 2
            }}
        ]
        const s = createBases(this, things)
        this.satellites = s
    }
}