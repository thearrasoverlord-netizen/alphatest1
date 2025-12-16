const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const TILE = 32;
const GRAVITY = 0.5;

// 🌍 Mundo simple (Alpha vibes)
const world = [];
for (let y = 0; y < 15; y++) {
  world[y] = [];
  for (let x = 0; x < 20; x++) {
    if (y > 10) world[y][x] = 1; // tierra
    else world[y][x] = 0;       // aire
  }
}

// 👤 Jugador
const player = {
  x: 5,
  y: 0,
  vx: 0,
  vy: 0,
  w: 0.8,
  h: 0.9,
  onGround: false
};

// ⌨️ Input
const keys = {};
window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

// 🟫 Dibujar bloque
function drawTile(x, y, type) {
  if (type === 1) {
    ctx.fillStyle = "#8b5a2b";
    ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
  }
}

// 🔁 Game loop
function update() {
  // Movimiento
  if (keys["ArrowLeft"]) player.vx = -0.1;
  else if (keys["ArrowRight"]) player.vx = 0.1;
  else player.vx = 0;

  if (keys["ArrowUp"] && player.onGround) {
    player.vy = -0.25;
    player.onGround = false;
  }

  // Física
  player.vy += GRAVITY;
  player.x += player.vx;
  player.y += player.vy;

  // Colisión con suelo
  if (player.y + player.h > 11) {
    player.y = 11 - player.h;
    player.vy = 0;
    player.onGround = true;
  }

  draw();
  requestAnimationFrame(update);
}

// 🎨 Render
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Mundo
  for (let y = 0; y < world.length; y++) {
    for (let x = 0; x < world[y].length; x++) {
      drawTile(x, y, world[y][x]);
    }
  }

  // Jugador
  ctx.fillStyle = "black";
  ctx.fillRect(
    player.x * TILE,
    player.y * TILE,
    player.w * TILE,
    player.h * TILE
  );
}

update();
