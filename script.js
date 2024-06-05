// script.js
let score = 0;
let activeHole = null;

function getRandomHole() {
    const holes = document.querySelectorAll('.hole');
    const randomIndex = Math.floor(Math.random() * holes.length);
    return holes[randomIndex];
}

function showMole() {
    if (activeHole) {
        activeHole.classList.remove('mole');
    }
    activeHole = getRandomHole();
    activeHole.classList.add('mole');
}

function startGame() {
    setInterval(showMole, 1000);
}

function hitMole(event) {
    if (event.target.classList.contains('mole')) {
        score++;
        document.getElementById('score').textContent = score;
        event.target.classList.remove('mole');
    }
}

document.querySelectorAll('.hole').forEach(hole => {
    hole.addEventListener('click', hitMole);
});

startGame();
