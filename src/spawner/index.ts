import { COLORS, LS } from "../utility/constants";
import { setInLocalStorage } from "../utility/localStorage";

export default class Spawner {
  scene: Phaser.Scene;
  instance: Phaser.GameObjects.Arc;
  levelKey: string;
  position: { x: number; y: number };
  dir: { x: number; y: number };

  constructor(scene, position, dir, levelKey) {
    this.scene = scene;
    this.levelKey = levelKey;
    this.position = position;
    this.dir = dir;
    this.instance = scene.add
      .circle(position.x, position.y, 50, COLORS.RED)
      .setInteractive();
    this.onPointerDown = this.onPointerDown.bind(this);

    this.instance.on("pointerdown", this.onPointerDown);
  }

  onPointerDown() {
    const time = Number(localStorage.getItem(LS.TIMER));
    if (!time) {
      throw new Error("No timer in LS");
    }
    console.log("INFO: level key is", this.levelKey);
    setInLocalStorage(this.levelKey, {
      position: this.position,
      dir: this.dir,
      time,
    });
  }
}
