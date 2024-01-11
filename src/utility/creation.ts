import { GameElement } from "../types";
import { LS } from "./constants";

export const createBases = (scene, parsedLevel) => {
  const bases = getBasesFromStrings(parsedLevel);
  const targets = bases.map((sat) => {
    const satellite = scene.physics.add.sprite(
      sat.position.x,
      sat.position.y,
      "satellite",
    );
    satellite.scale = 0.25;
    satellite.setInteractive();
    return satellite;
  });

  return targets;
};

export const parseLevelString = ({
  levelString,
  height,
  width,
  directions,
}): GameElement[] => {
  const lines = levelString.split("\n").filter(Boolean);
  const widthUnit = width / (lines[0].length - 1);
  const heightUnit = height / (lines.length - 1);

  return lines
    .map((line, row) => {
      const chars = line.split("");
      return chars.map((c, col) => {
        let type = "empty";
        let dir = null;
        const position = {
          x: col * widthUnit,
          y: row * heightUnit,
        };
        if (c === "B") {
          type = "base";
        }

        if (c === "U") {
          type = "spawn";
          dir = directions.DOWN;
        }

        if (c === "D") {
          type = "spawn";
          dir = directions.UP;
        }

        if (c === "R") {
          type = "spawn";
          dir = directions.LEFT;
        }

        if (c === "L") {
          type = "spawn";
          dir = directions.RIGHT;
        }

        return {
          type,
          position,
          dir,
        };
      });
    })
    .reduce((a, c) => a.concat(c), []);
};

export const getSpawnersFromStrings = (levelString: GameElement[]) => {
  return levelString.filter(({ type }) => type === "spawn");
};

export const getBasesFromStrings = (levelString: GameElement[]) => {
  return levelString.filter(({ type }) => type === "base");
};

export const createTextInput = (mainScene) => {
  const container = document.querySelector("#debug-only");
  // Create a text input field using HTML

  var btn = document.querySelector(".debug-level-select button");
  var input = document.querySelector(
    ".debug-level-select input",
  ) as HTMLInputElement;

  btn.addEventListener("click", () => {
    mainScene.levelManager.debugLoadLevel(Number(input.value));
    input.value = "";
  });

  // Also set up time controls

  let time = 0;

  localStorage.setItem(LS.TIMER, "0");
  const [plusButton, minusButton] = Array.from(
    container.querySelectorAll(".debug-time-container button"),
  );
  const display = container.querySelector(".display");

  plusButton.addEventListener("click", () => {
    time += 100;
    localStorage.setItem(LS.TIMER, String(time));
    display.textContent = String(time);
  });

  minusButton.addEventListener("click", () => {
    time -= 100;
    localStorage.setItem(LS.TIMER, String(time));
    display.textContent = String(time);
  });
};
