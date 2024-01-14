import { eventBus } from "./signals";

export class SoundManager {
  game: Phaser.Game;
  eventBus = eventBus;
  currentSong;
  constructor(game) {
    this.game = game;
  }

  playBGM() {}
}
