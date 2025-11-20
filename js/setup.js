// CANVAS SETUP
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

function resizeCanvas() {
  let scale = 3;
  canvas.width = 480;
  canvas.height = 270;

  canvas.style.width = canvas.width * scale + "px";
  canvas.style.heigh = canvas.height * scale + "px";
}

resizeCanvas();

// PLAYER
const keys = {};
window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

let footprints = []

let camera = {
  x: 0,
  y: 0
}
let player = {
  coords: {
    x: 0,
    y: 0,
  },
  velocity: {
    vx: 0,
    vy: 0,
  },
  accel: {
    ax: 0,
    ay: 0,
  },
  speed: 0.04,
  friction: 0.06,
  sprites: {
    up: loadImage("assets/penguintop.png"),
    down:  loadImage("assets/penguindown.png"),
    left:  loadImage("assets/penguinleft.png"),
    right:  loadImage("assets/penguinright.png"),
  },
  img: loadImage("assets/penguintop.png")
};

function loadImage(path) {
    const img = new Image();
    img.src = path;
    return img;
}

