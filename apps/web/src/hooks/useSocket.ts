import { WS_URL } from "@/app/config";
import { useEffect, useState } from "react";

export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5Mjc2YTE5ZS05MjY5LTQ4ZmYtYjMzOC1jYzM0Y2QwZTE2MDkiLCJpYXQiOjE3NjM4NDUwMzR9.qajjmLoYHjJh8WrWlCtaeZGrDknbp8-WM0tHnB64Ka0`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws)
        }
    }, [])

    return{
        socket, loading
    }
}