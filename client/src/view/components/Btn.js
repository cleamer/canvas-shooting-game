const Btn = (text, ...onClickFuncs) => {
  const btn = document.createElement("button");
  btn.innerText = text;
  onClickFuncs.forEach((func) => btn.addEventListener("click", func));
  return btn;
};

export default Btn;
