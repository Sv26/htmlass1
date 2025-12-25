const choicesScreen = document.getElementById("choicesScreen");
const resultScreen = document.getElementById("resultScreen");
const userPickEl = document.getElementById("userPick");
const pcPickEl = document.getElementById("pcPick");
const resultText = document.getElementById("resultText");
const userScoreEl = document.getElementById("userScore");
const pcScoreEl = document.getElementById("pcScore");
const nextBtn = document.getElementById("nextBtn");

const newGameBtn = document.getElementById("newGameBtn");
const victoryScreen = document.getElementById("victoryScreen");
const victoryTitle = document.getElementById("victoryTitle");
const victoryText = document.getElementById("victoryText");
const playAgainBtn = document.getElementById("playAgainBtn");

/* ================= LOAD SCORE FROM localStorage ================= */
let userScore = Number(localStorage.getItem("userScore")) || 0;
let pcScore = Number(localStorage.getItem("pcScore")) || 0;

userScoreEl.textContent = userScore;
pcScoreEl.textContent = pcScore;

const icons = { rock: "✊🏿", paper: "🤚🏿", scissors: "✌🏿" };
const winRules = { rock: "scissors", paper: "rock", scissors: "paper" };

/* ================= CHOICE CLICK ================= */
document.querySelectorAll(".choice").forEach((btn) => {
  btn.onclick = () => playGame(btn.dataset.choice);
});

/* ================= GAME LOGIC ================= */
function playGame(userChoice) {
  const pcChoice = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];

  userPickEl.className = `choice-result ${userChoice}`;
  pcPickEl.className = `choice-result ${pcChoice}`;

  choicesScreen.style.display = "none";
  resultScreen.style.display = "flex";

  userPickEl.textContent = icons[userChoice];
  pcPickEl.textContent = icons[pcChoice];

  if (userChoice === pcChoice) {
    resultText.textContent = "DRAW";
    userPickEl.classList.add("tie");
    pcPickEl.classList.add("tie");
  } else if (winRules[userChoice] === pcChoice) {
    resultText.textContent = "YOU WIN";
    userScore++;
    userPickEl.classList.add("win");
    pcPickEl.classList.add("lose");
  } else {
    resultText.textContent = "YOU LOSE";
    pcScore++;
    pcPickEl.classList.add("win");
    userPickEl.classList.add("lose");
  }

  /* UPDATE UI */
  userScoreEl.textContent = userScore;
  pcScoreEl.textContent = pcScore;

  /* SAVE TO localStorage */
  localStorage.setItem("userScore", userScore);
  localStorage.setItem("pcScore", pcScore);

  newGameBtn.style.display = "block";
}

/* ================= NEXT ROUND ================= */
nextBtn.onclick = () => {
  resultScreen.style.display = "none";
  choicesScreen.style.display = "block";
};

/* ================= NEW GAME (WINNER + RESET) ================= */
newGameBtn.onclick = () => {
  if (userScore > pcScore) {
    victoryTitle.textContent = "HURRAY!!";
    victoryText.textContent = "YOU WON THE GAME";
  } else if (pcScore > userScore) {
    victoryTitle.textContent = "OOPS!";
    victoryText.textContent = "COMPUTER WON THE GAME";
  } else {
    victoryTitle.textContent = "DRAW";
    victoryText.textContent = "NO ONE WON THE GAME";
  }

  userScore = 0;
  pcScore = 0;

  localStorage.setItem("userScore", 0);
  localStorage.setItem("pcScore", 0);

  userScoreEl.textContent = 0;
  pcScoreEl.textContent = 0;

  victoryScreen.style.display = "flex";
  choicesScreen.style.display = "none";
  resultScreen.style.display = "none";
};

/* ================= PLAY AGAIN ================= */
playAgainBtn.onclick = () => {
  victoryScreen.style.display = "none";
  choicesScreen.style.display = "block";
  newGameBtn.style.display = "none";
};

/* ================= RULES ================= */
openRules.onclick = () => (rulesBox.style.display = "block");
closeRules.onclick = () => (rulesBox.style.display = "none");
