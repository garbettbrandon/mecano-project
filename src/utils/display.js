export function updateTimeDisplay(timeTag, timeLeft) {
  timeTag.innerText = timeLeft;
}

export function updateStatsDisplay(wpmTag, mistakeTag, cpmTag, gameState, wpm) {
  wpmTag.innerText = wpm;
  mistakeTag.innerText = gameState.mistakes;
  cpmTag.innerText = gameState.charIndex - gameState.mistakes;
}

export function calculateWPM(gameState) {
  const timeElapsed = gameState.maxTime - gameState.timeLeft;
  return timeElapsed > 0
    ? Math.round(
        ((gameState.charIndex - gameState.mistakes) / 5 / timeElapsed) * 60
      )
    : 0;
}
