let levelText = document.querySelector("h3");
let buttons = document.querySelectorAll(".btn");
let introText = document.getElementById("introText");

let curr = 0;
let system = [];
let user = [];
let started = false;

const colors = ["red", "blue", "green", "yellow"];


const text =
  "Building scalable web applications and interactive experiences using modern JavaScript, backend engineering, and clean UI design.";
let idx = 0;

function typeIntro() {
  if (idx < text.length) {
    if (text[idx] === " ") {
      introText.innerHTML += "&nbsp;";
    } else {
      introText.innerText += text[idx];
    }
    idx++;
    setTimeout(typeIntro, 35);
  }
}
typeIntro();


function playSound(type) {
  let audio = new Audio(`sounds/${type}.wav`);
  audio.play();
}


function levelInc() {
  curr++;
  levelText.innerText = `Level ${curr}`;
}

function flash(btn) {
  playSound("correct");
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 200);
}

function playSequence() {
  user = [];
  system.forEach((color, index) => {
    setTimeout(() => {
      let btn = document.querySelector(`.${color}`);
      flash(btn);
    }, index * 600);
  });
}

function nextStep() {
  let rand = Math.floor(Math.random() * 4);
  let color = colors[rand];
  system.push(color);
  playSequence();
}

function check(index) {
  if (user[index] === system[index]) {
    if (user.length === system.length) {
      setTimeout(() => {
        levelInc();
        nextStep();
      }, 800);
    }
  } else {
    playSound("wrong");
    levelText.innerText = "Game Over! Press any key to restart";
    reset();
  }
}


buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (!started) return;
    let color = btn.classList[1];
    user.push(color);
    flash(btn);
    check(user.length - 1);
  });
});

window.addEventListener("keydown", () => {
  if (!started) {
    started = true;
    curr = 0;
    system = [];
    levelInc();
    nextStep();
  }
});


function reset() {
  started = false;
  curr = 0;
  system = [];
  user = [];
}

