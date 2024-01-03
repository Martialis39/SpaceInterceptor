const UP: Direction = { x: 0, y: -1 };
const DOWN: Direction = { x: 0, y: 1 };
const LEFT: Direction = { x: -1, y: 0 };
const RIGHT: Direction = { x: 1, y: 0 };

export const directions = {
  UP,
  DOWN,
  LEFT,
  RIGHT,
};

export type Direction = {
  x: number;
  y: number;
};

export const SPRITES = {
  BUTTONS: {
    PLAY: "play-btn",
    QUIT: "quit-btn",
  },
  BACKGROUND: {
    SPACE_01: 'bg',
    NEBULAE_01: 'nebulae'
  }
};

export const LS = {
  TIMER: 'debug-timer-value'
}