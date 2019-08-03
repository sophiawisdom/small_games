import React from 'react';

import GameContainer from "./GameContainer"

const App: React.FC = () => {
  return (
    <div className="App">
      <br />
      <GameContainer game="test_dwitter" environment="dwitter" />
      <GameContainer game="do_nothing" environment="es6" />
    </div>
  );
}

export default App;
