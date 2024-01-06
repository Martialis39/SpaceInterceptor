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

export default class Level extends Phaser.Scene {
  ship;
  levelString;
  stars;
  starObjects = [];
  starsToSpawn;
  callback;
  levelKey;
  activeSatellite;
  shipIsMoving;
  scoreScene;

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
    console.log("starsToSpawn", this.starsToSpawn);
    console.log("starObjects", this.starObjects);
    if (!star.active) {
      console.log("INFO: star already disposed");
      return;
    }
    this.starsToSpawn -= 1;
    this.starObjects = this.starObjects.filter((s) => s !== star);
    if (this.starsToSpawn <= 0 && this.starObjects.length <= 0) {
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
          if (!this.scoreScene) {
            this.scoreScene = this.scene.get("score");
          }
          const s = this.physics.add.sprite(
            star.position.x,
            star.position.y,
            "star",
          );
          s.setVelocity(star.dir.x * 100, star.dir.y * 100);

          this.starObjects.push(s);

          this.physics.add.collider(this.ship, s, (_ship, starCollider) => {
            this.scoreScene.setScore();
            this.ship.body.setVelocity(0);
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
