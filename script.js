// script.js
let score = 0;
let activeHoles = [];
const gameDuration = 30000; // 30 seconds
const moleAppearanceTime = 500; // 500 milliseconds
let gameInterval;
let endTimeout;

function getRandomHole() {
    const holes = document.querySelectorAll('.hole');
    return holes[Math.floor(Math.random() * holes.length)];
}

function showMole() {
    hideMoles();
    const numOfMoles = Math.floor(Math.random() * 4) + 1; // 1 to 4 moles
    for (let i = 0; i < numOfMoles; i++) {
        const hole = getRandomHole();
        if (!activeHoles.includes(hole)) {
            hole.classList.add('mole');
            activeHoles.push(hole);
        }
    }
}

function hideMoles() {
    activeHoles.forEach(hole => hole.classList.remove('mole'));
    activeHoles = [];
}

function hitMole(event) {
    if (event.target.classList.contains('mole')) {
        score++;
        document.getElementById('score').textContent = score;
        const audio = document.getElementById('hit-sound');
        audio.play();
        event.target.classList.remove('mole');
        activeHoles = activeHoles.filter(hole => hole !== event.target);
        if (score >= 100) {
            endGame(true);
        }
    }
}

function startGame() {
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('end-message').classList.add('hidden');
    document.getElementById('restart').classList.add('hidden');
    document.getElementById('start').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    gameInterval = setInterval(showMole, moleAppearanceTime);
    endTimeout = setTimeout(() => endGame(false), gameDuration);
}

function endGame(passed) {
    clearInterval(gameInterval);
    clearTimeout(endTimeout);
    hideMoles();
    const endSound = document.getElementById('end-sound');
    endSound.play();
    const endMessage = document.getElementById('end-message');
    if (passed) {
        endMessage.textContent = '恭喜你，游戏通过！';
    } else {
        endMessage.textContent = '游戏结束，重新开始。';
    }
    endMessage.classList.remove('hidden');
    document.getElementById('restart').classList.remove('hidden');
}

document.querySelectorAll('.hole').forEach(hole => {
    hole.addEventListener('click', hitMole);
});

document.getElementById('start').addEventListener('click', startGame);
document.getElementById('restart').addEventListener('click', startGame);
