import "./SingleCard.css";

export default function SingleCard({
  card,
  handleChoice,
  flipped,
  disabled,
  cover,
}) {
  const handleClick = () => {
    if (!disabled) handleChoice(card);
  };

  return (
    <div className='card'>
      <div className={flipped ? "flipped" : ""}>
        <div className='front container'>
          <img src={card.src} alt='card front' />
          <div className={card.name ? "title" : ""}>{card.name}</div>
        </div>

        <img
          className='back'
          src={cover}
          alt='card back'
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
