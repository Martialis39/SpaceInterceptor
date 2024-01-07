import { level_3_string } from "../utility/levelsAsString";
import Level from "./level";

const stars = [
  { position: { x: 1280, y: 240 }, dir: { x: -1, y: 0 }, time: 2600 },
  { position: { x: 0, y: 360 }, dir: { x: 1, y: 0 }, time: 4500 },
  {
    position: { x: 853.3333333333334, y: 720 },
    dir: { x: 0, y: -1 },
    time: 6800,
  },
  { position: { x: 426.6666666666667, y: 0 }, dir: { x: 0, y: 1 }, time: 9100 },
  { position: { x: 0, y: 240 }, dir: { x: 1, y: 0 }, time: 11600 },
  { position: { x: 1280, y: 360 }, dir: { x: -1, y: 0 }, time: 13500 },
];

export default class Level_03 extends Level {
  constructor() {
    super("level_03");
  }

  init(data): void {
    super.init({
      levelString: level_3_string,
      stars,
    });
  }
}
