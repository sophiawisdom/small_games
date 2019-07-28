import React from 'react';

import GameContainer from "./GameContainer"

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <GameContainer game="test_game" /> */}
      <br />
      <GameContainer game="test_dwitter_for_es6" environment="es6" />
    </div>
  );
}

export default App;
