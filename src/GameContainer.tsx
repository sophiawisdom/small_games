import React, { FunctionComponent } from 'react';

type GameContainerProps  = {
    game: string
}

const GameContainer: FunctionComponent<GameContainerProps> = ({game} : GameContainerProps) => {
    return (<iframe
        sandbox="allow-scripts allow-pointer-lock allow-same-origin" // TODO(wwisdom) - move to different sandboxing mechanism?
        src={`/iframe_for/${game}`} />)
}

export default GameContainer;
