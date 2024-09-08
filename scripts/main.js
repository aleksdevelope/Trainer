import showResult from './showResult';
import getRandomInt from './random';
import anime from './anime.es';

let begin = document.querySelector(".begin");
let progress = document.getElementById("prog");
let buttons = document.querySelector(".buttons");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

document.addEventListener("keydown", startGame, {
    once: true
});

function reloadDocument() {
    document.location.reload();
}

anime({
    targets: ".anim-elem",
    translateX: [-50, 50],
    easing: "linear",
    direction: "alternate",
    duraton: 1000,
    loop: true
});

function getData() {
    fetch("https://gist.githubusercontent.com/isakura313/b705fd423e996a56b35b18b876458f18/raw/48023a7ffa598585f80303557e68b2011f776849/main.js")
        .then(res => res.json())
        .then(data => {

            readData(data);
        })
        .catch(err => {
            console.warn("произошла ошибка");
            console.warn(err.name);
        })
}
getData();

async function readData(info) {
    console.table(info);
    console.log(info.symbol_colors)
    let numberOfLevel = 0;
    let errorSound = new Audio('sounds/error_sound.wav');
    let successSound = new Audio('sounds/success_sound.wav');
    let failSound = new Audio('sounds/fail_sound.wav');
    let pressSound = new Audio('sounds/press_sound.wav');

    let modal = document.querySelector(".modal");
    let targetError = document.querySelector(".target_error");
    let errorPanel = document.querySelector(".error-panel");
    let promo = document.querySelector(".promo");
    let modalClose = document.querySelector(".modal-close");
    let levelName = document.querySelector(".level-name");
    let begin = document.querySelector(".begin");
    let progress = document.getElementById("prog");
    let buttons = document.querySelector('.buttons');

    document.addEventListener("keydown", startGame, {
        once: true
    });

    function startGame(keyCode) {
        if (keyCode.key == "Enter") {
            errorPanel.classList.remove("is-hidden");
            pressSound.play();
            drawBoard();
            begin.remove();
            mainGame();
        }
    }

    function drawBoard(info) {
        let levelInfoSymbols = info.level_info[numberOfLevel].symbols;
        let levelName = info.level_info[numberOfLevel].level_name;
        levelName.innerHTML = levelName;
        let colorsSymbols = info.symbol_colors;

        for (let i = 0; i < 20; i++) {
            let randomIndex = getRandomInt(levelInfoSymbols.length);
            if (levelInfoSymbols[randomIndex] == ' ') {
                levelInfoSymbols[randomIndex] = "space";
            }
            buttons.insertAdjacentHTML('afterbegin', `<button class = 'game-buttons button is-large 
            ${colorsSymbols[randomIndex]}' id ='${levelInfoSymbols[randomIndex]}'>${levelInfoSymbols[randomIndex]}</button>`);
        }
    }
    function mainGame() {
        drawBoard(info);
        document.addEventListener("keydown", pressButton);
    }

    let allTry = 0;
    let countRight = 0;
    let errorsCount = 0;

    function pressButton(keyCode) {
        let gameButtons = document.querySelectorAll(".game-buttons");

        if (keyCode.key == gameButtons[0].id) {
            gameButtons[0].remove();
            countRight++;
            pressSound.play();
            allTry++;
        } else if (keyCode.key == ' ' && gameButtons[0].id == "space") {
            gameButtons[0].remove();
            countRight++;
        } else {
            errorsCount++;
            progress.value = errorsCount;

            if (errorsCount > 20) {
                numberOfLevel = 0;
                let reload = confirm("Вы совершили 20 ошибок. Хотите попробовать ещё раз?");
                if (reload) {
                    reloadDocument();
                } else {
                    addEventListener("keyup", reloadDocument);
                }
            }
        }

        if (countRight == 20) {
            countRight = 0;
            numberOfLevel++;
            console.log(numberOfLevel);
            if (numberOfLevel == 3) {
                alert("GameOver");
                modal.classList.add("is-active");
                showResult(targetError, errorsCount)
                modalClose.onclick = function () {
                    modal.classList.remove("is-active");
                    window.location.reload();
                }
            } else {
                let win = confirm("Хотите продолжить?");
                if (win) {
                    
                }
            }
            mainGame();
        }
    }
}
