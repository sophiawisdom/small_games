import React from 'react';
import styled from "styled-components"

import GameContainer from "./GameContainer"

const MainWrapper = styled.div`
  text-align: center
`

const App = () => {
  return (
    <MainWrapper className="App">
      <GameContainer game="offscreen_dwitter_test"/>
      <GameContainer game="offscreen_dwitter_test_2"/>
      <GameContainer game="offscreen_dwitter_test_3"/>
    </MainWrapper>
  );
}

export default App;
