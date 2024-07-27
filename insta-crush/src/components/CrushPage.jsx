import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const gifs = [
  "https://media.giphy.com/media/xT8qB4foF1nxHZwpLa/giphy.gif",
  "https://media.giphy.com/media/l2JHRhAtnJSDNJ2py/giphy.gif",
  "https://media.giphy.com/media/3oEjI4sFlp73fvEYgw/giphy.gif",
  "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif",
];

const questions = [
  `Do you like ${name} 🫣?`,
  "Itne jaldi na n karo 🥺😭",
  "HAYE RE AESE TARSE HUMKO HOGYE SAU ARSE RE"
];

function CrushPage() {
  const { name, instagram } = useParams();
  const [stage, setStage] = useState(0);
  const [showHappyEnding, setShowHappyEnding] = useState(false);
  const [brokenHeartPosition, setBrokenHeartPosition] = useState({ top: 0, left: 0 });
  const audioRef = useRef(null);

  useEffect(() => {
    if (stage === 2) {
      setBrokenHeartPosition(getRandomPosition());
      if (audioRef.current) {
        audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
      }
    }
  }, [stage]);

  const getRandomPosition = () => ({
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 80}%`,
  });

  const handleHeartClick = () => {
    setShowHappyEnding(true);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleBrokenHeartClick = () => {
    if (stage < 2) {
      setStage(stage + 1);
    } else {
      setBrokenHeartPosition(getRandomPosition());
    }
  };

  const redirectToInstagram = () => {
    window.location.href = `https://www.instagram.com/${instagram}`;
  };

  return (
    <div className="crush-page">
      <audio ref={audioRef} src="/tarse.mp3" loop />
      {!showHappyEnding ? (
        <>
          <img src={gifs[stage]} alt="Crush GIF" />
          <p className="question">{questions[stage]}</p>
          <div className="button-container">
            <button onClick={handleHeartClick}>❤️</button>
            <button
              onClick={handleBrokenHeartClick}
              style={stage === 2 ? { position: 'absolute', ...brokenHeartPosition } : {}}
            >
              💔
            </button>
          </div>
        </>
      ) : (
        <>
          <img src={gifs[3]} alt="Happy GIF" />
          <p>{name} likes you too 🤭</p>
          <button className="send-text-button" onClick={redirectToInstagram}>Send me a text 💘</button>
        </>
      )}
    </div>
  );
}

export default CrushPage;
