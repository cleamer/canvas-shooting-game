import { Btn } from "../components/index.js";

const Scorediv = () => {
  const scorediv = document.createElement("div");
  scorediv.classList.add("bg-white", "max-w-md", "w-full", "p-7", "text-center", "rounded-md");
  scorediv.id = "score-div";

  const h1 = document.createElement("h1");
  const score = document.getElementById("in-game-score")?.innerText || 0; // TODO: check "score > 0" case
  console.log(score);
  h1.innerText = score;
  h1.id = "game-score";
  h1.classList.add("text-4xl", "font-bold", "leading-none");

  const p = document.createElement("p");
  p.innerText = "Points";
  p.classList.add("text-sm", "text-gray-700", "mb-4");

  const startBtn = Btn("Game Start", () => {
    scorediv.classList.add("hidden");
  });

  scorediv.append(h1, p, startBtn);
  if (score > 0) {
    const saveBtn = Btn("Save", () => {});
    scorediv.append(saveBtn);
  }

  return scorediv;
};

export default Scorediv;
