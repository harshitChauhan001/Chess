import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css";

function Home() {
  const [uniqueKey, setUniqueKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [enterKey, setEnterKey] = useState("");
  const [countdown, setCountdown] = useState(5);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const navigate = useNavigate();

  const generateUniqueKey = async () => {
    const key = Math.random().toString(36).substr(2, 9);
    setUniqueKey(key);
    setShowKey(true);
    setCountdown(5);
    setIsButtonDisabled(true);

    const result = await fetch('https://chess-redis-server.onrender.com/api/set-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key }),
    });

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      setShowKey(false);
      navigate(`/game/${key}`);
      setIsButtonDisabled(false);
    }, 5000);
  };

  const handleEnterKey = async () => {
    if (enterKey === "") {
      return;
    }

    try {
      const response = await fetch(`https://chess-redis-server.onrender.com/api/enter-key?key=${enterKey}`);
      const data = await response.json();
      if (data.exists) {
        if (data.full) {
          alert('Game room is already full');
        } else {
          navigate(`/game/${enterKey}`);
        }
      } else {
        alert('Key not found');
      }
    } catch (error) {
      console.error('Error checking key:', error);
      alert('An error occurred while checking the key');
    }
  };

  return (
    <div className="main">
      <h1>Chess Game</h1>
      <div className="chess-options">
        <div className="generate-key">
          Create a Game
          <button onClick={generateUniqueKey} disabled={isButtonDisabled}>
            {isButtonDisabled ? 'Please wait...' : 'New game'}
          </button>
          {showKey && (
            <div className='redirect'>
              <p>
                Your unique key: <strong>{uniqueKey}</strong>
              </p>
              <p>Redirecting in {countdown} seconds...</p>
            </div>
          )}
        </div>
        <div className="enter-key">
          <div>Join a Game</div>
          <div>
            <input
              placeholder="Key"
              value={enterKey}
              onChange={(e) => setEnterKey(e.target.value)}
            />
            <button onClick={handleEnterKey}>Join</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
git 