function loop() {
  update();
  updateCamera();
  draw();

  requestAnimationFrame(loop);
}

function update() {
  controller();
  updatePlayerSprite();
}

function draw() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawFootprints();

  ctx.drawImage(
    player.img,
    Math.round(player.coords.x - camera.x),
    Math.round(player.coords.y - camera.y)
  );
}

loop();

function controller() {
  player.accel.ax = 0;
  player.accel.ay = 0;
  if (keys.a) {
    player.accel.ax -= player.speed;
  }
  if (keys.d) {
    player.accel.ax += player.speed;
  }
  if (keys.w) {
    player.accel.ay -= player.speed;
  }
  if (keys.s) {
    player.accel.ay += player.speed;
  }

  player.velocity.vx += player.accel.ax;
  player.velocity.vy += player.accel.ay;

  player.velocity.vx *= 1 - player.friction;
  player.velocity.vy *= 1 - player.friction;

  player.coords.x += player.velocity.vx;
  player.coords.y += player.velocity.vy;
}

function updatePlayerSprite() {
  const vx = player.velocity.vx;
  const vy = player.velocity.vy;

  if (vx === 0 && vy === 0) return;

  if (Math.abs(vx) > Math.abs(vy)) {
    if (vx > 0) player.img = player.sprites.right;
    else player.img = player.sprites.left;
  } else {
    if (vy > 0) player.img = player.sprites.down;
    else player.img = player.sprites.up;
  }
}

function drawFootprints() {
  let treshold = 0.975;
  console.log(player.velocity.vx);
  if (
    (Math.abs(Math.round(player.velocity.vx)) > 0.7 &&
      Math.random() > treshold) ||
    (Math.abs(Math.round(player.velocity.vy)) > 0.7 &&
      Math.random() > treshold)
  ) {
    footprints.push(
      new Footprint(
        player.coords.x + Math.random() * 10,
        player.coords.y + Math.random() * 5
      )
    );
  }

  footprints.forEach((fp) => {
    fp.draw();
  });
}

class Footprint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.fillStyle = "grey";
    ctx.fillRect(
      Math.round(this.x + 29 - camera.x),
      Math.round(this.y + 48 - camera.y),
      3,
      1
    );
    ctx.fillStyle = "white";
  }
}

function updateCamera() {
  camera.x = player.coords.x - canvas.width / 2 + 32;
  camera.y = player.coords.y - canvas.height / 2 + 32;
}
