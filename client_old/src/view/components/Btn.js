const Btn = (text, ...onClickFuncs) => {
  const btn = document.createElement("button");
  btn.innerText = text;
  btn.classList.add("bg-blue-500", "text-white", "w-full", "py-3", "rounded-full", "hover:bg-sky-400", "drop-shadow-lg", "mt-2");
  onClickFuncs.forEach((func) => btn.addEventListener("click", func));
  return btn;
};

export default Btn;
