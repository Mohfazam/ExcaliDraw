"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const router = useRouter();

  const [roomId, setRoomId] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <input value={roomId} onChange={(e) => {
          e.preventDefault();
          setRoomId(e.target.value);
        }} type="text" placeholder="Room id" className="p-4"/>

        <button onClick={() => {
          router.push(`/room/${roomId}`);
        }} className="p-4">Join Room</button>
      </div>
    </div>
  );
}
