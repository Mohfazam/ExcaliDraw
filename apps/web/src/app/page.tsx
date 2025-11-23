"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const router = useRouter();

  const [roomId, setRoomId] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <input value={roomId} onChange={(e) => {
        e.preventDefault();
        setRoomId(e.target.value);
      }} type="text" placeholder="Room id"/>

      <button onClick={() => {
        router.push(`/room/${roomId}`);
      }}>Join Room</button>
    </div>
  );
}
