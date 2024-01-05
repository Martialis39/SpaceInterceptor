const UP: Direction = { x: 0, y: -1 };
const DOWN: Direction = { x: 0, y: 1 };
const LEFT: Direction = { x: -1, y: 0 };
const RIGHT: Direction = { x: 1, y: 0 };

export const levels = [
  "level_01",
  "level_02",
  "level_03",
  "level_04",
  "level_05",
  "level_06",
  "level_07",
  "level_08",
  "level_09",
  "level_10",
];

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
  LEVELS: Array(levels.length)
    .fill("")
    .map((_e, i) => {
      return `ssc-level-${i}-save`;
    }),
  LEVEL_DATA: "ssc-level-data",
};
