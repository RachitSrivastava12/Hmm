import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const gifs = [
  "https://media.giphy.com/media/xT8qB4foF1nxHZwpLa/giphy.gif",
  "https://media.giphy.com/media/l2JHRhAtnJSDNJ2py/giphy.gif",
  "https://media.giphy.com/media/3oEjI4sFlp73fvEYgw/giphy.gif",
  "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif",
];

function CrushPage() {
  const { name, instagram } = useParams();
  const [stage, setStage] = useState(0);
  const [showHappyEnding, setShowHappyEnding] = useState(false);
  const [brokenHeartPosition, setBrokenHeartPosition] = useState({ top: 0, left: 0 });
  const audioRef = useRef(null);

  const questions = [
    `Do you like ${name} 🫣?`,
    "Itne jaldi na n karo 🥺😭",
    "HAYE RE AESE TARSE HUMKO HOGYE SAU ARSE RE"
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <audio ref={audioRef} src="/tarse.mp3" loop />
        {!showHappyEnding ? (
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 text-center">
            <div className="mb-6">
              <img 
                src={gifs[stage]} 
                alt="Crush GIF" 
                className="w-full h-64 object-cover rounded-2xl mx-auto shadow-lg"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f8f9fa'/%3E%3Ctext x='150' y='100' text-anchor='middle' dy='.3em' font-family='system-ui' font-size='48' fill='%23e91e63'%3E💕%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            
            <p className="text-2xl font-bold text-white mb-8">{questions[stage]}</p>
            
            <div className="button-container relative h-24 flex items-center justify-center gap-8">
              <button 
                onClick={handleHeartClick}
                className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white p-4 rounded-full shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 text-2xl"
              >
                ❤️
              </button>
              <button
                onClick={handleBrokenHeartClick}
                style={stage === 2 ? { position: 'absolute', ...brokenHeartPosition } : {}}
                className="bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white p-4 rounded-full shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 text-2xl"
              >
                💔
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 text-center">
            <div className="mb-6">
              <img 
                src={gifs[3]} 
                alt="Happy GIF" 
                className="w-full h-64 object-cover rounded-2xl mx-auto shadow-lg"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f8f9fa'/%3E%3Ctext x='150' y='100' text-anchor='middle' dy='.3em' font-family='system-ui' font-size='48' fill='%23ff6b6b'%3E🎉%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            
            <p className="text-3xl font-bold text-white mb-8">{name} likes you too 🤭</p>
            
            <button 
              className="send-text-button bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl"
              onClick={redirectToInstagram}
            >
              Send me a text 💘
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CrushPage;
