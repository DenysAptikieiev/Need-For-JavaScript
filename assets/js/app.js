"use strict";

const score = document.querySelector('.score'),
    game = document.querySelector('.game'),
    start = document.querySelector('.start button'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');  
    car.classList.add('red-car');

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
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
};

const playGame = () => {
    console.log("Play game!");
    if(setting.start) {
        if(keys.ArrowLeft) {
            setting.x -= setting.speed;                                            
        };
        if(keys.ArrowRight) {
            setting.x += setting.speed;
        };
        if(keys.ArrowDown) {
            setting.y += setting.speed;
        };
        if(keys.ArrowUp) {
            setting.y -= setting.speed;
        };
        car.style.left = `${setting.x}px`;
        car.style.top = `${setting.y}px`;
        requestAnimationFrame(playGame);    
    }   
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