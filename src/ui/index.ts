import * as Phaser from 'phaser'

export default class LevelOver extends Phaser.Scene {
    container;
    callback;
    constructor(){
        super('level_over_ui')
    }

    init(data){
        this.callback = data.callback
    }

    create(){
        const {width, height} = this.scale
        this.container = this.add.container(width / 2, height / 2)
        const btnLabel = this.add.text(0, 0, 'Next level!', {
            color: 'black',
            fontSize: 20
        }).setOrigin(0, 0)
        const btn = this.add.rectangle(0, 0, 
            btnLabel.width + 20, btnLabel.height + 20, 0xff0909).setInteractive().setOrigin(0,0)
        btn.on('pointerdown', () => {
            console.log("Btn down on button")
            if(this.callback){
                this.callback()
            }
        })
        this.container.add(btn)
        this.container.add(btnLabel)
    }
}