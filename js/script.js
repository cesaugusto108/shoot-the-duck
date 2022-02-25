"use strict";

const target = document.getElementById("target");
let count = 0;

const gameStats = {
      score: 0,
      lives: 5,
      onSequence: false,
      shotBirdsInSequence: 0,
};

const showTarget = function () {
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

      const rotate = () => {
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
      };
      rotate();
};

const eliminateTarget = function () {
      target.style.mixBlendMode = "screen";
      gameStats.score += 10;
      gameStats.lives += 1;
      gameStats.onSequence = true;
};

function gameRun() {
      setInterval(() => {
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

            gameStats.onSequence = false;

            console.log("score " + gameStats.score, "shotBirdsInSequence " + gameStats.shotBirdsInSequence, "lives " + gameStats.lives);
            
            gameStats.lives -= 1;
      }, 1600);
}

gameRun();
