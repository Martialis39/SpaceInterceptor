import { level_4_string } from "../utility/levelsAsString";
import Level from "./level";

const stars = [
  {
    position: { x: 426.6666666666667, y: 720 },
    dir: { x: 0, y: -1 },
    time: 100,
  },
  { position: { x: 640, y: 720 }, dir: { x: 0, y: -1 }, time: 200 },
  {
    position: { x: 853.3333333333334, y: 720 },
    dir: { x: 0, y: -1 },
    time: 300,
  },
  { position: { x: 426.6666666666667, y: 0 }, dir: { x: 0, y: 1 }, time: 2700 },
  { position: { x: 640, y: 0 }, dir: { x: 0, y: 1 }, time: 2800 },
  { position: { x: 853.3333333333334, y: 0 }, dir: { x: 0, y: 1 }, time: 2900 },
];

export default class Level_04 extends Level {
  constructor() {
    super("level_04");
  }

  init(data): void {
    super.init({
      levelString: level_4_string,
      stars,
    });
  }
}
