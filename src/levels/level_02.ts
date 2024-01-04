import { level_2_string } from "../utility/levelsAsString";
import Level from "./level";

const stars = [
  { position: { x: 1280, y: 360 }, dir: { x: -1, y: 0 }, time: 1900 },
  { position: { x: 0, y: 360 }, dir: { x: 1, y: 0 }, time: 4300 },
  { position: { x: 1280, y: 360 }, dir: { x: -1, y: 0 }, time: 6600 },
  { position: { x: 1280, y: 360 }, dir: { x: -1, y: 0 }, time: 9300 },
];

export default class Level_02 extends Level {
  constructor() {
    super("level_02");
  }

  init(data): void {
    super.init({
      levelString: level_2_string,
      stars,
      callback: () => {
        data.callback();
      },
    });
  }
}
