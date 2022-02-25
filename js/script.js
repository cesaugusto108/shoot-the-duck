"use strict";

const target = document.getElementById("target");

const showTarget = function () {
      const size = () => Math.trunc((Math.random() * 6 + 4) * 10);
      const positionY = () => Math.trunc(Math.random() * 50 + 1);
      const positionX = () => {
            if (window.visualViewport.width < 460) return Math.trunc(Math.random() * 70 + 1);
            else return Math.trunc(Math.random() * 90 + 1);
      };

      target.style.display = "block";
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

setInterval(() => {
      showTarget();
}, 1600);
