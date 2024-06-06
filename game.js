// game.js
let score = 0;
let activeHoles = [];
let gameSpeed = localStorage.getItem('gameSpeed');
let gameDifficulty = localStorage.getItem('gameDifficulty');

const moleImages = ['mole1.png', 'mole2.png', 'mole3.png', 'mole4.png', 'mole5.png'];
const gameDuration = 60000; // 1 minute

function getRandomHole() {
    const holes = document.querySelectorAll('.hole');
    return holes[Math.floor(Math.random() * holes.length)];
}

function showMole() {
    hideMoles();
    const numOfMoles = Math.floor(Math.random() * gameDifficulty) + 1; // 1 to gameDifficulty moles
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
        hole.style.backgroundImage = 'none';
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
        event.target.style.backgroundImage = 'none';
        activeHoles = activeHoles.filter(hole => hole !== event.target);
    }
}

function startGame() {
    setInterval(showMole, gameSpeed);
    setTimeout(endGame, gameDuration);
}

function endGame() {
    hideMoles();
    if (score >= 100) {
        document.getElementById('end-message').classList.remove('hidden');
        const audio = new Audio('success-sound.mp3');
        audio.play();
    }
    document.getElementById('restart-button').classList.remove('hidden');
    document.querySelectorAll('.hole').forEach(hole => {
        hole.removeEventListener('click', hitMole);
    });
}

document.getElementById('restart-button').addEventListener('click', () => {
    window.location.href = 'index.html';
});

document.querySelectorAll('.hole').forEach(hole => {
    hole.addEventListener('click', hitMole);
});

startGame();
