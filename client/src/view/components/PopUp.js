const PopUp = (text, ...onClickFuncs) => {
  const popUp = document.createElement("div");
  popUp.classList.add("fixed flex inset-0 items-center justify-center");
  return popUp;
};

export default PopUp;
