// script.js
let score = 0;
let activeHoles = [];
let moleAppearanceTime = 800;
let gameDuration = 30000; // 30 seconds by default
let moleImages = ['mole1.png', 'mole2.png', 'mole3.png', 'mole4.png', 'mole5.png'];
let rankings = [];
let gameInterval;
let gameTimeout;

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
    document.getElementById('end-message').classList.add('hidden');
    document.getElementById('restart-game').classList.add('hidden');
    gameInterval = setInterval(showMole, moleAppearanceTime);
    gameTimeout = setTimeout(endGame, gameDuration);
}

function endGame() {
    clearInterval(gameInterval);
    clearTimeout(gameTimeout);
    hideMoles();
    if (score >= 100) {
        document.getElementById('end-message').classList.remove('hidden');
        const endAudio = new Audio('end-sound.mp3');
        endAudio.play();
        // Add end animation code here
    }
    rankings.push(score);
    updateRankings();
    document.getElementById('restart-game').classList.remove('hidden');
    document.querySelectorAll('.hole').forEach(hole => {
        hole.removeEventListener('click', hitMole);
    });
}

function updateRankings() {
    const rankingsList = document.getElementById('rankings-list');
    rankingsList.innerHTML = '';
    rankings.sort((a, b) => b - a);
    rankings.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `第${index + 1}名: ${score}分`;
        rankingsList.appendChild(listItem);
    });
}

document
