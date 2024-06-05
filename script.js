// script.js
let score = 0;
let activeHoles = [];
const gameDuration = 30000; // 30 seconds
const moleAppearanceTime = 800; // 800 milliseconds

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
    setInterval(showMole, moleAppearanceTime);
    setTimeout(endGame, gameDuration);
}

function endGame() {
    hideMoles();
    if (score >= 50) {
        document.getElementById('end-message').classList.remove('hidden');
    }
    document.querySelectorAll('.hole').forEach(hole => {
        hole.removeEventListener('click', hitMole);
    });
}

document.querySelectorAll('.hole').forEach(hole => {
    hole.addEventListener('click', hitMole);
});

startGame();
