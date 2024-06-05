// script.js
let score = 0;
let activeHoles = [];
let gameInterval;
let gameDuration = 30000; // 30 seconds
const moleAppearanceTime = 500; // 500 milliseconds, faster speed

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
        const audio = new Audio('hit-sound.mp3');
        audio.play();
        event.target.classList.remove('mole');
        activeHoles = activeHoles.filter(hole => hole !== event.target);
    }
}

function startGame() {
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('end-message').classList.add('hidden');
    document.getElementById('restart-button').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    gameInterval = setInterval(showMole, moleAppearanceTime);
    setTimeout(endGame, gameDuration);
}

function endGame() {
    clearInterval(gameInterval);
    hideMoles();
    if (score >= 100) {
        document.getElementById('end-message').textContent = '恭喜你，游戏通过！';
        document.getElementById('end-message').classList.remove('hidden');
        const endAudio = new Audio('win-sound.mp3');
        endAudio.play();
    } else {
        document.getElementById('end-message').textContent = '游戏结束，未通过。';
        document.getElementById('end-message').classList.remove('hidden');
    }
    document.getElementById('restart-button').classList.remove('hidden');
}

function restartGame() {
    startGame();
}

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('restart-button').addEventListener('click', restartGame);

document.querySelectorAll('.hole').forEach(hole => {
    hole.addEventListener('click', hitMole);
});
