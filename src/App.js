import React, { useEffect, useState } from 'react';
import styled from "styled-components"

import { AppBar, Input } from '@material-ui/core';

import GameContainer from "./GameContainer"

const MainWrapper = styled.div`
  text-align: center
`

const App = () => {
  const [dwitter_id, setId] = useState(15736)

  return (
    <div>
      <AppBar />
      <MainWrapper className="App">
        <GameContainer game="offscreen_dwitter_test"/>
        <h2> Input a dwitter ID (from <a href="https://dwitter.net">dwitter.net</a>) and it will automatically be loaded for experimentation. </h2>
        <GameContainer dwitter_id={dwitter_id}/>
        <Input type="number" value={dwitter_id} onChange={(event, newValue) => {
          let num = parseInt(event.target.value);
          num = num < 0 ? null : num;
          setId(num)
         }} />
      </MainWrapper>
    </div>
  );
}

export default App;
