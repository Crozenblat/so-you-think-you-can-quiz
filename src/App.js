import React from 'react';
import './App.css';

import TriviaBox from "./containers/TriviaBox/TriviaBox";
import BackgroundPanels from "./components/UI/BackgroundPanels/BackgroundPanels";

function App() {
  return (
    <BackgroundPanels>
      <TriviaBox/>
    </BackgroundPanels>
  );
}

export default App;
