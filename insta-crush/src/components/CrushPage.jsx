import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const gifs = [
  "https://media1.tenor.com/m/qKFNYB3HB9YAAAAC/cat-tiktok.gif",
  "https://media1.tenor.com/m/UOQYl0tLL_sAAAAC/qq-%E5%93%AD%E5%93%AD.gif",
  "https://media1.tenor.com/m/x30tZneTNRYAAAAC/banana-banana-cat.gif",
  "https://media1.tenor.com/m/Ce_EIG6qg0kAAAAC/happy-happy-happy-happy.gif",
];

const questions = [
  "Do you like me 🫣?",
  "Itne jaldi na n karo 🥺😭",
  "HAYE RE AESE TARSE HUMKO HOGYE SAU ARSE RE"
];

function CrushPage() {
  const { name, instagram } = useParams();
  const [stage, setStage] = useState(0);
  const [showHappyEnding, setShowHappyEnding] = useState(false);
  const [brokenHeartPosition, setBrokenHeartPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (stage === 2) {
      setBrokenHeartPosition(getRandomPosition());
    }
  }, [stage]);

  const getRandomPosition = () => ({
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 80}%`,
  });

  const handleHeartClick = () => {
    setShowHappyEnding(true);
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