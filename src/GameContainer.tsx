import React, { FunctionComponent } from 'react';

type GameContainerProps  = {
    game: string,
    scale?: number
}

const GameContainer: FunctionComponent<GameContainerProps> = ({game} : GameContainerProps) => {
    return (
        <iframe
        sandbox="allow-scripts allow-pointer-lock allow-same-origin" // TODO(wwisdom) - move to different sandboxing mechanism?
        title={`Game ${game}`}
        src={`${process.env.PUBLIC_URL}/iframe_for/${game}`}
        style={{width: "800px", height: "450px", overflow: "hidden"}} />
        )
}

export default GameContainer;
