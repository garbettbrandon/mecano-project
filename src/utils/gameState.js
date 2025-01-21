export const gameState = {
  timer: null,
  maxTime: 30,
  timeLeft: 30,
  charIndex: 0,
  mistakes: 0,
  isTyping: false,
  hasSavedScore: false,
};

export function resetGameState(maxTime = 30) {
  return {
    timer: null,
    maxTime,
    timeLeft: maxTime,
    charIndex: 0,
    mistakes: 0,
    isTyping: false,
    hasSavedScore: false,
  };
}
