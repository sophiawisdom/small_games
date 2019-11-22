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

console.log("v4")

const GameContainer = props => {
    const canvasRef = useRef(null)
    const [activeWorker, setWorker] = useState(null);
    const [offscreenCanvas, setOffscreenCanvas] = useState(null);

    useEffect(() => {
        if (canvasRef.current) {
            if (canvasRef.current.width !== 1920) {
                console.log("about to set width")
                canvasRef.current.width = 1920;
            }
            if (canvasRef.current.height !== 1080) {
                console.log("about to set height")
                canvasRef.current.height = 1080;
            }
        }
        /*
        if (activeWorker) {
            cleanup(activeWorker)
            setWorker(null)
            setOffscreenCanvas(null)
        }
        */
        
        if (!offscreenCanvas) {
            console.log("transferring control from canvas ", canvasRef.current, "Offscreen canvas is ", offscreenCanvas)
            const offscreen = canvasRef.current.transferControlToOffscreen()
            const url = props.game ? `/sample_games/${props.game}.js` : `/offscreen_for/${props.dwitter_id}.js`
            const worker = new Worker(url)
            worker.postMessage({ canvas: offscreen }, [offscreen]) // This has to be [offscreen] not just offscreen. Don't know why.
            setWorker(worker)
            setOffscreenCanvas(offscreen)
        }

        return () => cleanup(activeWorker)
    }, [canvasRef, activeWorker, props.dwitter_id, props.game, offscreenCanvas])

    return (
        <SmallerContainer>
            <TransformedCanvas
            ref={canvasRef}
            id={props.game ? `canvas_${props.game}` : `canvas_dwitter_${props.dwitter_id}`}
            />
        </SmallerContainer>
    )
}

export default GameContainer;
