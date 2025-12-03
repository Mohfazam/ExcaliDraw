"use client"

import { initDraw } from '@/draw';
import React, { useEffect, useRef, useState } from 'react'
import { WS_URL } from '../../config';
import { Canvas } from './Canvas';

export const RoomCanvas = ({roomId}: {roomId:string}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
        setSocket(ws);
    }
  }, [])


    if(!socket){
        return <div>
            Connecting To Server.....
        </div>
    }
    return (
        <div>
            <Canvas roomId={roomId}/>
            
        </div>
    )
}
