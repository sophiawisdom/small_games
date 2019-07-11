import React, { FunctionComponent } from 'react';

type GameContainerProps  = {
    game: string,
    scale?: number
}

const GameContainer: FunctionComponent<GameContainerProps> = ({game, scale = 1} : GameContainerProps) => {
    return (<iframe
        sandbox="allow-scripts allow-pointer-lock allow-same-origin" // TODO(wwisdom) - move to different sandboxing mechanism?
        style={
            {
                transform: `scale(${scale})`,
                transformOrigin: "0 0",
                overflow: "hidden"
            }
        }
        src={`/iframe_for/${game}`} />)
}

export default GameContainer;
