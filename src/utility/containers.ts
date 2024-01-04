import * as Phaser from "phaser";

// Define the possible game object types
type GameObjectType =
  | Phaser.GameObjects.Sprite
  | Phaser.GameObjects.Text
  | Phaser.GameObjects.Container;

type HBoxBindings = {
  x?: string;
  y?: string;
  gap?: number;
  children: GameObjectType[];
  scene: Phaser.Scene;
};

export const vBoxContainer = (bindings: HBoxBindings) => {
  const gap = bindings.gap ? bindings.gap : 20;
  const container = bindings.scene.add.container(0, 0);

  if (bindings.children.length === 0) {
    return;
  }

  let containerHeight = 0;
  let containerWidth = 0;

  if (bindings.children.length === 1) {
    const go = bindings.children[0];
    if ("setOrigin" in go) {
      go.setOrigin(0, 0);
    }
    container.add(go);
    container.width = go.displayWidth;
    container.height = go.displayHeight;
  } else {
    bindings.children.forEach((go: GameObjectType, index: number) => {
      if ("setOrigin" in go) {
        go.setOrigin(0, 0);
      }
      container.add(go);
      containerHeight += go.displayHeight;
      containerHeight += gap;
      containerWidth = Math.max(containerWidth, go.displayWidth);

      if (index === 0) {
        go.y = 0;
      } else {
        const prev = bindings.children[index - 1];
        go.y = prev.y + prev.displayHeight + gap;
      }
    });

    bindings.children.forEach((go) => {
      go.x = containerWidth / 2 - go.displayWidth / 2;
    });
  }

  container.height = containerHeight;
  container.width = containerWidth;
  return container;
};

export const hBoxContainer = (bindings: HBoxBindings) => {
  const gap = bindings.gap ? bindings.gap : 20;
  const container = bindings.scene.add.container(0, 0);

  if (bindings.children.length === 0) {
    return;
  }

  let containerHeight = 0;
  let containerWidth = 0;

  if (bindings.children.length === 1) {
    const go = bindings.children[0];
    if ("setOrigin" in go) {
      go.setOrigin(0, 0);
    }
    container.add(go);
    container.width = go.displayWidth;
    container.height = go.displayHeight;
  } else {
    containerWidth += gap;
    bindings.children.forEach((go: GameObjectType, index: number) => {
      if ("setOrigin" in go) {
        go.setOrigin(0, 0);
      }
      container.add(go);
      containerWidth += go.displayWidth;
      containerWidth += gap;
      containerHeight = Math.max(containerHeight, go.displayHeight);

      if (index === 0) {
        go.x = gap;
      } else {
        const prev = bindings.children[index - 1];
        go.x = prev.x + prev.displayWidth + gap;
      }
    });

    bindings.children.forEach((go) => {
      go.y = containerHeight / 2 - go.displayHeight / 2;
    });
  }

  container.height = containerHeight;
  container.width = containerWidth;
  return container;
};
