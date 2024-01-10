import * as Phaser from "phaser";
import {
  createBases,
  getBasesFromStrings,
  getSpawnersFromStrings,
  parseLevelString,
} from "../utility/creation";
import { LS, directions } from "../utility/constants";
import { setInLocalStorage } from "../utility/localStorage";
import { Star, TransitionDirection } from "../types";
import { easeInOutBack } from "../utility/easing";
import { eventBus } from "../utility/signals";

export default class Level extends Phaser.Scene {
  ship;
  levelString;
  stars;
  starObjects = [];
  starsToSpawn;
  levelKey;
  activeSatellite;
  shipIsMoving;
  scoreScene;

  eventBus;

  constructor(key) {
    super(key);
    this.destroyStar = this.destroyStar.bind(this);
    this.levelKey = key;
    this.eventBus = eventBus;
  }

  init(data) {
    this.levelString = data.levelString;
    this.stars = data.stars;
    this.starsToSpawn = this.stars.length;
  }

  preload() {
    this.load.image("satellite", "assets/fancy_satellite.png");
    this.load.image("ship", "assets/round_ship.png");
    this.load.image("star", "assets/bright_star.png");
  }

  destroyStar(starObject) {
    if (!starObject.star.active) {
      console.log("INFO: star already disposed");
      return;
    }
    this.starsToSpawn -= 1;
    this.starObjects = this.starObjects.filter(
      (s) => s.star !== starObject.star,
    );
    if (this.starsToSpawn <= 0 && this.starObjects.length <= 0) {
      this.eventBus.emit("levelOver");
    }
    starObject.star.destroy();
  }

  update(): void {
    // Destroy stars that are out of view
    if (this.starObjects.length > 0) {
      this.starObjects
        .filter((so) => so.isBeingDestroyed === false)
        .forEach((starObject) => {
          // Get the bounds of the game camera
          const { star } = starObject;
          const cameraBounds = new Phaser.Geom.Rectangle(
            0,
            0,
            this.cameras.main.width,
            this.cameras.main.height,
          );

          if (
            !Phaser.Geom.Rectangle.ContainsPoint(cameraBounds, {
              x: starObject.star.x,
              y: starObject.star.y,
            } as Phaser.Geom.Point)
          ) {
            starObject.isBeingDestroyed = true;
            this.tweens.add({
              targets: star,
              alpha: 0,
              duration: 100,
              onComplete: () => {
                this.destroyStar(starObject);
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
          if (!this.scoreScene) {
            this.scoreScene = this.scene.get("score");
          }

          const s = this.physics.add.sprite(
            star.position.x,
            star.position.y,
            "star",
          );

          s.alpha = 1;

          s.setVelocity(star.dir.x * 100, star.dir.y * 100);

          const starObject = {
            star: s,
            isBeingDestroyed: false,
          };
          this.starObjects.push(starObject);

          this.physics.add.collider(this.ship, s, () => {
            this.ship.body.setVelocity(0);
            if (!starObject.isBeingDestroyed) {
              const explosion = this.add.particles(0, 0, "star", {
                lifespan: 400,
                speed: { min: 500, max: 740 },
                scale: { start: 0.8, end: 0 },
                gravityY: 150,
                blendMode: "ADD",
                emitting: false,
              });
              explosion.setX(starObject.star.body.x);
              explosion.setY(starObject.star.body.y);

              explosion.explode(8);
              starObject.isBeingDestroyed = true;
              this.tweens.add({
                targets: starObject.star,
                alpha: 0,
                duration: 100,
                onComplete: () => {
                  this.destroyStar(starObject);
                  this.scoreScene.setScore();
                },
              });
            }
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

    // initial active satellite is 0

    this.activeSatellite = s[0];

    const spawners = getSpawnersFromStrings(levelAsString);

    // Creating the spawners
    if (process.env.DEBUG) {
      spawners.forEach((spawner) => {
        const s = this.add
          .circle(spawner.position.x, spawner.position.y, 50, 0xff0000)
          .setInteractive();
        s.on("pointerdown", () => {
          // get the time key
          const time = Number(localStorage.getItem(LS.TIMER));
          if (!time) {
            throw new Error("No timer in LS");
          }
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
        // Ignore clicks on active satellite and when ship is already moving
        if (sat === this.activeSatellite || this.shipIsMoving) {
          return;
        }

        this.shipIsMoving = true;

        // Set active satellite
        this.activeSatellite = sat;
        // Calculate the angle between the player and the target
        var angle = Phaser.Math.Angle.Between(
          this.ship.x,
          this.ship.y,
          sat.x,
          sat.y,
        );

        // Convert the angle from radians to degrees
        var angleDegrees = Phaser.Math.RadToDeg(angle);

        // TODO: There is a bug where the ship starts moving down
        // this occurs when the tween time is quite long

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
              onComplete: () => {
                this.shipIsMoving = false;
                this.ship.body.setVelocity(0);
              },
            });
          },
        });
      });
    });
  }
}
