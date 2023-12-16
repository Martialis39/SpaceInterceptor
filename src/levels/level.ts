import * as Phaser from "phaser";
import {
  createBases,
  getBasesFromStrings,
  getSpawnersFromStrings,
  parseLevelString,
} from "../utility/creation";
import { directions } from "../utility/constants";
import { setInLocalStorage } from "../utility/localStorage";
import { Star } from "../types";

export default class Level extends Phaser.Scene {
  satellites;
  ship;
  levelString;
  stars;

  constructor() {
    super("level");
  }

  init(data) {
    this.levelString = data.levelString;
    this.stars = data.stars;
  }

  preload() {
    this.load.image("satellite", "assets/satellite.png");
    this.load.image("ship", "assets/ship.png");
    this.load.image("star", "assets/star.png");
  }

  getSatellites() {
    return this.satellites;
  }

  create() {
    const levelAsString = parseLevelString({
      levelString: this.levelString,
      height: this.cameras.main.height,
      width: this.cameras.main.width,
      directions: directions,
    });

    if(this.stars){
      this.stars.forEach((star: Star)=> {
        setTimeout(() => {
          const s = this.physics.add.sprite(star.position.x, star.position.y, "star")
          s.setVelocity(star.dir.x * 100, star.dir.y * 100)
          this.physics.add.collider(this.ship, s, (s, _sat) => {
            console.log("Got me")
            _sat.destroy()
          });
        }, star.time)
      })
    }

    const things = getBasesFromStrings(levelAsString);
    const s = createBases(this, things);
    const shipSprite = this.physics.add.sprite(s[0].x, s[0].y, "ship");
    shipSprite.scale = 0.5;
    this.ship = shipSprite;

    this.ship.setX(s[0].x);
    this.ship.setY(s[0].y);

    this.satellites = s;

    let time = 0;

    setInterval(() => {
      time += 100;
    }, 100);

    const spawners = getSpawnersFromStrings(levelAsString);

    console.log("Ran me")

    spawners.forEach((spawner) => {
      console.log("SP is ", spawner)
      const s = this.add
        .circle(spawner.position.x, spawner.position.y, 50, 0xff0000)
        .setInteractive();
      s.on("pointerdown", () => {
        setInLocalStorage("level_1", {
          position: spawner.position,
          dir: spawner.dir,
          time,
        });
      });
    });

    s.forEach((sat) => {
      sat.on("pointerdown", () => {
        this.tweens.add({
          targets: this.ship,
          y: sat.y,
          x: sat.x,
          duration: 200,
        });

        this.physics.add.collider(this.ship, sat, (s, _sat) => {
          console.log("S is ", s);
        });
      });
    });
  }
}
