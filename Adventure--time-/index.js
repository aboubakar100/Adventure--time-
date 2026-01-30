let player = document.getElementById("player");
let isJumping = false;
let gravity = 0.9;
let position = 0;
let runTime = 0;
let gameInterval;

// Country & discoveries
let country = "Rwanda";
let discovery = "Lost City";

// Question database
const questions = {
  Rwanda: {
    "Lost City": {
      q: "Which ancient kingdom existed in Rwanda?",
      a: "Kingdom of Rwanda"
    }
  },
  USA: {
    "Lost Gold": {
      q: "Which civilization built Mesa Verde?",
      a: "Ancestral Puebloans"
    }
  },
  France: {
    "Ancient Materials": {
      q: "Which empire built Roman roads in France?",
      a: "Roman Empire"
    }
  }
};

// Jump control
document.addEventListener("keydown", e => {
  if (e.code === "Space" && !isJumping) jump();
});

function jump() {
  isJumping = true;
  let upInterval = setInterval(() => {
    if (position >= 120) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        position -= 5;
        player.style.bottom = position + 40 + "px";
      }, 20);
    }
    position += 5;
    player.style.bottom = position + 40 + "px";
  }, 20);
}

// Start run
function startRun() {
  gameInterval = setInterval(() => {
    runTime++;
    if (runTime === 300) {
      stopGame();
    }
  }, 50);
}

function stopGame() {
  clearInterval(gameInterval);
  document.getElementById("quiz").classList.remove("hidden");
  document.getElementById("discovery").innerText =
    `Discovery: ${discovery} in ${country}`;
  document.getElementById("question").innerText =
    questions[country][discovery].q;
}

function checkAnswer() {
  let user = document.getElementById("answer").value.toLowerCase();
  let correct = questions[country][discovery].a.toLowerCase();

  if (user === correct) {
    document.getElementById("feedback").innerText =
      "✅ Correct! New adventure unlocked!";
  } else {
    document.getElementById("feedback").innerText =
      "❌ Wrong! Explore again.";
  }
}

startRun();
