import { InGameScore, PopUp, Canvas } from "./components/index.js";
import { ScorePopUp } from "./containers/index.js";

const root = document.getElementById("root");

const inGameScore = InGameScore();
const popUp = PopUp(ScorePopUp());
const game = Canvas();
root.append(inGameScore, popUp); //, PopUp(), Canvas());
