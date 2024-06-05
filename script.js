// script.js
let score = 0;
let activeHoles = [];
const maxScore = 100;

const hitSound = new Audio('hit.mp3'); // 添加击毙野兔的声音
const gameOverSound = new Audio('gameover.mp3'); // 添加游戏结束的声音

function getRandomHole() {
    const holes = document.querySelectorAll('.hole');
    const randomIndex = Math.floor(Math.random() * holes.length);
    return holes[randomIndex];
}

function showMole() {
    // 清除之前的野兔
    activeHoles.forEach(hole => hole.classList.remove('mole'));
    activeHoles = [];

    // 随机显示一个或多个野兔
    const numMoles = Math.floor(Math.random() * 3) + 1; // 1到3个野兔
    for (let i = 0; i < numMoles; i++) {
        const hole = getRandomHole();
        hole.classList.add('mole');
        activeHoles.push(hole);
    }
}

function startGame() {
    setInterval(showMole, 1000);
}

function hitMole(event) {
    if (event.target.classList.contains('mole')) {
        score++;
        document.getElementById('score').textContent = score;
        event.target.classList.remove('mole');
        hitSound.play();
        if (score >= maxScore) {
            endGame();
        }
    }
}

function endGame() {
    document.getElementById('game').classList.add('hidden');
    document.getElementById('gameOver').classList.remove('hidden');
    gameOverSound.play();
}

function restartGame() {
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('game').classList.remove('hidden');
    document.getElementById('gameOver').classList.add('hidden');
    activeHoles.forEach(hole => hole.classList.remove('mole'));
    activeHoles = [];
    startGame();
}

document.querySelectorAll('.hole').forEach(hole => {
    hole.addEventListener('click', hitMole);
});

document.getElementById('restart').addEventListener('click', restartGame);

startGame();
