"use strict";

const target = document.getElementById("target");

const showTarget = function () {
      const side = () => Math.trunc((Math.random() * 6 + 4) * 10);
      const positionX = () => Math.trunc(Math.random() * 100 + 1);
      const positionY = () => Math.trunc(Math.random() * 100 + 1);

      const height = side();
      const left = Math.abs(positionX() - height);
      const top = Math.abs(positionY() - height) / 2;

      target.style.display = "block";
      target.style.height = `${height}px`;
      target.style.left = `${left}vw`;
      target.style.top = `${top}vh`;

      const rotateY = () => {
            if ((top > positionY() * 0.15 && top < positionY() * 0.4) || (top > positionY() * 0.65 && top < positionY() * 0.9)) {
                  // transform: rotateY(180deg);
                  target.style.transform = "rotateY(180deg)";
            } else {
                  target.style.transform = "rotateY(0deg)";
            }
      };
      rotateY();
};

setInterval(() => {
      showTarget();
}, 1000);
