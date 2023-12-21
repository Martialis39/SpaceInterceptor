import { level_3_string } from "../utility/levelsAsString"
import Level from "./level"

export default class Level_02 extends Level {
    constructor() {
        super('level_03')
    }

    init(data): void {
        super.init({
            levelString: level_3_string,
            stars: [
        { position: { x: 640, y: 0 }, dir: { x: 0, y: 1 }, time: 1100 },
            ],
            callback: () => {
                data.callback()
            }
        })
    }
}