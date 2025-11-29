"use client"
import {initDraw} from "@/draw"
import { useEffect, useRef } from "react"

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        if (canvasRef.current) {
            initDraw(canvasRef.current);
        }

    }, [canvasRef]);
    return (
        <div className="w-screen h-screen bg-white">
            <canvas ref={canvasRef} width={2000} height={1000}>Inside canvas</canvas>
        </div>
    )
}