import React, { useState, useEffect, useCallback } from "react";
import './App.css';

const sounds = [
  { key: 'Q', id: 'Heater-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', id: 'Heater-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', id: 'Heater-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', id: 'Heater-4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', id: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', id: 'Kick-n-Hat', url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', id: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
];

function DrumPad({ keyTrigger, id, url, playSound }) {
  const handlePlay = () => {
    playSound(id, keyTrigger);
  };

  return (
    <button className="drum-pad" id={id} onClick={handlePlay} tabIndex="0">
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={url}></audio>
    </button>
  );
}

function App() {
  const [display, setDisplay] = useState("");

  const playSound = useCallback((id, keyTrigger) => {
    const audio = document.getElementById(keyTrigger);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setDisplay(id);
    }
  }, []);

  const handleKeyPress = useCallback((event) => {
    const sound = sounds.find(s => s.key === event.key.toUpperCase());
    if (sound) {
      playSound(sound.id, sound.key);
    }
  }, [playSound]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div id="drum-pads">
        {sounds.map((sound) => (
          <DrumPad key={sound.id} keyTrigger={sound.key} id={sound.id} url={sound.url} playSound={playSound} />
        ))}
      </div>
    </div>
  );
}

export default App;
