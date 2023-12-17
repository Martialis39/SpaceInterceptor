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
    // const {width, height} = this.scale
    // this.container = this.add.container(width / 2, height / 2)
    // const btnLabel = this.add.text(0, 0, 'Next level!', {
    //     color: 'black',
    //     fontSize: 20
    // }).setOrigin(0, 0)
    // const btn = this.add.rectangle(0, 0,
    //     btnLabel.width + 20, btnLabel.height + 20, 0xff0909).setInteractive().setOrigin(0,0)
    // btn.on('pointerdown', () => {
    //     console.log("Btn down on button")
    //     if(this.callback){
    //         this.callback()
    //     }
    // })
    // this.container.add(btn)
    // this.container.add(btnLabel)

    // Create a container
    var container = this.add.container(400, 300);

    // Create a box (rectangle)
    var box = this.add.rectangle(0, 0, 0, 0, 0xffffff); // Set color to white
    container.add(box);

    // Create text
    var labelText = "Hello, Phaser!";
    var textStyle = { font: "20px", fill: "#000000" }; // Set your desired text style
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
