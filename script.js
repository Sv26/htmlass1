let playerScore = Number(localStorage.getItem("playerScore")) || 0;
let computerScore = Number(localStorage.getItem("computerScore")) || 0;

const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultText = document.getElementById("resultText");
const victoryScreen = document.getElementById("victoryScreen");
const nextBtn = document.getElementById("nextBtn");

updateScores();

function playGame(playerChoice) {
  const options = ["rock", "paper", "scissors"];
  const computerChoice = options[Math.floor(Math.random() * 3)];

  showChoices(playerChoice, computerChoice);

  if (playerChoice === computerChoice) {
    resultText.innerText = "It's a Tie!";
    return;
  }

  const win =
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper");

  if (win) {
    playerScore++;
    playerDisplay.classList.add("winner");
    resultText.innerText = "You Win!";
    showVictory();
  } else {
    computerScore++;
    computerDisplay.classList.add("winner");
    resultText.innerText = "You Lost!";
  }

  saveScores();
  updateScores();
  nextBtn.classList.remove("hidden");
}

function showChoices(player, computer) {
  playerDisplay.innerText = icon(player);
  computerDisplay.innerText = icon(computer);

  playerDisplay.classList.remove("winner");
  computerDisplay.classList.remove("winner");
}

function icon(choice) {
  if (choice === "rock") return "✊";
  if (choice === "paper") return "✋";
  return "✌️";
}

function updateScores() {
  playerScoreEl.innerText = playerScore;
  computerScoreEl.innerText = computerScore;
}

function saveScores() {
  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("computerScore", computerScore);
}

function resetGame() {
  resultText.innerText = "";
  playerDisplay.innerText = "❓";
  computerDisplay.innerText = "❓";
  victoryScreen.classList.remove("active");
}

function nextRound() {
  playerScore = 0;
  computerScore = 0;
  saveScores();
  updateScores();
  nextBtn.classList.add("hidden");
  resetGame();
}

function showVictory() {
  setTimeout(() => {
    victoryScreen.classList.add("active");
  }, 400);
}

function toggleRules() {
  document.getElementById("rulesModal").classList.toggle("active");
}
