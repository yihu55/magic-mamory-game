import React from "react";

export default function CardTitle({
  cardName,
  index,
  setCardTitleSelected,
  cardTitleSelected,
}) {
  const handleOnClick = () => {
    setCardTitleSelected(index);
  };

  return (
    <button
      onClick={handleOnClick}
      className={cardTitleSelected === index ? "blue-btn" : ""}
    >
      {cardName}
    </button>
  );
}
