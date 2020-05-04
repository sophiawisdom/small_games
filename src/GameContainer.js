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

const onMessage = message => {
    console.log("Got message from worker!", message)
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
    const [activeWorker, setWorker] = useState(null);
    const [offscreenCanvas, setOffscreenCanvas] = useState(null);
    const [varsConfig, setVarsConfig] = useState(null);
    const [currentGameVars, setCurrentGameVars] = useState(null);
    const [finishedLoading, setFinishedLoading] = useState(false);
    const [isPaused, setPaused] = useState(false);

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.width = 1920;
            canvasRef.current.height = 1080;
        }
        if (activeWorker) {
            cleanup(activeWorker)
            setWorker(null)
            setOffscreenCanvas(null)
        }

        const offscreen = canvasRef.current.transferControlToOffscreen()
        const url = props.game ? `/sample_games/${props.game}.js` : `/offscreen_for/${props.dwitter_id}.js`
        const worker = new Worker(url)
        worker.onmessage = message => {
            // Each of these causes a re-render, so you need to set
            // current game vars before default game vars. because
            // we assume current contains everything in default.
            setVarsConfig(message.data);
            setCurrentGameVars(getDefaults(message.data))
            setFinishedLoading(true)
        }
        worker.postMessage({ type: "init", canvas: offscreen }, [offscreen]); // This has to be [offscreen]. Don't know why.
        setWorker(worker);
        setOffscreenCanvas(offscreen);

        return () => cleanup(activeWorker)
    }, [canvasRef])

    useEffect(() => {
        if (activeWorker && currentGameVars) {
            activeWorker.postMessage({"type": "set_variables", "vars": currentGameVars});
        }
    }, [currentGameVars])

    const clear = () => {
        activeWorker.postMessage({"type": "clear"})
    }
    const reset = () => {
        clear();
        const defaults = getDefaults(varsConfig)
        activeWorker.postMessage({"type": "set_variables", "vars": defaults});
        setCurrentGameVars(defaults);
    }
    const pause = () => {
        activeWorker.postMessage({"type": "pause"})
        setPaused(!isPaused);
    }

    return (
        <div>
            <div>
                <SmallerContainer>
                    <TransformedCanvas
                    ref={canvasRef}
                    id={`canvas_${props.game}`}
                    />
                    <OnRight>
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
                    </OnRight>
                </SmallerContainer>
            </div>
            <Button variant="contained" onClick={clear}>Clear canvas</Button>
            <Button variant="contained" onClick={reset}>Reset variables</Button>
            <Button variant="contained" onClick={pause}>{isPaused ? "Unpause" : "Pause"}</Button>
        </div>
    )
}

export default GameContainer;
