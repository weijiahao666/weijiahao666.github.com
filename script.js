// script.js
let score = 0;
let activeHoles = [];
let gameInterval;
let gameDuration;
let moleAppearanceTime;
const moleImages = ['mole1.png', 'mole2.png', 'mole3.png', 'mole4.png', 'mole5.png'];

function getRandomHole() {
    const holes = document.querySelectorAll('.hole');
    return holes[Math.floor(Math.random() * holes.length)];
}

function showMole() {
    hideMoles();
    const numOfMoles = Math.floor(Math.random() * (difficulty === 'easy' ? 2 : 4)) + 1; // 1 to 2 for easy, 1 to 4 for hard
    for (let i = 0; i < numOfMoles; i++) {
        const hole = getRandomHole();
        if (!activeHoles.includes(hole)) {
            const moleImg = moleImages[Math.floor(Math.random() * moleImages.length)];
            hole.style.backgroundImage = `url(${moleImg})`;
            hole.classList.add('mole');
            activeHoles.push(hole);
        }
    }
}

function hideMoles() {
    activeHoles.forEach(hole => {
        hole.classList.remove('mole');
        hole.style.backgroundImage = '';
    });
    activeHoles = [];
}

function hitMole(event) {
    if (event.target.classList.contains('mole')) {
        score++;
        document.getElementById('score').textContent = score;
        const audio = new Audio('hit-sound.mp3');
        audio.play();
        event.target.classList.remove('mole');
        event.target.style.backgroundImage = '';
        activeHoles = activeHoles.filter(hole => hole !== event.target);
    }
}

function startGame() {
    const speed = document.getElementById('speed').value;
    const difficulty = document.getElementById('difficulty').value;

    moleAppearanceTime = speed === 'slow' ? 1000 : 600; // Slow: 1000ms, Fast: 600ms
    gameDuration = difficulty === 'easy' ? 60000 : 30000; // Easy: 60s, Hard: 30s

    gameInterval = setInterval(showMole, moleAppearanceTime);
    setTimeout(endGame, gameDuration);
}

function endGame() {
    clearInterval(gameInterval);
    hideMoles();
    if (score >= 100) {
        document.getElementById('end-message').classList.remove('hidden');
        const audio = new Audio('end-sound.mp3');
        audio.play();
    }
    document.querySelectorAll('.hole').forEach(hole => {
        hole.removeEventListener('click', hitMole);
    });
    document.getElementById('restart-button').classList.remove('hidden');
}

function restartGame() {
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('end-message').classList.add('hidden');
    document.getElementById('restart-button').classList.add('hidden');
    document.getElementById('game-page').classList.add('hidden');
    document.getElementById('start-page').classList.remove('hidden');
    document.querySelectorAll('.hole').forEach(hole => {
        hole.addEventListener('click', hitMole);
    });
}

document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('start-page').classList.add('hidden');
    document.getElementById('game-page').classList.remove('hidden');
    startGame();
});

document.getElementById('restart-button').addEventListener('click', restartGame);

document.querySelectorAll('.hole').forEach(hole => {
    hole.addEventListener('click', hitMole);
});
