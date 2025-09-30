import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNDg1ZjQ4NC00ZDU2LTQyNGItOTAxZC04NmU4MjA5ZjlkNjgiLCJpYXQiOjE3NTkyMjQwMjF9.4lNxGbe1wIxitf3hnN8673Yfsh9gPFnWJbQWk2no8mU`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return{
        socket, loading
    }
}