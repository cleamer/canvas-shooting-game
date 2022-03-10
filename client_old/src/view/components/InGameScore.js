function InGameScore() {
  const inGameScore = document.createElement("div");
  inGameScore.classList.add("fixed", "text-white", "ml-2", "mt-1", "select-none");
  const span = document.createElement("span");
  span.innerText = "Score: ";
  const score = document.createElement("span");
  score.innerText = 0;
  score.id = "in-game-score";
  inGameScore.append(span, score);
  return inGameScore;
}

export default InGameScore;
