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
  //   const x = bindings.scene.cameras.main.width / 2;
  //   const y = bindings.scene.cameras.main.height / 2;
  const gap = bindings.gap ? bindings.gap : 20;
  const container = bindings.scene.add.container(0, 0);

  let tallestValue = 0;
  let tallestElement = bindings.children[0];

  let width = PADDING;

  bindings.children.forEach((go: GameObjectType, index: number) => {
    container.add(go);

    console.log("Called me ", go);

    const myWidth = go.displayWidth;
    width += gap + myWidth;

    if (go.displayHeight > tallestValue) {
      tallestValue = go.displayHeight;
      tallestElement = go;
    }

    if (index > 0) {
      //   go.setX(
      //     PADDING + bindings.children[index - 1].displayWidth + myWidth / 2 + gap
      //   );

      go.setX(width - myWidth + gap);
    } else if (index + 1 === bindings.children.length) {
      go.setX(width - myWidth);
    } else {
      go.setX(0 + PADDING + myWidth / 2);
    }
  });
  container.height = tallestValue;

  bindings.children.forEach((e) => {
    e.y = tallestValue / 2;
  });
  container.x = (bindings.scene.cameras.main.width - width) / 2;
  container.y = (bindings.scene.cameras.main.height - tallestValue) / 2;

  var graphics = bindings.scene.add.graphics();
  graphics.lineStyle(2, 0x00ff00); // Green color, 2-pixel line
  graphics.strokeRect(container.x, container.y, width, tallestValue);
};

export const vBoxContainer = (bindings: HBoxBindings) => {
  // const x = bindings.scene.cameras.main.width / 2;
  // const y = bindings.scene.cameras.main.height / 2;
  const gap = bindings.gap ? bindings.gap : 20;
  const container = bindings.scene.add.container(0, 0);


  if(bindings.children.length === 0){
    return
  }

  let containerHeight = 0
  let containerWidth = 0

  if(bindings.children.length === 1){
    const go = bindings.children[0]
    go.setOrigin(0, 0)
    container.add(go);
    container.width = go.displayWidth
    container.height = go.displayHeight
  } else {
    bindings.children.forEach((go: GameObjectType, index: number) => {
      go.setOrigin(0, 0)
      container.add(go);
      containerHeight += go.displayHeight
      containerHeight += gap
      containerWidth = Math.max(containerWidth, go.displayWidth)

      if(index === 0){
        go.y = 0
      } else {
        const prev = bindings.children[index - 1]
        go.y = prev.y + prev.displayHeight + gap
      }
    })

    bindings.children.forEach((go) => {
      go.x = containerWidth / 2 - go.displayWidth / 2
    })

  }

  container.height = containerHeight;
  container.width = containerWidth
  return container
};
