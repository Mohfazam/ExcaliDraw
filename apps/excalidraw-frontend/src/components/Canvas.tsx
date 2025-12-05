import { initDraw } from '@/draw';
import { useEffect, useRef, useState } from 'react'
import { IconButton } from './IconButton';
import { Circle, Pencil, RectangleHorizontalIcon } from 'lucide-react';
import { Game } from '@/draw/Game';

export type Tool = "circle" | "rect" | "pencil";

export const Canvas = ({
  roomId, socket
}: {
  roomId: string;
  socket: WebSocket;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<Tool>("circle");
  const [game, setGame] = useState<Game>()
  useEffect(() => {
    //@ts-ignore
    window.selectedTool = selectedTool;
    game?.setTool(selectedTool);
  }, [selectedTool, game])


  useEffect(() => {

    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket)
      setGame(g);
    }

  }, [canvasRef, socket]);
  return (
    <div className='h-full overflow-hidden w-full'>
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
      <TopBar selectedTool={selectedTool} setSelectedTool={(setSelectedTool)}/>
    </div>
  )
}

function TopBar({selectedTool, setSelectedTool}:
  {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void

  }
) {
  return <div className='fixed top-2.5 left-[50%] flex gap-4 m-2'>
    <IconButton
    onClick={() => {
      setSelectedTool("pencil");
    }} 
    activated={selectedTool == "pencil"} 
    icon={<Pencil />}/>


    <IconButton 
    onClick={() => {
      setSelectedTool("rect");
    }} 
    activated={selectedTool == "rect"} 
    icon={<RectangleHorizontalIcon />} />


    <IconButton
    onClick={() => {
      setSelectedTool("circle");
    }} 
    activated={selectedTool == "circle"} 
    icon={<Circle />} />


  </div>
}
