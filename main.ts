function checkLight(){
    const level = input.lightLevel();
    if (analyze(level)) {
        basic.showIcon(IconNames.SmallHeart)
        basic.pause(2000)
        basic.clearScreen();
    }
}

const threashold = 200;

function analyze(level: number):boolean{
    if(level > threashold){
        return true;
    }
    return false;
}



new Config().run()
