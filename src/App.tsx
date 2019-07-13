import React from 'react';

import GameContainer from "./GameContainer"

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <GameContainer game="test_game" /> */}
      <br />
      <GameContainer game="another_dwitter_test" />
    </div>
  );
}

export default App;
