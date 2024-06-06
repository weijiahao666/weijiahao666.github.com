// script.js
let score = 0;
let activeHoles = [];
let gameInterval;
let moleAppearanceTime = 1000; // Default 1000ms
let difficulty = 'easy'; // Default difficulty
const moleImages = ['mole1.png', 'mole2.png', 'mole3.png', 'mole4.png', 'mole5.png'];

function getRandomHole() {
    const holes = document.querySelectorAll('.hole');
    return holes[Math.floor(Math.random() * holes.length)];
}

function getRandomMoleImage() {
    return moleImages[Math.floor(Math.random() * moleImages.length)];
}

function showMole() {
    hideMoles();
    const numOfMoles = Math.floor(Math.random() * (difficulty === 'easy' ? 3 : 6)) + 1; // 1 to 3 moles for easy, 1 to 6 for hard
    for (let i = 0; i < numOfMoles; i++) {
        const hole = getRandomHole();
        if (!activeHoles.includes(hole)) {
            hole.style.backgroundImage = `url(${getRandomMoleImage()})`;
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
        if (score >= 100) {
            endGame(true);
        }
    }
}

function startGame() {
    gameInterval = setInterval(showMole, moleAppearanceTime);
    setTimeout(endGame, 30000); // 30 seconds game duration
}

function endGame(success = false) {
    clearInterval(gameInterval);
    hideMoles();
    if (success) {
        document.getElementById('end-message').classList.remove('hidden');
        const endAudio = new Audio('success-sound.mp3');
        endAudio.play();
    }
    document.getElementById('restart-button').classList.remove('hidden');
}

document.querySelectorAll('.hole').forEach(hole => {
    hole.addEventListener('click', hitMole);
});

document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('start-page').classList.add('hidden');
    document.getElementById('game-page').classList.remove('hidden');
    startGame();
});

document.getElementById('restart-button').addEventListener('click', () => {
    document.getElementById('start-page').classList.remove('hidden');
    document.getElementById('game-page').classList.add('hidden');
    document.getElementById('end-message').classList.add('hidden');
    document.getElementById('restart-button').classList.add('hidden');
    score = 0;
    document.getElementById('score').textContent = score;
});

document.getElementById('difficulty-button').addEventListener('click', () => {
    if (difficulty === 'easy') {
        difficulty = 'hard';
        document.getElementById('difficulty-button').textContent = '选择难度：困难';
    } else {
        difficulty = 'easy';
        document.getElementById('difficulty-button').textContent = '选择难度：简单';
    }
});

document.getElementById('speed-button').addEventListener('click', () => {
    if (moleAppearanceTime === 1000) {
        moleAppearanceTime = 500;
        document.getElementById('speed-button').textContent = '选择速度：快';
    } else {
        moleAppearanceTime = 1000;
        document.getElementById('speed-button').textContent = '选择速度：慢';
    }
});
