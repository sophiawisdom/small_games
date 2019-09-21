import React, { useEffect, useState, useRef } from 'react';
import styled from "styled-components"

const SmallerContainer = styled.div`
    display: inline-block;
    width: 100%;
    height: 360px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    padding-top: 20px;
`

const TransformedCanvas = styled.canvas`
    overflow: hidden;
    transform-origin: 0 0;
    width: 640px;
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

const GameContainer = props => {
    const canvasRef = useRef(null)
    const [activeWorker, setWorker] = useState(null);
    const [offscreenCanvas, setOffscreenCanvas] = useState(null);

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

        console.log("Canvas ref is filled in to", canvasRef, "with current", canvasRef.current)

        const offscreen = canvasRef.current.transferControlToOffscreen()
        const worker = new Worker(`/sample_games/${props.game}.js`)
        worker.postMessage({ canvas: offscreen }, [offscreen]) // This has to be [offscreen]. Don't know why.
        setWorker(worker)
        setOffscreenCanvas(offscreen)

        return () => cleanup(activeWorker)
    }, [canvasRef])

    return (
        <SmallerContainer>
            <TransformedCanvas
            ref={canvasRef}
            id={`canvas_${props.game}`}
            />
        </SmallerContainer>
    )
}

export default GameContainer;
