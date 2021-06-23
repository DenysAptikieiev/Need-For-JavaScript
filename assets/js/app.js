"use strict";

const score = document.querySelector('.score'),
    game = document.querySelector('.game'),
    start = document.querySelector('.start button'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');  
    car.classList.add('car');

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
};

const setting = {
    start: false,
    score: 0,
    speed: 3,
}

const startGame = function() {
    start.classList.add('hide');
    setting.start = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame);
};

const playGame = () => {
    console.log("Play game!");
    if(setting.start) requestAnimationFrame(playGame);
};
      
const startRun = event => {
    event.preventDefault();
    keys[event.key] = true;
};

const stopRun = event => {
    event.preventDefault();
    keys[event.key] = false;
};

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

start.addEventListener('click', startGame); 