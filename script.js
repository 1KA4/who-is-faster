var shape = document.getElementById("shape");
var gameResult = document.getElementById("result");
var btn = document.getElementById("btn");
var gameArea = document.getElementById("gameArea");
var levels = document.querySelector(".levels");
var someShape, x, y, score, level = 0;
var userScore;
var userBestScore = {
    bb: 0,
    hard: 0,
    medium: 0,
    child: 0
};

let bb = document.querySelector(".bb");
let hard = document.querySelector(".hard");
let medium = document.querySelector(".medium");
let child = document.querySelector(".child");
getUserScoreFromLS();


function setLevel(lvl){
    level = lvl;

    levels.style.display = "none";
    gameArea.style.display = "flex";
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getUserWidth() { return document.getElementsByTagName('body')[0].clientWidth; }
function getUserHeight() { return document.getElementsByTagName('body')[0].clientHeight; }

function updateResultBoard(){
    bb.innerText = "BigBoss: " + userBestScore.bb;
    hard.innerText = "Hard: " + userBestScore.hard;
    medium.innerText = "Medium: " + userBestScore.medium;
    child.innerText = "Child: " + userBestScore.child;
}


// Set Score to local Storage
function setUserScoreToLS(){
    localStorage.setItem('gameStorage', JSON.stringify(userBestScore));
}


// Get Score from local Storage
function getUserScoreFromLS(){
    if(localStorage.getItem('gameStorage') == null){
        setUserScoreToLS();
        console.log("lo0l");
    }
    
    userBestScore = JSON.parse(localStorage.getItem('gameStorage'));

    updateResultBoard();
}

function start() {
    gameResult.setAttribute("hidden", "hidden");
    
    shape.removeAttribute("hidden");
    shape.setAttribute("class", "shape2");
    shape.style.width = level + "px";
    shape.style.height = level + "px";
    y = getRandomInt(100, getUserHeight()-level);
    x = getRandomInt(100, getUserWidth()-level);
    shape.style.top = y + "px";
    shape.style.left = x + "px";
    userScore = new Date().getTime();
}

function stop() {
    shape.setAttribute("hidden", "hidden");
   
    score = (new Date().getTime()) - userScore;
    gameResult.innerHTML = "Your score is " + score + " milliseconds." + (score < 400 ? " Gratulation!" : " Try again!");
    gameResult.removeAttribute("hidden");

    if(level == 10 && (userBestScore.bb > score || userBestScore.bb == 0)){userBestScore.bb = score;}
    if(level == 20 && (userBestScore.hard > score || userBestScore.hard == 0)){userBestScore.hard = score;}
    if(level == 50 && (userBestScore.medium > score || userBestScore.medium == 0)){userBestScore.medium = score;}
    if(level == 100 && (userBestScore.child > score || userBestScore.child == 0)){userBestScore.child = score;}

    updateResultBoard();
    setUserScoreToLS();
}
