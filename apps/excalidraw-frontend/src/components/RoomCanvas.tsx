"use client"

import { initDraw } from '@/draw';
import React, { useEffect, useRef, useState } from 'react'
import { WS_URL } from '../../config';
import { Canvas } from './Canvas';

export const RoomCanvas = ({roomId}: {roomId:string}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiOWQyZDRkYS0wZDE1LTRmOGMtODNhYy1iZWU4Y2YyZWQ0YzQiLCJpYXQiOjE3NjQ3NDUwODR9.clg_b4KT-IFZUOYcjNvugM81GZVklLd7vDPQBBSAnnA`);

    ws.onopen = () => {
        setSocket(ws);

        ws.send(JSON.stringify({
            type: "join_room",
            roomId
        }));
    }
  }, [])


    if(!socket){
        return <div>
            Connecting To Server.....
        </div>
    }
    return (
        <div>
            <Canvas roomId={roomId} socket={socket}/>
            
        </div>
    )
}
