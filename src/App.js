import React, { useEffect, useState } from 'react';
import styled from "styled-components"

import { AppBar } from '@material-ui/core';

import GameContainer from "./GameContainer"

const MainWrapper = styled.div`
  text-align: center
`

const App = () => {
  const [id, setId] = useState(15736)
  useEffect(() => {
    setTimeout(() => {
      console.log("Changing id!")
      setId(15738)
    }, 1000)
  })

  return (
    <div>
      <AppBar />
      <MainWrapper className="App">
        <GameContainer game="offscreen_dwitter_test"/>
        <GameContainer dwitter_id={id}/>
      </MainWrapper>
    </div>
  );
}

export default App;
