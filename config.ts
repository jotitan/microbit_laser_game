let mode = 0;
class Config{
    constructor(public player:number = 0){}
    run(){
        input.onButtonPressed(Button.B,()=>this.join())
        input.onButtonPressed(Button.A, () => this.changePlayer())
        this.show();
    }
    show(){
        basic.showNumber(this.player);
    }
    changePlayer(){
        this.player = (this.player+1)%20;
        this.show();
    }
    join(){
            // Check if player already exists
            radio.setGroup(0)
            radio.setTransmitPower(7)
            radio.setFrequencyBand(0)
            radio.onReceivedValue((key, value) => {
                if (key === "EXISTS" && value === 1){
                    // Bad player
                    basic.showIcon(IconNames.No)
                    this.player = -1;
                }
            })
            radio.sendValue("NEW",this.player)
            const start = input.runningTime();
            control.inBackground(()=>{
                basic.pause(1000)
                if(this.player === -1){
                    this.player = 0;
                    this.show();
                }else{
                    radio.onReceivedValue(()=>{})
                    basic.showIcon(IconNames.Yes)
                    this.joined();
                }
            })
    }
    joined(){
        input.onButtonPressed(Button.A,()=>{})
        input.onButtonPressed(Button.B, ()=>this.start(true))
        radio.onReceivedValue((key,value)=>{
            if(key === "NEW" && value === this.player){
                radio.sendValue("EXISTS",1)
            }
            if(key === "START" && value === 1){
                this.start();
            }
        })
    }
    start(first: boolean = false){
        radio.onReceivedValue(()=>{})
        if(first){
            radio.sendValue("START",1)
        }
       new Game(this.player).start();
    }
}