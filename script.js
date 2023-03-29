const canvas = document.getElementById('glitchCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const circleCount = 100;
const circles = [];

function createCircles() {
  for (let i = 0; i < circleCount; i++) {
    circles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 150 + 50,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01,
    });
  }
}

createCircles();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const circle of circles) {
    const gradient = ctx.createRadialGradient(circle.x, circle.y, 0, circle.x, circle.y, circle.radius);
    const hue = (circle.angle * 180 / Math.PI) % 360;
    gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 1)`);
    gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    circle.angle += circle.speed;
    if (circle.angle > Math.PI * 2) {
      circle.angle -= Math.PI * 2;
    }
  }

  requestAnimationFrame(draw);
}

draw();
