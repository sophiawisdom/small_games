import React from 'react';

import GameContainer from "./GameContainer"

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <GameContainer game="test_game" /> */}
      <br />
      <GameContainer game="es6_network_test" environment="es6" />
    </div>
  );
}

export default App;
