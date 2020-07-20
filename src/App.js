import React, { useState } from 'react';
import './App.css';

import TriviaBox from "./containers/TriviaBox/TriviaBox";
import BackgroundPanels from "./components/UI/BackgroundPanels/BackgroundPanels";

// Let the document know when the mouse is being used
document.body.addEventListener('mousedown', function() {
  document.body.classList.add('using-mouse');
});

// Re-enable focus styling when Tab is pressed
document.body.addEventListener('keydown', function(event) {
  if (event.keyCode === 9) {
    document.body.classList.remove('using-mouse');
  }
});

function App() {
  const [uniqueId, setUniqueId] = useState(0);

  return (
    <BackgroundPanels>
        <TriviaBox key={uniqueId} setKey={setUniqueId}/>
    </BackgroundPanels>
  );
}

export default App;
