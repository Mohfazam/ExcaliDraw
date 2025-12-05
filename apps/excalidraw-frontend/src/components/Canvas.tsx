import { initDraw } from '@/draw';
import { useEffect, useRef } from 'react'
import { IconButton } from './IconButton';
import { Circle, Pencil, RectangleHorizontalIcon } from 'lucide-react';

export const Canvas = ({
  roomId, socket
}: {
  roomId: string;
  socket: WebSocket;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {

    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
    }

  }, [canvasRef, socket]);
  return (
    <div className='h-full overflow-hidden w-full'>
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
      <TopBar />
    </div>
  )
}

function TopBar() {
  return <div className='fixed top-2.5 left-[50%] flex gap-4'>
    <IconButton icon={<Pencil />} onClick={() => { }} />
    <IconButton icon={<RectangleHorizontalIcon />} onClick={() => { }} />
    <IconButton icon={<Circle />} onClick={() => { }} />
  </div>
}
