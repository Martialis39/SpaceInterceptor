import * as Phaser from "phaser";

export default class Score extends Phaser.Scene {
  score;
  container;
  scoreText;
  box;
  constructor() {
    super("score");
    this.score = 0;
    this.setScore = this.setScore.bind(this);
    this.resizeContainer = this.resizeContainer.bind(this);
  }

  create() {
    // Create a container
    var container = this.add.container(0, 0);

    // Create a box (rectangle)
    var box = this.add.rectangle(0, 0, 0, 0, 0xffffff); // Set color to white
    this.box = box;
    container.add(box);

    // Create text
    var labelText = `Score: ${this.score}`;
    var textStyle = {
      fontSize: "24px",
      fontFamily: "FFFForward",
      color: "#000000",
    }; // Set your desired text style
    var text = this.add.text(0, 0, labelText, textStyle);

    container.add(text);

    // Resize the box based on the text width and height
    var textWidth = text.width + 20; // Add some padding
    var textHeight = text.height + 20; // Add some padding
    box.setSize(textWidth, textHeight);

    // Center the text within the box
    text.setX(-text.width / 2);
    text.setY(-text.height / 2);

    container.setX(text.width / 2 + 20);
    container.setY(text.height / 2 + 20);

    this.container = container;
    this.scoreText = text;
  }

  resizeContainer() {
    // First resize text
    var textWidth = this.scoreText.width + 20; // Add some padding
    var textHeight = this.scoreText.height + 20; // Add some padding

    // then box
    this.box.setSize(textWidth, textHeight);

    // Center the text within the box
    this.scoreText.setX(-this.scoreText.width / 2);
    this.scoreText.setY(-this.scoreText.height / 2);

    this.container.setX(this.scoreText.width / 2 + 20);
    this.container.setY(this.scoreText.height / 2 + 20);
  }

  setScore() {
    this.score = this.score + 1;
    this.scoreText.text = `Score: ${this.score}`;
    this.resizeContainer();
  }
}
