// script.js
let score = 0;
let misses = 0;
let maxMisses = 10;
let moleAppearanceTime = 800;
let gameDuration = 30000; // 30 seconds by default
let moleImages = ['mole1.png', 'mole2.png', 'mole3.png', 'mole4.png', 'mole5.png'];
let activeHoles = [];
let moleTimeouts = [];

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

    activeHoles.forEach(hole => {
        const timeoutId = setTimeout(() => {
            if (hole.classList.contains('mole') || hole.classList.contains('bomb')) {
                misses++;
                document.getElementById('misses').textContent = misses;
                if (misses >= maxMisses) {
                    endGame();
                }
            }
        }, moleAppearanceTime);
        moleTimeouts.push(timeoutId);
    });
}

function hideMoles() {
    activeHoles.forEach(hole => {
        hole.classList.remove('mole', 'bomb');
        hole.style.backgroundImage = '';
    });
    activeHoles = [];
    moleTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    moleTimeouts = [];
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

    const intervalId = setInterval(() => {
        showMole();
        if (misses >= maxMisses) {
            clearInterval(intervalId);
            endGame();
        }
    }, moleAppearanceTime);
    setTimeout(() => {
        clearInterval(intervalId);
        endGame();
    }, gameDuration);
}

function endGame() {
    hideMoles();
    document.getElementById('end-message').classList.remove('hidden');
    document.getElementById('restart-game').classList.remove('hidden');
    if (score > 100) {
        document.getElementById('end-message').textContent = '恭喜你，游戏通过！';
        const audio = new Audio('end-sound.mp3');
        audio.play();
    } else {
        document.getElementById('end-message').textContent = '游戏结束，得分未达标！';
    }
}

document.querySelectorAll('.hole').forEach(hole => {
    hole.addEventListener('click', hitMole);
});

document.getElementById('start-game').addEventListener('click', () => {
    const speed = document.getElementById('speed').value;
    const difficulty = document.getElementById('difficulty').value;

    moleAppearanceTime = speed === 'fast' ? 600 : 1000;
    gameDuration = difficulty === 'hard' ? 20000 : 30000;
    maxMisses = difficulty === 'hard' ? 8 : 10;

    document.getElementById('start-page').classList.add('hidden');
    document.getElementById('game-page').classList.remove('hidden');
    startGame();
});

document.getElementById('restart-game').addEventListener('click', () => {
    document.getElementById('game-page').classList.add('hidden');
    document.getElementById('ad-video').classList.remove('hidden');
    const adVideo = document.getElementById('ad');
    adVideo.src = Math.random() < 0.5 ? 'ad1.mp4' : 'ad2.mp4';
    adVideo.play();
});

document.getElementById('ad').addEventListener('ended', () => {
    document.getElementById('ad-video').classList.add('hidden');
    document.getElementById('start-page').classList.remove('hidden');
});

document.getElementById('close-ad').addEventListener('click', () => {
    document.getElementById('ad').pause();
    document.getElementById('ad-video').classList.add('hidden');
    document.getElementById('start-page').classList.remove('hidden');
});
