"use strict"

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
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom && 
            carRect.right >= enemyRect.left && 
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {
                setting.start = false;
                console.log('DTP');
                start.classList.remove('hide');
                start.style.top = score.offsetHeight;
            
        }
        item.y += setting.speed / 2;
        item.style.top = `${item.y}px`; 
        if(item.y >= document.documentElement.clientHeight) {
            item.y = - 100 * setting.traffic;
            item.style.left = `${Math.floor((Math.random() * (gameArea.offsetWidth - 50)))}px`;
        }
    });
};

const getRandomEnemy = max => Math.floor((Math.random() * max) + 1);
