import { SFX, SPRITES } from "../utility/constants";
import { easeInOutBack } from "../utility/easing";

type Position = { x: number; y: number };

export default class Ship {
  scene: Phaser.Scene;
  turnSound: Phaser.Sound.BaseSound;
  moveSound: Phaser.Sound.BaseSound;
  pickupCoinSounds: Phaser.Sound.BaseSound[];
  instance;
  isMoving = false;
  soundsInProgress;

  constructor(scene, position: Position) {
    this.scene = scene;
    this.turnSound = scene.sound.add(SFX.SHIP.TURN);
    this.moveSound = scene.sound.add(SFX.SHIP.MOVE);
    this.pickupCoinSounds = Array(3)
      .fill("")
      .map(() => {
        return scene.sound.add(SFX.SHIP.PICKUP);
      });
    this.instance = scene.physics.add
      .sprite(position.x, position.y, "ship")
      .setScale(0.5);

    this.rotateTo = this.rotateTo.bind(this);
    this.fly = this.fly.bind(this);
    this.playCoinSound = this.playCoinSound.bind(this);
  }

  playCoinSound() {
    for (let i = 0; i < this.pickupCoinSounds.length; i++) {
      const sound = this.pickupCoinSounds[i];
      if (sound.isPlaying) {
        continue;
      } else {
        sound.play();
        break;
      }
    }
    // const what = this.pickupCoinSound.play();
    // console.log("What is ", what);
  }

  rotateTo(angleDegrees, finalTarget) {
    // Create a tween to smoothly rotate the player to face the target
    // this.turnSound.play();
    this.scene.tweens.add({
      targets: this.instance,
      duration: 700, // duration in milliseconds
      angle: angleDegrees + 90,
      ease: easeInOutBack,
      onComplete: () => {
        this.turnSound.stop();
        this.fly(finalTarget, () => {
          this.isMoving = false;
          this.instance.body.setVelocity(0);
        });
      },
    });
  }

  fly(target, cb?) {
    // Fly to target
    this.moveSound.play();
    this.scene.tweens.add({
      targets: this.instance,
      y: target.y,
      x: target.x,
      duration: 200,
      onComplete: () => {
        if (cb) cb();
      },
    });
  }
}
