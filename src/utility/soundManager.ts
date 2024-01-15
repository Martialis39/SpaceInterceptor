import { BGM } from "./constants";
import { eventBus } from "./signals";

export class SoundManager {
  game: Phaser.Game;
  main: Phaser.Scene;
  eventBus = eventBus;
  currentSong;
  constructor(main, game) {
    this.main = main;
    this.game = game;
    this.playBGM = this.playBGM.bind(this);
    this.eventBus.addListener("playBGM", this.playBGM);
  }

  playBGM() {
    if (process.env.DEBUG) {
      // disable for now
      this.currentSong = this.main.sound.add(BGM.TRACK_01, {
        volume: 0.5,
        loop: true,
      });
      this.currentSong.play();
    }
  }
}
