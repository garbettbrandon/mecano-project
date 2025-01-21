import { paragraphs } from "./utils/data";

const typingText = document.querySelector(".typing-text p");
const inpField = document.querySelector(".wrapper .input-field");
const tryAgainBtn = document.querySelector(".content button");
const timeTag = document.querySelector(".time span b");
const mistakeTag = document.querySelector(".mistake span");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const timeItems = document.querySelectorAll(".seconds");
const rankButton = document.querySelector("#show-rankings");
const resetRankBtn = document.querySelector("#reset-rankings");
const rankingContainer = document.querySelector(".ranking-container");

let gameState = {
  timer: null,
  maxTime: 30,
  timeLeft: 30,
  charIndex: 0,
  mistakes: 0,
  isTyping: false,
  hasSavedScore: false,
};

function loadParagraph() {
  const randomParagraph =
    paragraphs[Math.floor(Math.random() * paragraphs.length)];
  typingText.innerHTML = randomParagraph
    .split("")
    .map((char) => `<span>${char}</span>`)
    .join("");
  typingText.querySelector("span").classList.add("active");
}

function startTimer() {
  gameState.timer = setInterval(() => {
    if (gameState.timeLeft > 0) {
      gameState.timeLeft--;
      updateTimeDisplay();
    } else {
      clearInterval(gameState.timer);
    }
  }, 1000);
}

function updateDisplay() {
  const wpm = calculateWPM();
  wpmTag.innerText = wpm;
  mistakeTag.innerText = gameState.mistakes;
  cpmTag.innerText = gameState.charIndex - gameState.mistakes;
}

function calculateWPM() {
  const timeElapsed = gameState.maxTime - gameState.timeLeft;
  return timeElapsed > 0
    ? Math.round(
        ((gameState.charIndex - gameState.mistakes) / 5 / timeElapsed) * 60
      )
    : 0;
}

function updateTimeDisplay() {
  timeTag.innerText = gameState.timeLeft;
}

function resetGame() {
  Object.assign(gameState, {
    timeLeft: gameState.maxTime,
    charIndex: 0,
    mistakes: 0,
    isTyping: false,
    hasSavedScore: false,
  });
  clearInterval(gameState.timer);
  loadParagraph();
  inpField.value = "";
  updateDisplay();
  updateTimeDisplay();
}

function handleTyping() {
  const characters = typingText.querySelectorAll("span");
  const typedChar = inpField.value[gameState.charIndex];

  if (gameState.charIndex < characters.length - 1 && gameState.timeLeft > 0) {
    if (!gameState.isTyping) {
      startTimer();
      gameState.isTyping = true;
    }

    if (typedChar === undefined) {
      if (gameState.charIndex > 0) {
        gameState.charIndex--;
        if (characters[gameState.charIndex].classList.contains("incorrect")) {
          gameState.mistakes--;
        }
        characters[gameState.charIndex].classList.remove(
          "correct",
          "incorrect"
        );
      }
    } else {
      const currentCharSpan = characters[gameState.charIndex];
      if (currentCharSpan.innerText === typedChar) {
        currentCharSpan.classList.add("correct");
      } else {
        gameState.mistakes++;
        currentCharSpan.classList.add("incorrect");
      }
      gameState.charIndex++;
    }

    characters.forEach((span) => span.classList.remove("active"));
    if (gameState.charIndex < characters.length) {
      characters[gameState.charIndex].classList.add("active");
    }
    updateDisplay();
  } else {
    clearInterval(gameState.timer);
    if (!gameState.hasSavedScore) {
      saveScore(calculateWPM(), gameState.mistakes);
      gameState.hasSavedScore = true;
    }
  }
}

function saveScore(wpm, mistakes) {
  const rankings = JSON.parse(localStorage.getItem("rankings")) || {
    "30s": [],
    "60s": [],
    "120s": [],
    "Free": [],
  };
  rankings[`${gameState.maxTime}s`].push({ wpm, mistakes });
  rankings[`${gameState.maxTime}s`].sort((a, b) => b.wpm - a.wpm);
  localStorage.setItem("rankings", JSON.stringify(rankings));
}

function showRankings() {
  if (rankingContainer.style.display === "flex") {
    location.reload();
  }

  const rankings = JSON.parse(localStorage.getItem("rankings")) || {
    "30s": [],
    "60s": [],
    "120s": [],
    "Free": [],
  };

  let rankingHTML = "";
  let hasResults = false;

  Object.entries(rankings).forEach(([time, scores]) => {
    if (scores.length > 0) {
      hasResults = true;
      rankingHTML += `<ol><h3>${time}</h3>`;
      scores.forEach((score, index) => {
        rankingHTML += `<li>${index + 1}º WPM: ${score.wpm} - Mistakes: ${
          score.mistakes
        }</li>`;
      });
      rankingHTML += "</ol>";
    }
  });

  if (!hasResults) {
    rankingHTML +=
      "<p class='no-results'>No hay resultados guardados todavía</p>";
  }

  rankingContainer.innerHTML = rankingHTML;
  rankingContainer.style.display = "flex";
  resetRankBtn.style.display = "block";
}

function resetRankings() {
  localStorage.removeItem("rankings");
  location.reload();
}

function setupEventListeners() {
  timeItems.forEach((item) =>
    item.addEventListener("click", () => {
      gameState.maxTime = parseInt(item.innerText.replace("s", ""));
      resetGame();
      timeItems.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
    })
  );

  inpField.addEventListener("input", handleTyping);
  tryAgainBtn.addEventListener("click", resetGame);
  rankButton.addEventListener("click", showRankings);
  resetRankBtn.addEventListener("click", resetRankings);

  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

// Inicialización
loadParagraph();
setupEventListeners();
