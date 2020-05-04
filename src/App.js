import React from 'react';
import styled from "styled-components"

import { AppBar } from '@material-ui/core';

import GameContainer from "./GameContainer"

const MainWrapper = styled.div`
  text-align: center
`

const App = () => {
  return (
    <div>
      <AppBar />
      <MainWrapper className="App">
        <GameContainer game="offscreen_dwitter_test"/>
        <GameContainer dwitter_id="15736"/>
      </MainWrapper>
    </div>
  );
}

export default App;
