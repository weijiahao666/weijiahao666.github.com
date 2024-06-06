// index.js
let gameSpeed = 1000; // Default slow speed
let gameDifficulty = 1; // Default easy difficulty

document.getElementById('speed-slow').addEventListener('click', () => {
    gameSpeed = 1000; // 1 second
});
document.getElementById('speed-fast').addEventListener('click', () => {
    gameSpeed = 500; // 0.5 second
});

document.getElementById('difficulty-easy').addEventListener('click', () => {
    gameDifficulty = 1; // 1 mole at a time
});
document.getElementById('difficulty-hard').addEventListener('click', () => {
    gameDifficulty = 3; // 1-3 moles at a time
});

document.getElementById('start-button').addEventListener('click', () => {
    localStorage.setItem('gameSpeed', gameSpeed);
    localStorage.setItem('gameDifficulty', gameDifficulty);
    window.location.href = 'game.html';
});
