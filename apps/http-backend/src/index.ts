import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { createRoomSchema, createUserSchema, signinSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();

app.post("/signup", (req, res) => {

    const data = createUserSchema.safeParse(req.body);

    if(!data.success){
        return res.json({
            Message: "Incorrect Inputs"
        });
    }

    res.json({
        userId: "123"
    })
});

app.post("/signin", (req, res) => {

    const data = signinSchema.safeParse(req.body);

    if(!data.success){
        return res.json({
            Message: "Incorrect Inputs"
        });
    }
    const userId = 1;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        token
    });
});

app.post("/room", middleware, (req, res) => {
    const data = createRoomSchema.safeParse(req.body);

    if(!data.success){
        return res.json({
            Message: "Incorrect Inputs"
        });
    }

    res.json({
        roomId: 123123
    });

});

app.listen(3001, () => {
    console.log("Server started on port 3001");
});