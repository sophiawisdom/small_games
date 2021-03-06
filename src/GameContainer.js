import React, { useEffect, useState, useRef } from 'react';
import styled from "styled-components"

import VariableRange from "./VariableRange"

import { Button } from "@material-ui/core";

const SmallerContainer = styled.div`
    display: inline-block;
    height: 540px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    padding-top: 20px;
`

const TransformedCanvas = styled.canvas`
    overflow: hidden;
    transform-origin: 0 0;
    width: 960px;
    height: 540px;
`

const OnRight = styled.div`
    float: right;
    height: 360px;
`

const cleanup = worker => {
    // Eventually, post some message to the worker, wait for a response, store the data they send back, etc.

    // for the moment they just get terminated.
    console.log("Received cleanup call for worker", worker)
    if (worker != null) {
        worker.terminate()
    }
}

const getDefaults = config => {
    let defaults = {}
    console.log("got config", config)
    config.forEach(conf => {
        defaults[conf.key] = conf.default;
    });
    return defaults;
}

const GameContainer = props => {
    const canvasRef = useRef(null)
    const [worker, setWorker] = useState(null);
    const [varsConfig, setVarsConfig] = useState(null);
    const [currentGameVars, setCurrentGameVars] = useState(null);
    const [finishedLoading, setFinishedLoading] = useState(false);
    const [isPaused, setPaused] = useState(false);

    useEffect(() => {
        console.log("canvas ref is", canvasRef)
        // Because we set the height/width in javascript, to the drawing code
        // the width and height are 1920/1080, but on the screen they can be
        // scaled in CSS.
        canvasRef.current.width = 1920;
        canvasRef.current.height = 1080;

        const offscreen = canvasRef.current.transferControlToOffscreen()
        const url = props.game ? `/sample_games/${props.game}.js` : `/offscreen_for/${props.dwitter_id}.js`
        const newWorker = new Worker(url)
        newWorker.onmessage = message => {
            // Each of these causes a re-render, so we include
            // setFinishedLoading to make it clear when data
            // has been loaded.
            setVarsConfig(message.data);
            setCurrentGameVars(getDefaults(message.data))
            setFinishedLoading(true)
        }
        newWorker.postMessage({ type: "init", canvas: offscreen }, [offscreen]);
        setWorker(newWorker);

        return () => cleanup(worker)
    }, [props.game, props.dwitter_id])

    useEffect(() => {
        if (worker && currentGameVars) {
            worker.postMessage({"type": "set_variables", "vars": currentGameVars});
        }
    }, [currentGameVars])

    const clear = () => {
        worker.postMessage({"type": "clear"})
    }
    const reset = () => {
        clear();
        const defaults = getDefaults(varsConfig);
        worker.postMessage({"type": "set_variables", "vars": defaults});
        setCurrentGameVars(defaults);
    }
    const pause = () => {
        worker.postMessage({"type": "pause"})
        setPaused(!isPaused);
    }

    // Force re-render/re-creation of the canvas.
    const key = props.game ? props.game : props.dwitter_id

    if (key == null) {
        return 
    }

    var containerPieces = [(<TransformedCanvas
    ref={canvasRef}
    id={`canvas_${props.game}`}
    key={key}
    />),
    (<OnRight>
        { finishedLoading ? varsConfig.map(conf =>
        <VariableRange
        defaultValue={conf.default}
        currentValue={currentGameVars[conf.key]}
        name={conf.description}
        min={conf.min}
        max={conf.max}
        onChange={newValue => setCurrentGameVars({...currentGameVars, [conf.key]: newValue})}
        />)
        : null}
    </OnRight>)]

    return (
        <div>
            <div>
                <SmallerContainer>
                    {key == null ? <div /> : containerPieces}
                </SmallerContainer>
            </div>

            <Button variant="contained" onClick={clear}>Clear canvas</Button>
            <Button variant="contained" onClick={reset}>Reset variables</Button>
            <Button variant="contained" onClick={pause}>{isPaused ? "Unpause" : "Pause"}</Button>
        </div>
    )
}

export default GameContainer;
