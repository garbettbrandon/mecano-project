import { loadParagraph } from "./utils/data";
import { resetGameState } from "./utils/gameState";
import { startTimer, stopTimer } from "./utils/timer";
import { calculateWPM, updateStatsDisplay } from "./utils/display";
import { saveScore, loadRankings, resetRankings } from "./utils/rankings";

// Selección de elementos del DOM
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

let gameState = resetGameState();

function resetGame() {
  gameState = resetGameState(gameState.maxTime);
  loadParagraph(typingText, inpField);
  inpField.value = "";
  updateStatsDisplay(wpmTag, mistakeTag, cpmTag, gameState, 0);
  timeTag.innerText = gameState.maxTime === "Free" ? "∞" : gameState.timeLeft;
}

function handleTyping() {
  const characters = typingText.querySelectorAll("span");
  const typedChar = inpField.value[gameState.charIndex];

  if (
    gameState.charIndex < characters.length - 1 &&
    (gameState.timeLeft > 0 || gameState.maxTime === "Free")
  ) {
    if (!gameState.isTyping) {
      gameState.startTime = Date.now();
      startTimer(
        gameState,
        (timeLeft) => (timeTag.innerText = timeLeft),
        () => {
          stopTimer(gameState);
          if (!gameState.hasSavedScore) {
            saveScore(gameState, calculateWPM(gameState), gameState.mistakes);
            gameState.hasSavedScore = true;
          }
        }
      );
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

    // Actualiza las estadísticas del jugador
    updateStatsDisplay(
      wpmTag,
      mistakeTag,
      cpmTag,
      gameState,
      calculateWPM(gameState)
    );
  } else {
    stopTimer(gameState);
    if (!gameState.hasSavedScore) {
      saveScore(gameState, calculateWPM(gameState), gameState.mistakes);
      gameState.hasSavedScore = true;
    }
  }
}

resetGame();

timeItems.forEach((item) =>
  item.addEventListener("click", () => {
    gameState.maxTime =
      item.innerText === "Free"
        ? "Free"
        : parseInt(item.innerText.replace("s", ""));
    resetGame();
    timeItems.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");
  })
);

tryAgainBtn.addEventListener("click", resetGame);
rankButton.addEventListener("click", () =>
  loadRankings(rankingContainer, resetRankBtn)
);
resetRankBtn.addEventListener("click", resetRankings);
inpField.addEventListener("input", handleTyping);
