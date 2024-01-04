import * as Phaser from "phaser";
import {
  createBases,
  getBasesFromStrings,
  getSpawnersFromStrings,
  parseLevelString,
} from "../utility/creation";
import { directions } from "../utility/constants";
import { setInLocalStorage } from "../utility/localStorage";
import { Star, TransitionDirection } from "../types";
import { easeInOutBack } from "../utility/easing";

export default class Level extends Phaser.Scene {
  ship;
  levelString;
  stars;
  starObjects = [];
  starsToSpawn;
  callback;
  parent;
  levelKey;

  constructor(key) {
    super(key);
    this.destroyStar = this.destroyStar.bind(this);
    this.levelKey = key;
  }

  init(data) {
    this.levelString = data.levelString;
    this.stars = data.stars;
    this.callback = data.callback;
    this.starsToSpawn = this.stars.length;
  }

  preload() {
    this.load.image("satellite", "assets/satellite.png");
    this.load.image("ship", "assets/ship.png");
    this.load.image("star", "assets/star.png");
  }

  destroyStar(star) {
    this.starsToSpawn -= 1;
    if (this.starsToSpawn === 0 && this.starObjects.length === 0) {
      this.callback();
    }
    star.destroy();
  }

  update(): void {
    // Destroy stars that are out of view
    if (this.starObjects.length > 0) {
      this.starObjects.forEach((star) => {
        // Get the bounds of the game camera
        const cameraBounds = new Phaser.Geom.Rectangle(
          0,
          0,
          this.cameras.main.width,
          this.cameras.main.height,
        );

        if (
          !Phaser.Geom.Rectangle.ContainsPoint(cameraBounds, {
            x: star.x,
            y: star.y,
          } as Phaser.Geom.Point)
        ) {
          this.tweens.add({
            targets: star,
            alpha: 0,
            duration: 200,
            onComplete: () => {
              this.starObjects = this.starObjects.filter((s) => s !== star);
              this.destroyStar(star);
            },
          });
        }
      });
    }
  }

  create() {
    const levelAsString = parseLevelString({
      levelString: this.levelString,
      height: this.cameras.main.height,
      width: this.cameras.main.width,
      directions: directions,
    });

    if (this.stars) {
      this.stars.forEach((star: Star) => {
        this.time.delayedCall(star.time, () => {
          const s = this.physics.add.sprite(
            star.position.x,
            star.position.y,
            "star",
          );
          s.setVelocity(star.dir.x * 100, star.dir.y * 100);

          this.time.delayedCall(3000, () => {
            if (s && s.active) {
              this.starObjects.push(s);
            }
          });
          this.physics.add.collider(this.ship, s, (_ship, starCollider) => {
            this.starObjects = this.starObjects.filter(
              (s) => s !== starCollider,
            );
            this.destroyStar(starCollider);
          });
        });
      });
    }

    const things = getBasesFromStrings(levelAsString);
    const s = createBases(this, things);
    const shipSprite = this.physics.add.sprite(s[0].x, s[0].y, "ship");
    shipSprite.scale = 0.5;
    this.ship = shipSprite;

    this.ship.setX(s[0].x);
    this.ship.setY(s[0].y);

    const spawners = getSpawnersFromStrings(levelAsString);

    // Creating the spawners
    if (process.env.DEBUG) {
      let time = 0;

      setInterval(() => {
        time += 100;
      }, 100);

      console.log("this is it");
      spawners.forEach((spawner) => {
        const s = this.add
          .circle(spawner.position.x, spawner.position.y, 50, 0xff0000)
          .setInteractive();
        s.on("pointerdown", () => {
          console.log("This is level key", this.levelKey);
          setInLocalStorage(this.levelKey, {
            position: spawner.position,
            dir: spawner.dir,
            time,
          });
        });
      });
    }

    s.forEach((sat) => {
      sat.on("pointerdown", () => {
        // Calculate the angle between the player and the target
        var angle = Phaser.Math.Angle.Between(
          this.ship.x,
          this.ship.y,
          sat.x,
          sat.y,
        );

        // Convert the angle from radians to degrees
        var angleDegrees = Phaser.Math.RadToDeg(angle);

        // Create a tween to smoothly rotate the player to face the target

        this.tweens.add({
          targets: this.ship,
          duration: 700, // duration in milliseconds
          angle: angleDegrees + 90,
          ease: easeInOutBack, // you can use other easing functions as well
          onComplete: () => {
            // This function is called when the tween completes
            console.log("Rotation completed!");
            this.tweens.add({
              targets: this.ship,
              y: sat.y,
              x: sat.x,
              duration: 200,
            });
          },
        });
      });
    });
  }
}
