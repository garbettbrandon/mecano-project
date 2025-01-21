export function saveScore(gameState, wpm, mistakes) {
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

export function loadRankings(rankingContainer, resetRankBtn) {
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

export function resetRankings() {
  localStorage.removeItem("rankings");
  location.reload();
}
