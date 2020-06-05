import React, { Fragment } from 'react';
import './App.css';

import TriviaBox from "./containers/TriviaBox/TriviaBox";
import BackgroundPanel from "./components/UI/BackgroundPanel/BackgroundPanel";

function App() {
  return (
    <Fragment>
      <BackgroundPanel zIndex="-3" width="129.2rem" height="59.5rem"/>
      <BackgroundPanel zIndex="-2" width="114rem" height="52.5rem"/>
      <BackgroundPanel zIndex="-1" width="98.8rem" height="45.5rem"/>
      <TriviaBox/>
    </Fragment>
  );
}

export default App;
