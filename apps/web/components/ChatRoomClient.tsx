"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hook/useSocket";

export function ChatRoomClient({ message, id }: { message: { message: string }[], id: string }) {

    const { socket, loading } = useSocket();
    const [currentMessage, setCurrentMessage] = useState("");
    const [chats, setChats] = useState(message)

    useEffect(() => {
        if (socket && !loading) {


            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id
            }));


            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);

                if (parsedData.type === "chat") {
                    setChats(c => [...c, {message: parsedData.message}]);
                }
            }
        }
    }, [socket, loading, id]);


    return (
        <div>
            {chats.map(m => <div>{m.message}</div>)}

            <input type="text" placeholder="Enter a message"
                value={currentMessage}
                onChange={e => {
                    setCurrentMessage(e.target.value);
                }}
            />

            <button onClick={() => {
                socket?.send(JSON.stringify({
                    type: "chat",
                    message: currentMessage,
                    roomId: id
                }))
            setCurrentMessage("");
            }}>Send Message</button>

        </div >
    )

}