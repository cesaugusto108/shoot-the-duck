"use strict";

const target = document.getElementById("target");

const showTarget = function () {
      const side = () => Math.trunc(((Math.random() * 6) + 4) * 10);
      const positionX = () => Math.trunc((Math.random() * 100) + 1);
      const positionY = () => Math.trunc((Math.random() * 100) + 1);

      const height = side();
      
      target.style.display = "block";
      target.style.height = `${height}px`;
      target.style.left = `${Math.abs(positionX() - height)}vw`;
      target.style.top = `${Math.abs(positionY() - height) / 2}vh`;


};

setInterval(() => {
      showTarget();
}, 1000);

