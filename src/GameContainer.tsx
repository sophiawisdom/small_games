import React, { FunctionComponent } from 'react';

type GameContainerProps  = {
    game: string,
    scale?: number
}

const GameContainer: FunctionComponent<GameContainerProps> = ({game, scale = 1} : GameContainerProps) => {
    return (
        <iframe
        sandbox="allow-scripts allow-pointer-lock allow-same-origin" // TODO(wwisdom) - move to different sandboxing mechanism?
        title={`Game ${game}`}
        src={`/iframe_for/${game}`}
        style={{width: "1000px", height: "563px", overflow: "hidden"}} />
        )
}

export default GameContainer;
