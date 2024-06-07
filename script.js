// script.js
let score = 0;
let activeHoles = [];
let moleAppearanceTime = 800;
let gameDuration = 30000; // 30 seconds by default
let moleImages = ['mole1.png', 'mole2.png', 'mole3.png', 'mole4.png', 'mole5.png'];

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
    // Randomly add a bomb
    if (Math.random() < 0.2) { // 20% chance to show a bomb
        const hole = getRandomHole();
        if (!activeHoles.includes(hole)) {
            hole.style.backgroundImage = 'url(bomb.png)';
            hole.classList.add('bomb');
            activeHoles.push(hole);
        }
    }
}

function hideMoles() {
    activeHoles.forEach(hole => {
        hole.classList.remove('mole', 'bomb');
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
    } else if (event.target.classList.contains('bomb')) {
        score += 2;
        document.getElementById('score').textContent = score;
        const audio = new Audio('hit-sound.mp3');
        audio.play();
        event.target.classList.remove('bomb');
        event.target.style.backgroundImage = '';
        activeHoles = activeHoles.filter(hole => hole !== event.target);
    }
}

function startGame() {
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('end-message').classList.add('hidden');
    document.getElementById('restart-game').classList.add('hidden');
    setInterval(showMole, moleAppearanceTime);
    setTimeout(endGame, gameDuration);
}

function endGame() {
    hideMoles();
    if (score >= 100) {
        document.getElementById('end-message').classList.remove('hidden');
        const endAudio = new Audio('end-sound.mp3');
        endAudio.play();
        // Add end animation code here
    }
    document.getElementById('restart-game').classList.remove('hidden');
    document.querySelectorAll('.hole').forEach(hole => {
        hole.removeEventListener('click', hitMole);
    });
}

document.querySelectorAll('.hole').forEach(hole => {
    hole.addEventListener('click', hitMole);
});

document.getElementById('start-game').addEventListener('click', () => {
    const speed = document.getElementById('speed').value;
    const difficulty = document.getElementById('difficulty').value;

    moleAppearanceTime = speed === 'fast' ? 600 : 1000;
    gameDuration = difficulty === 'hard' ? 20000 : 30000;

    document.getElementById('start-page').classList.add('hidden');
    document.getElementById('game-page').classList.remove('hidden');
    startGame();
});

document.getElementById('restart-game').addEventListener('click', () => {
    document.getElementById('game-page').classList.add('hidden');
    document.getElementById('ad-video').classList.remove('hidden');
    const adVideo = document.getElementById('ad');
    adVideo.play();
});

document.getElementById('ad').addEventListener('ended', () => {
    document.getElementById('ad-video').classList.add('hidden');
    document.getElementById('start-page').classList.remove('hidden');
});

document.getElementById('close-ad').addEventListener('click', () => {
    document.getElementById('ad-video').classList.add('hidden');
    document.getElementById('start-page').classList.remove('hidden');
});
