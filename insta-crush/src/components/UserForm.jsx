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
    <div className="user-form">
      {!linkGenerated ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your Insta handle"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            required
          />
          <button type="submit">🤌🏻</button>
        </form>
      ) : (
        <div className="link-generated">
          <p>Copy kr lo heheheh</p>
          <p>{getLink()}</p>
          <CopyToClipboard text={getLink()}>
            <button>🫶🏻</button>
          </CopyToClipboard>
        </div>
      )}
    </div>
  );
}

export default UserForm;
