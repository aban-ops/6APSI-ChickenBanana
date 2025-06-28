import React, { useState } from 'react';
import './Game.css';  

const chickenImage = 'https://img.freepik.com/premium-vector/chicken-spreading-wings-cartoon-character_648164-6031.jpg?w=740';
const bananaImage = 'https://img.freepik.com/free-psd/banana-character-isolated_23-2151170924.jpg?semt=ais_hybrid&w=740';

const bananaLoseGif = 'https://media.tenor.com/nRcjFCeXtPIAAAAM/sad-banana.gif';
const chickenLoseGif = 'https://i.gifer.com/UolL.gif';

const totalCells = 6 * 6;

function getRandomItem() {
  return Math.random() < 0.5 ? chickenImage : bananaImage;
}

function Game() {
  const [playerChoice, setPlayerChoice] = useState(null); // 'chicken' or 'banana'
  const [revealed, setRevealed] = useState(Array(totalCells).fill(false));
  const [gridImages, setGridImages] = useState(Array(totalCells).fill().map(getRandomItem));
  const [foundMessage, setFoundMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (index) => {
    if (gameOver) return;

    if (playerChoice === null) {
      setFoundMessage('Please choose Chicken or Banana first!');
      return;
    }

    if (revealed[index]) {
      return;
    }

    const clickedImage = gridImages[index];
    const chosenImage = playerChoice === 'chicken' ? chickenImage : bananaImage;

    if (clickedImage !== chosenImage) {
      setGameOver(true);
      setFoundMessage('YOU LOSE!');
      const newRevealed = [...revealed];
      newRevealed[index] = true;
      setRevealed(newRevealed);
      return;
    }

    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);
    setFoundMessage(`You found a ${playerChoice}!`);
  };

  const Restart = () => {
    setPlayerChoice(null);
    setRevealed(Array(totalCells).fill(false));
    setGridImages(Array(totalCells).fill().map(getRandomItem));
    setFoundMessage('');
    setGameOver(false);
  };

  return (
    <div className="container">
      <h1>Chicken Banana Game!</h1>

      {!playerChoice && !gameOver && (
        <div className="choice-container">
          <p>Choose a player:</p>
          <button className="choice-button" onClick={() => setPlayerChoice('chicken')}>
            Chicken
          </button>
          <button className="choice-button" onClick={() => setPlayerChoice('banana')}>
            Banana
          </button>
        </div>
      )}

      {playerChoice && !gameOver && (
        <p className="message">
          You chose <b>{playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}</b>. Find the {playerChoice}!
        </p>
      )}

      {!gameOver && (
        <div className="grid">
          {gridImages.map((img, index) => (
            <div
              key={index}
              className="square"
              onClick={() => handleClick(index)}
              style={{ cursor: gameOver ? 'default' : 'pointer' }}
            >
              {revealed[index] ? (
                <img src={img} alt="revealed" />
              ) : (
                <div className="hidden-box">{index + 1}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {gameOver && (
        <div className="game-over-container">
          <p className="game-over-message">GAME OVER.</p>
          {playerChoice === 'chicken' && (
            <img src={chickenLoseGif} alt="Chicken lose animation" className="lose-gif" />
          )}
          {playerChoice === 'banana' && (
            <img src={bananaLoseGif} alt="Banana lose animation" className="lose-gif" />
          )}
          <button className="restart-button" onClick={Restart}>
            Restart
          </button>
        </div>
      )}

      {!gameOver && (
        <p className={`found-message ${gameOver ? 'lose-message' : ''}`}>
          {foundMessage}
        </p>
      )}
    </div>
  );
}

export default Game;