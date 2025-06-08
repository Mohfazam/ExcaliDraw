import express, {Router} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import {JWT_SECRET} from "@repo/backend-common/config"
import { createUserSchema, signinSchema, createRoomSchema } from "@repo/common/types"
console.log(JWT_SECRET);

export const userAuthRouter: Router = express.Router();


userAuthRouter.get("/health", (req, res) => {
    res.status(200).json({
        Message: "api/v1/user/health is hitted",
        JWT_SECRET: JWT_SECRET
    });
});

userAuthRouter.post("/signup", (req, res) => {
    const data = createUserSchema.safeParse(req.body);

    if(!data.success){
        res.status(400).json({
            Message: "Invalid Inputs"
        });
        return;
    }
});

userAuthRouter.post("/signin", (req, res) => {

    const data = signinSchema.safeParse(req.body);

    if(!data.success){
        res.status(400).json({
            Message: "Invalid Inputs"
        });
        return;
    }

});

userAuthRouter.post("/room", (req, res) => {

const data = createRoomSchema.safeParse(req.body);

    if(!data.success){
        res.status(400).json({
            Message: "Invalid Inputs"
        });
        return;
    }

});