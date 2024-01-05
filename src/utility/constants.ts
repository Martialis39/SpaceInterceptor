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
    FULLSCREEN: "fullscreen-btn",
  },
  BACKGROUND: {
    SPACE_01: "bg",
    NEBULAE_01: "nebulae",
  },
};

export const SFX = {
  MENU: {
    CONFIRM: "menu-confirm",
  },
};

export const LS = {
  TIMER: "debug-timer-value",
  LEVELS: Array(5).fill("").map((_e, i) => {
    return `ssc-level-${i}-save`
  }) // TODO: remove placeholder 5
};
