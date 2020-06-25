import React, { useState } from 'react';
import './App.css';

import TriviaBox from "./containers/TriviaBox/TriviaBox";
import BackgroundPanels from "./components/UI/BackgroundPanels/BackgroundPanels";

function App() {
  const [uniqueId, setUniqueId] = useState(0);

  return (
    <BackgroundPanels>
        <TriviaBox key={uniqueId} setKey={setUniqueId}/>
    </BackgroundPanels>
  );
}

export default App;
