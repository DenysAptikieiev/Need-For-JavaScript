"use strict";

const score = document.querySelector('.score'),
    game = document.querySelector('.game'),
    start = document.querySelector('.start button'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');  
    car.classList.add('red-car');

const Max_Enemy = 7;

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
};

const setting = {
    start: false,
    score: 0,
    speed: 5,
    traffic: 1.5,
}

const startGame = function() {
    gameArea.innerHTML = '';
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
        enemy.style.background = `transparent url(assets/images/enemy${getRandomEnemy(Max_Enemy)}.png) center / cover no-repeat`;
        gameArea.appendChild(enemy);
    }
    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);

    // car.style.left = gameArea.offsetwidth / 2 - car.offsetWeight / 2;
    // car.style.top = 'auto';
    // car.style.bootom = `${10}px`;

    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
};

const playGame = () => {
    if(setting.start) {
        setting.score += setting.speed;
        score.innerHTML = `Score:<br> ${setting.score}`;
        moveRoad();
        moveEnemy();
        if(keys.ArrowLeft && setting.x > 0) {
            // setting.x -= setting.speed;                                            
            setting.x --;                                            
        };
        if(keys.ArrowRight && setting.x < gameArea.offsetWidth - car.offsetWidth) {
            // setting.x += setting.speed;
            setting.x++
        };
        if(keys.ArrowDown && setting.y < gameArea.offsetHeight - car.offsetHeight) {
            // setting.y += setting.speed;
            setting.y ++;
        };
        if(keys.ArrowUp && setting.y > 0) {
            // setting.y -= setting.speed;
            setting.y --;
        };
        car.style.left = `${setting.x}px`;
        car.style.top = `${setting.y}px`;
        requestAnimationFrame(playGame);    
    }   
};

const startRun = event => {
    event.preventDefault();
   if(keys.hasOwnProperty(event.key)) keys[event.key] = true;
};

const stopRun = event => {
    event.preventDefault();
    if(keys.hasOwnProperty(event.key)) keys[event.key] = false;
};

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

start.addEventListener('click', startGame); 