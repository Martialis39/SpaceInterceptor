import * as Phaser from "phaser";

export default class LevelOver extends Phaser.Scene {
  container;
  callback;
  constructor() {
    super("level_over_ui");
  }

  init(data) {
    this.callback = data.callback;
  }

  create() {

    const width = this.cameras.main.width / 2
    const height = this.cameras.main.height / 2
    // Create a container
    var container = this.add.container(width, height);

    // Create a box (rectangle)
    var box = this.add.rectangle(0, 0, 0, 0, 0xffffff); // Set color to white
    container.add(box);

    // Create text
    var labelText = "Hello, Phaser!";
    var textStyle = { font: "24px FFFForward", fill: "#000000" }; // Set your desired text style
    var text = this.add.text(0, 0, labelText, textStyle);
    container.add(text);

    // Resize the box based on the text width and height
    var textWidth = text.width + 20; // Add some padding
    var textHeight = text.height + 20; // Add some padding
    box.setSize(textWidth, textHeight);

    // Center the text within the box
    text.setX(-text.width / 2);
    text.setY(-text.height / 2);
  }
}
