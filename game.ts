const numberOfLives: number = 10;

class Game{
    lives: number
    constructor(public player: number = 0){
        this.lives = numberOfLives;
    }
    threashold = 200;
    start(){
        input.onButtonPressed(Button.A,()=>{})
        input.onButtonPressed(Button.B, () => { })
        basic.showIcon(IconNames.Heart)
        this.initShootReceiver()
    }
    initShootReceiver(){
        basic.forever(()=>this.checkLight())
    }
    isDead():boolean{
        return this.lives <= 0;
    }
    dead(){
        basic.showIcon(IconNames.Skull);
        this.lives = 0;
    }
    shooted(){
        this.lives--;
        if(this.isDead()){
            this.dead();
            return;
        }
        basic.showIcon(IconNames.SmallDiamond)
        basic.showIcon(IconNames.Diamond)
        basic.showIcon(IconNames.SmallDiamond)
        led.plotBarGraph(this.lives, numberOfLives)
        basic.pause(2000)
        basic.clearScreen();
    }
    checkLight() {
        const level = input.lightLevel();
        if (analyze(level)) {
            this.shooted();
        }
    }
    analyzeShoot(level: number): boolean {
        return level > threashold;
    }
}