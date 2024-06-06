// script.js
let score = 0;
let activeHoles = [];
let moleAppearanceTime = 1000;
let gameInterval;
let moleImages = [
    'mole1.png', 'mole2.png', 'mole3.png', 'mole4.png', 'mole5.png'
];

const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const coverPage = document.getElementById('cover-page');
const gamePage = document.getElementById('game-page');
const scoreDisplay = document.getElementById('score');
const endMessage = document.getElementById('end-message');
const speedSelect = document.getElementById('speed');

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
            const moleImage = moleImages[Math.floor(Math.random() * moleImages.length)];
            hole.style.backgroundImage = `url(${moleImage})`;
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
        scoreDisplay.textContent = score;
        const audio = new Audio('hit-sound.mp3');
        audio.play();
        event.target.classList.remove('mole');
        event.target.style.backgroundImage = '';
        activeHoles = activeHoles.filter(hole => hole !== event.target);

        if (score >= 100) {
            endGame();
        }
    }
}

function startGame() {
    coverPage.classList.add('hidden');
    gamePage.classList.remove('hidden');
    score = 0;
    scoreDisplay.textContent = score;
    gameInterval = setInterval(showMole, moleAppearanceTime);
    document.querySelectorAll('.hole').forEach(hole => {
        hole.addEventListener('click', hitMole);
    });
}

function endGame() {
    clearInterval(gameInterval);
    hideMoles();
    if (score >= 100) {
        endMessage.classList.remove('hidden');
        const endAudio = new Audio('end-sound.mp3');
        endAudio.play();
    }
    restartButton.classList.remove('hidden');
    document.querySelectorAll('.hole').forEach(hole => {
        hole.removeEventListener('click', hitMole);
    });
}

function restartGame() {
    score = 0;
    scoreDisplay.textContent = score;
    endMessage.classList.add('hidden');
    restartButton.classList.add('hidden');
    gameInterval = setInterval(showMole, moleAppearanceTime);
}

startButton.addEventListener('click', () => {
    const speed = speedSelect.value;
    moleAppearanceTime = (speed === 'fast') ? 500 : 1000;
    startGame();
});

restartButton.addEventListener('click', restartGame);
