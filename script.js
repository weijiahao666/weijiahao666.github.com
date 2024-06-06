// script.js
let score = 0;
let activeHoles = [];
let moleAppearanceTime = 1000; // Default to 1 second
let gameInterval;
let moleImages = [
    'mole1.png',
    'mole2.png',
    'mole3.png',
    'mole4.png',
    'mole5.png'
];

function getRandomHole() {
    const holes = document.querySelectorAll('.hole');
    return holes[Math.floor(Math.random() * holes.length)];
}

function getRandomMoleImage() {
    return moleImages[Math.floor(Math.random() * moleImages.length)];
}

function showMole() {
    hideMoles();
    const numOfMoles = Math.floor(Math.random() * 4) + 1; // 1 to 4 moles
    for (let i = 0; i < numOfMoles; i++) {
        const hole = getRandomHole();
        if (!activeHoles.includes(hole)) {
            const moleImg = getRandomMoleImage();
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
    score = 0;
    document.getElementById('score').textContent = score;
    gameInterval = setInterval(showMole, moleAppearanceTime);
    setTimeout(endGame, 30000); // End game after 30 seconds
}

function endGame() {
    clearInterval(gameInterval);
    hideMoles();
    if (score >= 100) {
        document.getElementById('end-message').textContent = '恭喜你，游戏通过！';
        document.getElementById('end-message').classList.remove('hidden');
    } else {
        document.getElementById('end-message').textContent = '很遗憾，游戏失败。';
        document.getElementById('end-message').classList.remove('hidden');
    }
    document.getElementById('restart-game').classList.remove('hidden');
    const endAudio = new Audio('end-sound.mp3');
    endAudio.play();
}

function resetGame() {
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('end-message').classList.add('hidden');
    document.getElementById('restart-game').classList.add('hidden');
    window.location.href = 'index.html';
}

document.querySelectorAll('.hole').forEach(hole => {
    hole.addEventListener('click', hitMole);
});

document.getElementById('easy-mode').addEventListener('click', () => {
    moleAppearanceTime = 1000; // 1 second
    startGame();
});

document.getElementById('hard-mode').addEventListener('click', () => {
    moleAppearanceTime = 500; // 0.5 second
    startGame();
});

document.getElementById('slow-speed').addEventListener('click', () => {
    moleAppearanceTime = 1000; // 1 second
});

document.getElementById('fast-speed').addEventListener('click', () => {
    moleAppearanceTime = 500; // 0.5 second
});

document.getElementById('restart-game').addEventListener('click', resetGame);
