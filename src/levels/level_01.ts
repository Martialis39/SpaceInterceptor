import { level_1_string } from "../utility/levelsAsString";
import Level from "./level";

export default class Level_01 extends Level {
  constructor() {
    super("level_01");
  }

  init(data): void {
    super.init({
      levelString: level_1_string,
      stars: [{ position: { x: 640, y: 0 }, dir: { x: 0, y: 1 }, time: 1100 }],
    });
  }
}
