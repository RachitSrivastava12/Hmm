import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Heart, HeartCrack, Instagram, Sparkles, Star } from 'lucide-react';

// UserForm Component
function UserForm() {
  const [name, setName] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && instagram.trim()) {
      setIsAnimating(true);
      setTimeout(() => {
        setLinkGenerated(true);
        setIsAnimating(false);
      }, 800);
    }
  };

  const getLink = () => {
    return `${window.location?.origin || 'https://crushconfessions.com'}/crush/${encodeURIComponent(name)}/${encodeURIComponent(instagram)}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getLink());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setLinkGenerated(false);
    setName('');
    setInstagram('');
    setCopied(false);
  };

  if (isAnimating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Heart className="w-16 h-16 text-white animate-pulse mx-auto" fill="currentColor" />
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-bounce" />
            </div>
          </div>
          <p className="text-white text-xl font-semibold mt-4 animate-pulse">Creating magic... ✨</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 animate-pulse">
          <Heart className="w-4 h-4 text-white/30" fill="currentColor" />
        </div>
        <div className="absolute top-32 right-20 animate-bounce">
          <Star className="w-3 h-3 text-yellow-300/50" />
        </div>
        <div className="absolute bottom-20 left-32 animate-pulse" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-5 h-5 text-pink-300/40" />
        </div>
      </div>

      <div className="w-full max-w-md z-10">
        {!showHappyEnding ? (
          <div className={`bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 text-center transition-all duration-300 ${shakeAnimation ? 'animate-pulse scale-105' : ''}`}>
            <div className="mb-6">
              <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white/10">
                <img 
                  src={gifs[stage]} 
                  alt="Cute GIF" 
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f8f9fa'/%3E%3Ctext x='150' y='100' text-anchor='middle' dy='.3em' font-family='system-ui' font-size='48' fill='%23e91e63'%3E💕%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed">{questions[stage]}</h2>
            
            <div className="relative h-24 flex items-center justify-center gap-8">
              <button
                onClick={handleHeartClick}
                className="group bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white p-6 rounded-full shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <Heart className="w-8 h-8 relative z-10" fill="currentColor" />
              </button>
              
              <button
                onClick={handleBrokenHeartClick}
                className="group bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white p-6 rounded-full shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 relative overflow-hidden"
                style={stage === 2 ? { 
                  position: 'absolute', 
                  top: `${brokenHeartPosition.top}%`, 
                  left: `${brokenHeartPosition.left}%`,
                  transform: 'translate(-50%, -50%) scale(0.9)',
                  animation: 'wiggle 0.5s ease-in-out infinite'
                } : {}}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <HeartCrack className="w-8 h-8 relative z-10" />
              </button>
            </div>
            
            {stage === 0 && (
              <p className="text-white/70 text-sm mt-6">
                Choose wisely... 💭
              </p>
            )}
            
            {stage === 1 && (
              <p className="text-white/80 text-sm mt-6 animate-pulse">
                Think about it again... 🤔
              </p>
            )}
            
            {stage === 2 && (
              <div className="mt-6 space-y-2">
                <p className="text-white/80 text-sm animate-bounce">
                  The "No" button is trying to escape! 😄
                </p>
                <p className="text-white/60 text-xs">
                  Maybe it's a sign? 😉
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 text-center animate-fadeIn relative overflow-hidden">
            {/* Celebration background effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-bounce"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '2s'
                    }}
                  >
                    <Heart className="w-4 h-4 text-red-300/60" fill="currentColor" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6 relative z-10">
              <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white/10">
                <img 
                  src={gifs[3]} 
                  alt="Happy GIF" 
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f8f9fa'/%3E%3Ctext x='150' y='100' text-anchor='middle' dy='.3em' font-family='system-ui' font-size='48' fill='%23ff6b6b'%3E🎉%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4 leading-relaxed">
                🎉 {name} likes you too! 🤭
              </h2>
              
              <p className="text-white/80 mb-8 text-lg">
                Time to slide into those DMs! 💕
              </p>
              
              <button
                onClick={redirectToInstagram}
                className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl flex items-center gap-3 mx-auto relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <Instagram className="w-6 h-6 relative z-10" />
                <span className="relative z-10">Send me a message 💘</span>
              </button>
              
              <p className="text-white/60 text-xs mt-4">
                Don't keep them waiting! 😊
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Custom keyframes for wiggle animation */}
      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: translate(-50%, -50%) rotate(-3deg) scale(0.9); }
          25% { transform: translate(-50%, -50%) rotate(3deg) scale(0.95); }
          50% { transform: translate(-50%, -50%) rotate(-3deg) scale(0.9); }
          75% { transform: translate(-50%, -50%) rotate(3deg) scale(0.95); }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {!linkGenerated ? (
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <Heart className="w-12 h-12 text-white mb-4 mx-auto animate-pulse" fill="currentColor" />
                <Star className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-spin" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Crush Confessions</h1>
              <p className="text-white/80 text-sm">Create your secret admirer link 💘</p>
            </div>
            
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="What's your name? ✨"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                />
              </div>
              
              <div className="relative">
                <Instagram className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Your Instagram handle"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value.replace('@', ''))}
                  className="w-full px-6 py-4 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                />
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={!name.trim() || !instagram.trim()}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
              >
                <span className="flex items-center justify-center gap-2">
                  Generate Magic Link ✨
                  <Heart className="w-5 h-5" fill="currentColor" />
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 animate-fadeIn">
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 animate-bounce">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Link Ready! 🎉</h2>
              <p className="text-white/80 text-sm">Share this with your crush and see what happens... 👀</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20">
              <p className="text-white/60 text-xs mb-2">Your magic link:</p>
              <p className="text-white text-sm break-all font-mono bg-black/20 p-3 rounded-xl">{getLink()}</p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={copyToClipboard}
                className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied! 🎉
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Link 📋
                  </>
                )}
              </button>
              
              <button
                onClick={resetForm}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 border border-white/20"
              >
                Create Another Link ↻
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
