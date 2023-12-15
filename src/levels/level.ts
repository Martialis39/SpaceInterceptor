import * as Phaser from "phaser";
import {
  createBases,
  getBasesFromStrings,
  getSpawnersFromStrings,
  parseLevelString,
} from "../utility/creation";
import { directions } from "../utility/constants";
import { setInLocalStorage } from "../utility/localStorage";

export default class Level extends Phaser.Scene {
  satellites;
  ship;
  levelString;

  constructor() {
    super("level");
  }

  init(data) {
    this.levelString = data.levelString;
  }

  preload() {
    this.load.image("satellite", "assets/satellite.png");
    this.load.image("ship", "assets/ship.png");
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
    const things = getBasesFromStrings(levelAsString);
    const s = createBases(this, things);
    const shipSprite = this.add.sprite(s[0].x, s[0].y, "ship");
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

    spawners.forEach((spawner) => {
      console.log("Spawner is ", spawner);
      const s = this.add
        .circle(spawner.position.x, spawner.position.y, 50, 0xff0000)
        .setInteractive();
      s.on("pointerdown", () => {
        console.log("Clicked me!");
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
