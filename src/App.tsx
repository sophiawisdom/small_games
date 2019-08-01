import React from 'react';

import GameContainer from "./GameContainer"

const App: React.FC = () => {
  return (
    <div className="App">
      <br />
      <GameContainer game="sick" environment="plain" />
    </div>
  );
}

export default App;
