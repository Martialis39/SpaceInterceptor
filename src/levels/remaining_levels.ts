import {
  level_5_string,
  level_6_string,
  level_7_string,
  level_8_string,
  level_9_string,
  level_10_string,
} from "../utility/levelsAsString";
import Level from "./level";

const stars = [];

const level_5_stars = [
  { position: { x: 1280, y: 360 }, dir: { x: -1, y: 0 }, time: 500 },
  { position: { x: 0, y: 360 }, dir: { x: 1, y: 0 }, time: 500 },
  {
    position: { x: 426.6666666666667, y: 1220 },
    dir: { x: 0, y: -1 },
    time: 1600,
  },
  {
    position: { x: 853.3333333333334, y: 1220 },
    dir: { x: 0, y: -1 },
    time: 1600,
  },
  { position: { x: 0, y: 120 }, dir: { x: 1, y: 0 }, time: 4600 },
  { position: { x: 0, y: 600 }, dir: { x: 1, y: 0 }, time: 4600 },
  { position: { x: 0, y: 360 }, dir: { x: 1, y: 0 }, time: 7400 },
  { position: { x: 0, y: 480 }, dir: { x: 1, y: 0 }, time: 7400 },
];

export class Level_05 extends Level {
  constructor() {
    super("level_05");
  }

  init(data): void {
    console.log("Called level 5");
    super.init({
      levelString: level_5_string,
      stars: level_5_stars,
    });
  }
}

const level_6_stars = [
  { position: { x: 640, y: 0 }, dir: { x: 0, y: 1 }, time: 600 },
  { position: { x: 0, y: 120 }, dir: { x: 1, y: 0 }, time: 600 },
  { position: { x: 0, y: 600 }, dir: { x: 1, y: 0 }, time: 3800 },
  { position: { x: 1280, y: 120 }, dir: { x: -1, y: 0 }, time: 3800 },
  { position: { x: 426.6666666666667, y: 0 }, dir: { x: 0, y: 1 }, time: 7400 },
  { position: { x: 0, y: 360 }, dir: { x: 1, y: 0 }, time: 7400 },
  {
    position: { x: 853.3333333333334, y: 720 },
    dir: { x: 0, y: -1 },
    time: 10800,
  },
];

export class Level_06 extends Level {
  constructor() {
    super("level_06");
  }

  init(data): void {
    super.init({
      levelString: level_6_string,
      stars: level_6_stars,
    });
  }
}

export class Level_07 extends Level {
  constructor() {
    super("level_07");
  }

  init(data): void {
    super.init({
      levelString: level_7_string,
      stars,
    });
  }
}

export class Level_08 extends Level {
  constructor() {
    super("level_08");
  }

  init(data): void {
    super.init({
      levelString: level_8_string,
      stars,
    });
  }
}

export class Level_09 extends Level {
  constructor() {
    super("level_09");
  }

  init(data): void {
    super.init({
      levelString: level_9_string,
      stars,
    });
  }
}

export class Level_10 extends Level {
  constructor() {
    super("level_10");
  }

  init(data): void {
    super.init({
      levelString: level_10_string,
      stars,
    });
  }
}
