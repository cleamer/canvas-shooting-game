const PopUp = (div) => {
  const popUp = document.createElement("div");
  popUp.classList.add("fixed", "flex", "inset-0", "items-center", "justify-center");
  popUp.appendChild(div);
  return popUp;
};

export default PopUp;
