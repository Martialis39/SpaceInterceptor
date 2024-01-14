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
  // "level_07",
  // "level_08",
  // "level_09",
  // "level_10",
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
    HOW_TO_PLAY: "how-to-play-btn",
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
  SHIP: {
    TURN: "ship-turn",
    MOVE: "ship-move",
    PICKUP: "ship-pickup",
  },
};

export const BGM = {
  TRACK_01: 'track-01'
}

export const COLORS = {
  RED: 0xff0000,
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
