import { initDraw } from '@/draw';
import { useEffect, useRef, useState } from 'react'
import { IconButton } from './IconButton';
import { Circle, Pencil, RectangleHorizontalIcon } from 'lucide-react';

type Shape = "circle" | "rect" | "pencil";

export const Canvas = ({
  roomId, socket
}: {
  roomId: string;
  socket: WebSocket;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<Shape>("circle");

  useEffect(() => {
    //@ts-ignore
    window.selectedTool = selectedTool;

  }, [selectedTool])


  useEffect(() => {

    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
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
    selectedTool: Shape,
    setSelectedTool: (s: Shape) => void

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
