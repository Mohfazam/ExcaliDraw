import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";

interface AuthenticatedRequest extends Request {
    userId?: string;
}

export function middleware(req: AuthenticatedRequest, res:Response, next: NextFunction){
    const token = (req.headers["authorization"] as string) ?? "";

    const decoded = jwt.verify(token, JWT_SECRET) as {userId: string};

    if(decoded.userId){
        req.userId = decoded.userId;
        next();
    } else{
        res.status(403).json({
            Message: "Unauthorized"
        })
    }
}