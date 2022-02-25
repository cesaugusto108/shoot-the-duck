"use strict";

const target = document.getElementById("target");

const showTarget = function () {
      const size = () => Math.trunc((Math.random() * 6 + 4) * 10);
      const positionY = () => Math.trunc(Math.random() * 50 + 1);
      const positionX = () => {
            if (window.visualViewport.width < 460) return Math.trunc(Math.random() * 70 + 1);
            else return Math.trunc(Math.random() * 90 + 1);
      }

      const height = size();
      const left = positionX();
      const top = positionY();

      target.style.display = "block";
      target.style.height = `${height}px`;
      target.style.left = `${left}vw`;
      target.style.top = `${top}vh`;

      const rotateY = () => {
            if (height % 2 === 0) target.style.transform = "rotateY(180deg)";
            else target.style.transform = "rotateY(0deg)";
      };
      rotateY();
};

setInterval(() => {
      showTarget();
}, 600);
