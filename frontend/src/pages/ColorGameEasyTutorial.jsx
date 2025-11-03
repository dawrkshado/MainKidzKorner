import React, { useState } from 'react';
import colorVideo from '../assets/videos/ColorEasyTutorial.mp4';

const ColorGameEasyTutorial = () => {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <div>
      {!videoEnded ? (
        <video
          width="800"
          controls
          autoPlay
          onEnded={handleVideoEnd}
          style={{ display: 'block', margin: '20px auto' }}
        >
          <source src={colorVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div>
          {/* Replace below with your actual game component or JSX */}
          <h1>Color Game Starts Now!</h1>
          {/* Example: <YourColorGameComponent /> */}
        </div>
      )}
    </div>
  );
};

export default ColorGameEasyTutorial;

