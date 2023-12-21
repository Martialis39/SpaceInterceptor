import * as Phaser from "phaser";

// Define the possible game object types
type GameObjectType = Phaser.GameObjects.Sprite | Phaser.GameObjects.Text;

type HBoxBindings = {
  x?: string;
  y?: string;
  gap?: number;
  children: GameObjectType[];
  scene: Phaser.Scene;
};

const PADDING = 20;

export const hBoxContainer = (bindings: HBoxBindings) => {
  const x = bindings.scene.cameras.main.width / 2;
  const y = bindings.scene.cameras.main.height / 2;
  const gap = bindings.gap ? bindings.gap : 20;
  const container = bindings.scene.add.container(x, y);

  let tallestValue = 0;
  let tallestElement = bindings.children[0];

  let width = PADDING;

  bindings.children.forEach((go: GameObjectType, index: number) => {
    container.add(go);
    width += go.width + gap;
    if (go.height > tallestValue) {
      tallestValue = go.height;
      tallestElement = go;
    }

    if (index > 0) {
      go.setX(bindings.children[index - 1].width + gap);
    } else {
      go.setX(0);
    }
    // Center
    go.setY(-go.height / 2);
  });
  container.height = tallestValue;

  container.x = (bindings.scene.cameras.main.width - width) / 2;
  container.y = (bindings.scene.cameras.main.height - tallestValue) / 2;
};

export const vBoxContainer = (bindings: HBoxBindings) => {
  const x = bindings.scene.cameras.main.width / 2;
  const y = bindings.scene.cameras.main.height / 2;
  const gap = bindings.gap ? bindings.gap : 20;
  const container = bindings.scene.add.container(x, y);

  let height = PADDING;

  let widestValue = 0;
  let widestElement = bindings.children[0];

  bindings.children.forEach((go: GameObjectType, index: number) => {
    container.add(go);
    height += go.height + gap;
    if (go.width > widestValue) {
      widestValue = go.height;
      widestElement = go;
    }

    if (index > 0) {
      go.setY(bindings.children[index - 1].height + gap);
    } else {
      go.setY(0);
    }
    // Center
    go.setX(-go.width / 2);
  });
  container.height = widestValue;

  container.x = (bindings.scene.cameras.main.width - widestValue) / 2;
  container.y = (bindings.scene.cameras.main.height - container.height) / 2;
};
