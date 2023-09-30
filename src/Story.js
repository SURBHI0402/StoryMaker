import React, { useState } from 'react';
import './Story.css';

function Story() {
  const [inputText, setInputText] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');

  const generateStory = () => {
    fetch('http://localhost:3000/generate_story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ genre: inputText }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setGeneratedStory(`Error: ${data.error}`);
        } else {
          setGeneratedStory(data.story);
        }
      })
      .catch((error) => {
        setGeneratedStory(`Error: ${error.message}`);
      });
  };

  return (
    <div className="Story">
      <h1>Story Generator</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your input here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={generateStory}>Generate Story</button>
      </div>
      <div className="story-container">
        <h2>Generated Story:</h2>
        <p>{generatedStory}</p>
      </div>
    </div>
  );
}

export default Story;
