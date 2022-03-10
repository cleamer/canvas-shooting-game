import { InGameScore, PopUp, Canvas } from './components/index.js';
import { ScorePopUp } from './containers/index.js';

const app = () => {
  const div = document.createElement('div');
  div.append(InGameScore(), PopUp(ScorePopUp()), Canvas());
  return div;
};

export default app;
