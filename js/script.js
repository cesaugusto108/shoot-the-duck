"use strict";

const target = document.getElementById("target");
const background = document.querySelector(".game-background");
let count = 0;

const gameStats = {
      score: 0,
      lives: 5,
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
      target.style.mixBlendMode = "screen";
      gameStats.score += 10;
      gameStats.lives += 1;
      gameStats.onSequence = true;
}

function shoot() {
      const shot = new Audio("assets/sounds/shotgun.mp3");
      shot.play();
}

function gameRun() {
      background.addEventListener("click", shoot);

      const timeCountdown = setInterval(() => {
            gameStats.timeLeft -= 1;
            console.log(gameStats.timeLeft);
      }, 1000);

      const targetInterval = setInterval(() => {
            showTarget();
            target.addEventListener("click", eliminateTarget);

            if (gameStats.onSequence !== false) {
                  count += 1;
                  gameStats.shotBirdsInSequence = count;
            } else {
                  gameStats.shotBirdsInSequence = 0;
                  count = 0;
            }

            if (gameStats.lives < 5 && gameStats.shotBirdsInSequence !== 0 && gameStats.shotBirdsInSequence % 10 === 0) gameStats.lives += 1;

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
