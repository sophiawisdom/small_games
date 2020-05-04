import React from 'react';
import styled from "styled-components"

import GameContainer from "./GameContainer"

const MainWrapper = styled.div`
  text-align: center
`

const App = () => {
  return (
    <div>
      <MainWrapper className="App">
        <GameContainer game="offscreen_dwitter_test"/>
        <GameContainer dwitter_id="15736"/>
      </MainWrapper>
    </div>
  );
}

export default App;
