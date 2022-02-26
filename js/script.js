"use strict";

const target = document.getElementById("target");
const background = document.querySelector(".game-background");
const massacre = document.querySelector(".massacre");
const doubleMassacre = document.querySelector(".double_massacre");

let count = 0;

const reload = new Audio("assets/sounds/reload.mp3");
const shot = new Audio("assets/sounds/shot.mp3");

const gameStats = {
      score: 0,
      lives: 3,
      onSequence: false,
      shotBirdsInSequence: 0,
      timeLeft: 60,
};

function showTarget() {
      const size = () => Math.trunc((Math.random() * 6 + 4) * 10);
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
      rotate();
}

function eliminateTarget() {
      const quack = new Audio("assets/sounds/quack.mp3");
      quack.play();

      if (gameStats.shotBirdsInSequence !== 0 && gameStats.shotBirdsInSequence % 20 === 0) {
            doubleMassacre.style.display = "block";
            const laugh2 = new Audio("assets/sounds/laugh2.mp3");
            laugh2.play();
      } else if (gameStats.shotBirdsInSequence !== 0 && gameStats.shotBirdsInSequence % 10 === 0) {
            massacre.style.display = "block";
            const laugh1 = new Audio("assets/sounds/laugh1.mp3");
            laugh1.play();
      } else if (gameStats.shotBirdsInSequence !== 0 && gameStats.shotBirdsInSequence % 9 === 0) {
            const celebrate = new Audio("assets/sounds/celebrate.mp3");
            celebrate.play();
      }

      target.style.mixBlendMode = "screen";
      gameStats.score += 10;
      gameStats.lives += 1;
      gameStats.onSequence = true;
}

function shoot() {
      reload.play();
      shot.play();
}

function gameRun() {
      background.addEventListener("click", shoot);

      const timeCountdown = setInterval(() => {
            gameStats.timeLeft -= 1;
            console.log(gameStats.timeLeft);
      }, 1000);

      const targetInterval = setInterval(() => {
            massacre.style.display = "none";
            doubleMassacre.style.display = "none";

            showTarget();

            target.addEventListener("click", eliminateTarget);

            if (gameStats.onSequence !== false) {
                  count += 1;
                  gameStats.shotBirdsInSequence = count;
            } else {
                  gameStats.shotBirdsInSequence = 0;
                  count = 0;
            }

            if (gameStats.lives < 3 && gameStats.shotBirdsInSequence !== 0 && gameStats.shotBirdsInSequence % 10 === 0) gameStats.lives += 1;

            console.log("score " + gameStats.score, "shotBirdsInSequence " + gameStats.shotBirdsInSequence, "lives " + gameStats.lives);

            if (gameStats.lives === 0) {
                  clearInterval(targetInterval);
                  clearInterval(timeCountdown);
                  target.style.display = "none";
                  console.log("Game over!");
            } else if (gameStats.timeLeft === 0 && gameStats.lives > 0) {
                  clearInterval(targetInterval);
                  clearInterval(timeCountdown);
                  target.style.display = "none";
                  console.log("Você venceu!");
            }

            gameStats.onSequence = false;
            gameStats.lives -= 1;
      }, 1500);
}

gameRun();
