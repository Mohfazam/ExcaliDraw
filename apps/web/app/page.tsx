"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {

  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen">
      <input type="text" placeholder="Room Id"
      className="border-2 border-black m-4 p-2 rounded" 
      onChange={(e) => {
        setRoomId(e.target.value)
      }}
      />

      <button
      className="hover:cursor-pointer"
      onClick={() => {
        router.push(`/room/${roomId}`);
      }}>Join Room</button>
    </div>
  );
}
