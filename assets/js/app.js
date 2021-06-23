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
    speed: 2,
    traffic: 3,
}

const getQuantityElements = heightElement => {
    return Math.floor(document.documentElement.clientHeight /heightElement  + 1);
};

const moveRoad = () => {
    let lines = document.querySelectorAll('.line');
    lines.forEach(line => {
        line.y += setting.speed;
        line.style.top = `${line.y}px`;

        if(line.y >= document.documentElement.clientHeight) line.y = -100;
    });
};

const moveEnemy = () => {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(item => {
        item.y += setting.speed / 2;
        item.style.top = `${item.y}px`; 
        if(item.y >= document.documentElement.clientHeight) {
            item.y = - 100 * setting.traffic;
            item.style.left = `${Math.floor((Math.random() * (gameArea.offsetWidth - 50)))}px`;
        }
    });

};

const startGame = function() {
    start.classList.add('hide');

    for (let i = 0; i < getQuantityElements(50); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = `${(i*100)}px`;
        line.y = i * 100;
        gameArea.appendChild(line)
    }

    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i+1);
        enemy.style.top = `${enemy.y}px`;
        enemy.style.left = `${Math.floor((Math.random() * (gameArea.offsetWidth - 50)))}px`;
        enemy.style.background = 'transparent url(assets/images/enemy2.png) center / cover no-repeat';
        gameArea.appendChild(enemy);
    }

    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
};

const playGame = () => {
    if(setting.start) {
    moveRoad();
    moveEnemy();
        if(keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;                                            
        };
        if(keys.ArrowRight && setting.x < gameArea.offsetWidth - car.offsetWidth) {
            setting.x += setting.speed;
        };
        if(keys.ArrowDown && setting.y < gameArea.offsetHeight - car.offsetHeight) {
            setting.y += setting.speed;
        };
        if(keys.ArrowUp && setting.y > 0) {
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