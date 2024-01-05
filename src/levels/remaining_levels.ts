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

export class Level_05 extends Level {
  constructor() {
    super("level_05");
  }

  init(data): void {
    super.init({
      levelString: level_5_string,
      stars,
      callback: () => {
        data.callback();
      },
    });
  }
}

export class Level_06 extends Level {
  constructor() {
    super("level_06");
  }

  init(data): void {
    super.init({
      levelString: level_6_string,
      stars,
      callback: () => {
        data.callback();
      },
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
      callback: () => {
        data.callback();
      },
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
      callback: () => {
        data.callback();
      },
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
      callback: () => {
        data.callback();
      },
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
      callback: () => {
        data.callback();
      },
    });
  }
}
