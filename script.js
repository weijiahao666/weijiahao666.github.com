// script.js
let score = 0;
let activeHoles = [];
let moleAppearanceTime = 800;
let gameDuration = 30000; // 30 seconds by default
let moleImages = ['mole1.png', 'mole2.png', 'mole3.png', 'mole4.png', 'mole5.png'];
let misses = 0;
let maxMisses = 6; // Default to easy level

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
        if (hole.classList.contains('mole')) {
            misses++;
            document.getElementById('misses').textContent = misses;
            if (misses > maxMisses) {
                endGame();
                return;
            }
        }
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
    misses = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('misses').textContent = misses;
    document.getElementById('end-message').classList.add('hidden');
    document.getElementById('restart-game').classList.add('hidden');
    const gameInterval = setInterval(showMole, moleAppearanceTime);
    setTimeout(() => {
        clearInterval(gameInterval);
        endGame();
    }, gameDuration);
}

function endGame() {
    hideMoles();
    const audio = new Audio('end-sound.mp3');
    audio.play();
    document.getElementById('end-message').classList.remove('hidden');
    document.getElementById('restart-game').classList.remove('hidden');
}

document.querySelectorAll('.hole').forEach(hole => {
    hole.addEventListener('click', hitMole);
});

document.getElementById('start-game').addEventListener('click', () => {
    const speed = document.getElementById('speed').value;
    const difficulty = document.getElementById('difficulty').value;

    moleAppearanceTime = speed === 'fast' ? 600 : 1000;
    gameDuration = difficulty === 'hard' ? 20000 : 30000;
    maxMisses = difficulty === 'hard' ? 4 : 6;

    document.getElementById('start-page').classList.add('hidden');
    document.getElementById('game-page').classList.remove('hidden');
    startGame();
});

document.getElementById('restart-game').addEventListener('click', () => {
    document.getElementById('game-page').classList.add('hidden');
    document.getElementById('ad-video').classList.remove('hidden');
    const adVideo = document.getElementById('ad');
    adVideo.currentTime = 0; // Reset video to start
    adVideo.play();
});

document.getElementById('ad').addEventListener('ended', () => {
    document.getElementById('ad-video').classList.add('hidden');
    document.getElementById('start-page').classList.remove('hidden');
});

document.getElementById('close-ad').addEventListener('click', () => {
    const adVideo = document.getElementById('ad');
    adVideo.pause();
    adVideo.currentTime = 0; // Reset video to start
    document.getElementById('ad-video').classList.add('hidden');
    document.getElementById('start-page').classList.remove('hidden');
});
