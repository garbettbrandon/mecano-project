export function startTimer(gameState, updateTimeDisplay, onFinish) {
  gameState.timer = setInterval(() => {
    if (gameState.timeLeft > 0) {
      gameState.timeLeft--;
      updateTimeDisplay(gameState.timeLeft);
    } else {
      clearInterval(gameState.timer);
      if (onFinish) onFinish();
    }
  }, 1000);
}

export function stopTimer(gameState) {
  clearInterval(gameState.timer);
}
