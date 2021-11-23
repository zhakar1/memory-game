import { useEffect, useState } from "react"
import "./App.css"
import Card from "./components/Card"

const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false },
  {"src": "/img/ring-1.png", matched: false },
  {"src": "/img/scroll-1.png", matched: false },
  {"src": "/img/shield-1.png", matched: false },
  {"src": "/img/sword-1.png", matched: false }
]



function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Перемешиваем карты
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
  
  setCards(shuffledCards);
  setTurns(0);
  setChoiceOne(null);
  setChoiceTwo(null);
  };

  // Обработка выбранных карт
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  useEffect(() => {shuffleCards()}, [])

  useEffect(() => {
    if (choiceOne && choiceTwo){
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500)
        
      }
    }
  }, [choiceTwo, choiceOne])


  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns+1);
    setDisabled(false);
  }
  return (
    <div className="App">
      <h1>Memory game</h1>
      <button onClick = {shuffleCards}>New game</button>
      <div className="card-grid">
        {cards.map(card => (
          <Card
            key={ card.id }
            card={ card }
            handleChoice = {handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            />
        ))}
      </div>
      <p>Turns: { turns } </p>
    </div>
  );
}

export default App;
