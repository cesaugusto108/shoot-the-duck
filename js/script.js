"use strict";

const gameInitial = document.querySelector(".game-initial");
const yes = document.getElementById("yes");
const no = document.getElementById("no");
const target = document.getElementById("target");
const background = document.querySelector(".game-background");
const time = document.getElementById("time");
const timeHeader = document.getElementById("time-header");
const massacre = document.querySelector(".massacre");
const doubleMassacre = document.querySelector(".double_massacre");
const win = document.querySelector(".win");
const gameOver = document.querySelector(".game-over");
const gamePanel = document.querySelector(".game-panel");
const gameOptions = document.querySelector(".game-options");
const infiniteModeSwitch = document.getElementById("infinite-mode-switch");
const hearts = document.querySelector(".hearts");
const heart1 = document.getElementById("heart1");
const heart2 = document.getElementById("heart2");
const heart3 = document.getElementById("heart3");
const infiniteModeMessage = document.querySelector(".infinite-mode");
const sequence = document.getElementById("sequence");
const points = document.getElementById("points");
const optionsBtn = document.getElementById("options-button");
const startBtn = document.getElementById("start");
const restartBtn = document.getElementById("restart");
const continueBtn = document.getElementById("continue");
const buttons = document.querySelectorAll("button");

const reload = new Audio("assets/sounds/reload.mp3");
const shot = new Audio("assets/sounds/shot.mp3");
const gameStartSound = new Audio("assets/sounds/game-start.wav");
const buttonSound = new Audio("assets/sounds/button.wav");

let count = 0;
let interval = 1000;
let timeCountdown = null;
let targetInterval = null;
let gameStartSoundPlayRepeat = null;

const gameSettings = {
      soundOn: false,
      infiniteMode: false,
};

const gameStats = {
      score: 0,
      lives: 3,
      onSequence: false,
      shotBirdsInSequence: 0,
      timeLeft: 60,
};

// toca o som inicial da tela de apresentação
function gameStartSoundPlay(mode) {
      if (mode === true) gameStartSound.play();
      else gameStartSound.pause();
}

// toca o som dos botões
function buttonSoundPlay() {
      const playButtonSound = () => buttonSound.play();
      buttons.forEach((button) => {
            button.addEventListener("click", playButtonSound);
      });
}

// carrega tela principal do jogo
function gameLoad() {
      if (this.id === "yes") gameSettings.soundOn = true;

      gameInitial.style.display = "none";
      if (gameSettings.soundOn === true) gameStartSoundPlay(true);
      gameStartSoundPlayRepeat = setInterval(() => {
            if (gameSettings.soundOn === true) gameStartSoundPlay(true);
      }, 3000);
      background.style.display = "block";
      background.style.opacity = "0.4";
      gameOptions.style.display = "flex";
      if (gameSettings.soundOn === true) buttonSoundPlay();
}

// reinicia o jogo
function gameRestart() {
      gameStats.score = 0;
      gameStats.lives = 3;
      gameStats.onSequence = false;
      gameStats.shotBirdsInSequence = 0;
      gameStats.timeLeft = 60;
      heart1.style.display = "block";
      heart2.style.display = "block";
      heart3.style.display = "block";
      gameOver.style.display = "none";
      win.style.display = "none";

      gameRun();
}

// carrega tela de opções durante o jogo
function gameOptionsLoad() {
      clearInterval(timeCountdown);
      clearInterval(targetInterval);

      if (gameSettings.soundOn === true) gameStartSoundPlay(true);
      gameStartSoundPlayRepeat = setInterval(() => {
            if (gameSettings.soundOn === true) gameStartSoundPlay(true);
      }, 3000);

      gamePanel.style.display = "none";
      background.style.opacity = "0.4";
      gameOptions.style.display = "flex";
      startBtn.style.display = "none";
      restartBtn.style.display = "block";
      continueBtn.style.display = "block";

      restartBtn.addEventListener("click", gameRestart);
}

// Mostra o alvo na tela
function showTarget() {
      const size = () => Math.trunc((Math.random() * 6 + 3) * 10);
      const positionY = () => Math.trunc(Math.random() * 50 + 1);
      const positionX = () => {
            if (window.visualViewport.width < 460) return Math.trunc(Math.random() * 70 + 1);
            else return Math.trunc(Math.random() * 90 + 1);
      };

      target.style.display = "block";
      target.style.mixBlendMode = "normal";
      target.style.height = `${size()}px`;
      target.style.left = `${positionX()}vw`;
      target.style.top = `${positionY()}vh`;

      rotate();
}

// muda a direção do pato
function rotate() {
      switch (Math.trunc(Math.random() * 6)) {
            case 0:
                  target.style.transform = "rotateY(0deg) rotateZ(0deg)";
                  break;
            case 1:
                  target.style.transform = "rotateY(0deg) rotateZ(15deg)";
                  break;
            case 2:
                  target.style.transform = "rotateY(0deg) rotateZ(345deg)";
                  break;
            case 3:
                  target.style.transform = "rotateY(180deg) rotateZ(0deg)";
                  break;
            case 4:
                  target.style.transform = "rotateY(180deg) rotateZ(15deg)";
                  break;
            case 5:
                  target.style.transform = "rotateY(180deg) rotateZ(345deg)";
                  break;
      }
}

// reproduz efeitos sonoros
function playSounds() {
      const quack = new Audio("assets/sounds/quack.mp3");
      if (gameSettings.soundOn === true) quack.play();

      if (gameStats.shotBirdsInSequence !== 0 && gameStats.shotBirdsInSequence % 20 === 0) {
            doubleMassacre.style.display = "block";
            const laugh2 = new Audio("assets/sounds/laugh2.mp3");
            if (gameSettings.soundOn === true) laugh2.play();
      } else if (gameStats.shotBirdsInSequence !== 0 && gameStats.shotBirdsInSequence % 10 === 0) {
            massacre.style.display = "block";
            const laugh1 = new Audio("assets/sounds/laugh1.mp3");
            if (gameSettings.soundOn === true) laugh1.play();
      } else if (gameStats.shotBirdsInSequence !== 0 && gameStats.shotBirdsInSequence % 9 === 0) {
            const celebrate = new Audio("assets/sounds/celebrate.mp3");
            if (gameSettings.soundOn === true) celebrate.play();
      }
}

// acerta o alvo
function eliminateTarget() {
      playSounds();

      target.style.mixBlendMode = "color-burn";
      gameStats.score += 10;
      gameStats.lives += 1;
      gameStats.onSequence = true;
}

// reproduz o tiro
function shoot() {
      if (gameSettings.soundOn === true) reload.play();
      if (gameSettings.soundOn === true) shot.play();
}

// checa se o jogo está numa sequência de acertos
function checkSequence() {
      if (gameStats.onSequence !== false) {
            count += 1;
            gameStats.shotBirdsInSequence = count;
      } else {
            gameStats.shotBirdsInSequence = 0;
            count = 0;
      }
}

// recupera vidas
function recoverLives() {
      if (gameStats.lives < 3 && gameStats.shotBirdsInSequence !== 0 && gameStats.shotBirdsInSequence % 10 === 0) {
            gameStats.lives += 1;

            switch (gameStats.lives) {
                  case 2:
                        heart2.style.display = "block";
                        break;
                  case 3:
                        heart3.style.display = "block";
                        break;
            }
      }
}

// apaga os corações (vidas) na tela
function hideHearts() {
      switch (gameStats.lives) {
            case 2:
                  heart3.style.display = "none";
                  break;
            case 1:
                  heart2.style.display = "none";
                  break;
            case 0:
                  heart1.style.display = "none";
                  break;
      }
}

// estilo de modo infinito
function infiniteModeOn() {
      hearts.style.display = "none";
      timeHeader.style.display = "none";
      infiniteModeMessage.style.display = "block";
}

// sem modo infinito
function infiniteModeOff() {
      hearts.style.display = "flex";
      timeHeader.style.display = "block";
      infiniteModeMessage.style.display = "none";
}

// roda o jogo
function gameRun() {
      clearInterval(gameStartSoundPlayRepeat);
      gameStartSoundPlay(false);

      gamePanel.style.display = "flex";
      gameOptions.style.display = "none";
      background.style.opacity = "1";
      time.innerText = 60;
      optionsBtn.addEventListener("click", gameOptionsLoad);

      if (infiniteModeSwitch.checked === true) {
            gameSettings.infiniteMode = true;
            infiniteModeOn();
      } else {
            gameSettings.infiniteMode = false;
            infiniteModeOff();
      }

      background.addEventListener("click", shoot);

      timeCountdown = setInterval(() => {
            gameStats.timeLeft -= 1;
            time.innerText = gameStats.timeLeft;
      }, 1000);

      targetInterval = setInterval(() => {
            massacre.style.display = "none";
            doubleMassacre.style.display = "none";

            showTarget();
            target.addEventListener("click", eliminateTarget);
            checkSequence();
            recoverLives();

            sequence.innerText = gameStats.shotBirdsInSequence;
            points.innerText = gameStats.score;

            // encerra o jogo com vitória ou derrota
            function finishGame() {
                  if (gameSettings.infiniteMode === false) {
                        if (gameStats.lives === 0) {
                              clearInterval(targetInterval);
                              clearInterval(timeCountdown);
                              target.style.display = "none";
                              gameOver.style.display = "block";
                        } else if (gameStats.timeLeft === 0 && gameStats.lives > 0) {
                              clearInterval(targetInterval);
                              clearInterval(timeCountdown);
                              target.style.display = "none";
                              win.style.display = "block";
                        }
                  }
            }
            finishGame();

            gameStats.onSequence = false;

            if (gameSettings.infiniteMode === false) hideHearts();

            gameStats.lives -= 1;
      }, interval);
}

yes.addEventListener("click", gameLoad);
no.addEventListener("click", gameLoad);
startBtn.addEventListener("click", gameRun);
