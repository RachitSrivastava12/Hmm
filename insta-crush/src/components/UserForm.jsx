import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function UserForm() {
  const [name, setName] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkGenerated, setLinkGenerated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLinkGenerated(true);
  };

  const getLink = () => {
    return `${window.location.origin}/crush/${encodeURIComponent(name)}/${encodeURIComponent(instagram)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {!linkGenerated ? (
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Crush Confessions</h1>
              <p className="text-white/80 text-sm">Create your secret admirer link 💘</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
              />
              <input
                type="text"
                placeholder="Enter your Insta handle"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                required
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
              />
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
              >
                🤌🏻
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Link Ready! 🎉</h2>
              <p className="text-white/80 text-sm">Copy kr lo heheheh</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20">
              <p className="text-white text-sm break-all font-mono">{getLink()}</p>
            </div>
            
            <CopyToClipboard text={getLink()}>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl">
                🫶🏻
              </button>
            </CopyToClipboard>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserForm;
