import React, { useEffect, useState } from "react";
import "./App.css";
import cards from "./cards";

const shuffledCards = cards.sort(() => Math.random() - 0.5);
const shuffledCardsTwo = cards.sort(() => 0.5 * Math.random());

function App() {
  //states for opened cards and matched cards
  const [openedCard, setOpenedCard] = useState([]);
  const [matched, setMatched] = useState([]);

  //pair of cards spreaded from the array so we can check them
  const pairOfcards = [...shuffledCards, ...shuffledCardsTwo];

  // function to flip the card and set it in opened card from the state
  function flipCard(index) {
    setOpenedCard((opened) => [...opened, index]);
  }

  function refreshPage() {
    window.location.reload(false);
  }
  useEffect(() => {
    if (openedCard < 2) return;

    const firstMatched = pairOfcards[openedCard[0]];
    const secondMatched = pairOfcards[openedCard[1]];

    if (secondMatched && firstMatched.id === secondMatched.id) {
      setMatched([...matched, firstMatched.id]);
    }

    if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);
  }, [openedCard]);

  console.log(matched.length);
  const myFunction = () => alert("YOU WIN !!!!" + " ,Refresh for restart");

  return (
    <div className="App">
      <table>
        <td>
          <div className="Score"> Score : {matched.length}</div>
        </td>
        <td>
          <button className="ScoreTwo" onClick={refreshPage}>
            Restart
          </button>
        </td>
      </table>
      <div className="cards">
        {pairOfcards.map((card, index) => {
          //lets flip the card

          let isFlipped = false;

          if (openedCard.includes(index)) isFlipped = true;
          if (matched.includes(card.id)) isFlipped = true;
          return (
            <div
              className={`card-card ${isFlipped ? "flipped" : ""} `}
              key={index}
              onClick={() => flipCard(index)}
            >
              <div className="inner">
                <div className="front">
                  <img
                    src={`${card.src}`}
                    alt="card-name"
                    width="100%"
                    margin="20px"
                  />
                </div>
                <div className="back"></div>
              </div>
              {matched.length === 8 ? myFunction() : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
