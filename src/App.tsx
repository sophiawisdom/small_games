import React from 'react';

import GameContainer from "./GameContainer"

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <GameContainer game="test_game" /> */}
      <br />
      <GameContainer game="test_dwitter" scale={2} />
    </div>
  );
}

export default App;
