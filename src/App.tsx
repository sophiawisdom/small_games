import React from 'react';

import GameContainer from "./GameContainer"

const App: React.FC = () => {
  return (
    <div className="App">
      <br />
      <GameContainer game="offscreen_dwitter_test" environment="offscreen_canvas" />
      <GameContainer game="do_nothing" environment="offscreen_canvas" />
    </div>
  );
}

export default App;
