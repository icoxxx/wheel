// Hristiyan Valkov - +359 899 28 91 28



const wheel = document.getElementsByClassName('wheel');
const spinButton = document.querySelectorAll('.spinButton');
let gameCounter = 0;
let prize;
let degValue = Math.ceil(3600 + Math.random() * 1000);
const displayPrize = document.getElementsByClassName('displayPrize');
const freeSpinText = document.getElementById('freeSpinText');
let controlSpins = false;
let zoneSize = 30 ;  //degrees
const symbolZones = {
    1: 50,
    2: "Free Spins",
    3: 5,
    4: 20,
    5: 10,
    6: 30,
    7: 1000,
    8: 5,
    9: 100,
    10: 500,
    11: 80,
    12: 10
};
let freeSpins = 0;
let totalPrizeFromFreeSpins = 0;

function threeSpins(){
    degValue += Math.ceil(3600 + Math.random() * 1000);
    wheel[0].style.transform = `rotate(${degValue}deg)`;
    //gameCounter += 1;
    freeSpins += 1;
    let actualDeg = degValue % 360;
    const winningSymbolNum = Math.ceil(actualDeg / zoneSize);
    prize = symbolZones[winningSymbolNum];
    totalPrizeFromFreeSpins += prize;
};

const waitFor = delay => new Promise((resolve) => setTimeout(resolve, delay));

async function waitForSpins(){
    await waitFor(4000);

    threeSpins();
    await waitFor(7000);
    threeSpins();
    await waitFor(7000);
    threeSpins();
    await waitFor(6500);
        displayPrize[0].innerHTML = `Your total prize: ${totalPrizeFromFreeSpins}$`
        totalPrizeFromFreeSpins = 0;
        freeSpins = 0;
        symbolZones[2]  = "Free Spins";
        freeSpinText.innerHTML = "Free Spins";
        prize = 0;
       /* if(controlSpinCounter < 10 && controlSpins === true){
            spinButton[0].addEventListener('click', controlWheel);
        } */
        if(gameCounter === 9){
            spinButton[0].addEventListener('click', controlWheel);
        }
        else{
            spinButton[0].addEventListener('click', rotate);
            degValue = Math.ceil(3600 + Math.random() * 1000);
        }
    
}


const handleWin = async (deg) => {
    await(waitFor(6000));
    wheel[0].removeEventListener('transitionend', handleWin);
    const winningSymbolNum = Math.ceil(deg / zoneSize);
    prize = symbolZones[winningSymbolNum];
    console.log(prize);
    if(prize === "Free Spins"){
        displayPrize[0].innerHTML = `You have 3 free spins!`;
        prize = 0;
        symbolZones[2] = 10;
        freeSpinText.innerHTML = "10$";
        waitForSpins();

    }
    else if(freeSpins ===  0 && controlSpins === false){
        displayPrize[0].innerHTML = `Your prize is ${prize}$!`;
        spinButton[0].addEventListener('click', rotate);
    }
    else if(controlSpins === true && controlSpinCounter < 10){
                displayPrize[0].innerHTML = `Your prize is ${prize}$!`;
                spinButton[0].addEventListener('click', controlWheel);
    }
    else if(controlSpins === true && controlSpinCounter >= 10){
        controlSpins = false;
        gameCounter = 0;
        controlSpinCounter = 0;
        displayPrize[0].innerHTML = `Your prize is ${prize}$!`;
        randomFiftyDollars = 0;
        randomFiveDollars = 0;
        degFromFirstControledSpin = 0;
        degFromSecondControlledSpin = 0;
        spinButton[0].addEventListener('click', rotate);
    }

}
let realDeg = 0;
spinButton[0].addEventListener('click', rotate)

function rotate(){
    gameCounter += 1;
   if(gameCounter < 10){
        spinButton[0].removeEventListener('click', rotate);
        wheel[0].style.transform = `rotate(${degValue}deg)`;
        realDeg = degValue % 360;
        degValue += Math.ceil(3600 + Math.random() * 1000);

        
        wheel[0].addEventListener('transitionend', handleWin(realDeg))
        
    } 
    else if(gameCounter === 10){
        controlWheel();
    }
};

let controlSpinCounter = 0;
let randomFiftyDollars = 0;
let randomFiveDollars = 0;
let degFromFirstControledSpin = 0;
let degFromSecondControlledSpin = 0;
let spinDeg = 0

function controlWheel(){
    controlSpins = true;
    if(controlSpinCounter % 2 === 0 && controlSpinCounter <= 6){
        randomFiftyDollars = Math.floor(3600 + Math.random() * 20) + 1;
        degFromFirstControledSpin = randomFiftyDollars;
        spinButton[0].removeEventListener('click', rotate);
        spinButton[0].removeEventListener('click', controlWheel);
        wheel[0].style.transform = `rotate(${randomFiftyDollars}deg)`;
        gameCounter += 1;
        controlSpinCounter += 1;
        realDeg = randomFiftyDollars % 360;
         
        wheel[0].addEventListener('transitionend', handleWin(realDeg));
    }
    else if(controlSpinCounter % 2 === 1 && controlSpinCounter <= 6){
        spinDeg = Math.floor(3600 + degFromFirstControledSpin + Math.floor(Math.random() * 120) + 62);
        spinButton[0].removeEventListener('click', controlWheel);
        wheel[0].style.transform = `rotate(${spinDeg}deg)`;
        gameCounter += 1;
        controlSpinCounter += 1;
        realDeg = spinDeg % 360;

        wheel[0].addEventListener('transitionend', handleWin(realDeg))

    }
    else if(controlSpinCounter % 2 === 1 && controlSpinCounter > 6){
        randomFiveDollars = 3600 + Math.floor(Math.random() * 10) + 65;
        degFromSecondControlledSpin = randomFiveDollars;
        spinButton[0].removeEventListener('click', controlWheel);
        wheel[0].style.transform = `rotate(${randomFiveDollars}deg)`;
        gameCounter += 1;
        controlSpinCounter += 1;
        realDeg = randomFiveDollars % 360;
         
        wheel[0].addEventListener('transitionend', handleWin(realDeg))
    }
    else if(controlSpinCounter % 2 === 0 && controlSpinCounter > 6){
        spinDeg = Math.floor(3600 + degFromSecondControlledSpin + Math.floor(Math.random() * 120) + 62);
        spinButton[0].removeEventListener('click', controlWheel);
        wheel[0].style.transform = `rotate(${spinDeg}deg)`;
        gameCounter += 1;
        controlSpinCounter += 1;
        realDeg = spinDeg % 360;

        wheel[0].addEventListener('transitionend', handleWin(realDeg));
    }


}


