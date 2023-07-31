import "./App.css";
import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";
import CardTitle from "./components/CardTitle";
import { cardImages } from "./data/CardImages";

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [cover, setCover] = useState("");
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [cardTitleSelected, setCardTitleSelected] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = [
      ...cardImages[cardTitleSelected].values,
      ...cardImages[cardTitleSelected].values,
    ]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    const getCover = () => {
      return cardImages[cardTitleSelected].cover.src;
    };
    setCards(shuffledCards);
    setTurns(0);
    setCover(getCover);
  };
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => shuffleCards(), [cardTitleSelected]);
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className='App'>
      <h1>Magic Match</h1>
      {cardImages.map((card) => {
        return (
          <CardTitle
            cardName={card.name}
            index={cardImages.indexOf(card)}
            setCardTitleSelected={setCardTitleSelected}
            cardTitleSelected={cardTitleSelected}
            key={card.name}
          />
        );
      })}
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map((card) => {
          return (
            <SingleCard
              handleChoice={handleChoice}
              key={card.id}
              card={card}
              cover={cover}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          );
        })}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
