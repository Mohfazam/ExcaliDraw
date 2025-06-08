import express, {Router} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import path from "path";


dotenv.config({
    path: path.resolve(__dirname, "../../../../../.env")
});
const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);

export const userAuthRouter: Router = express.Router();


userAuthRouter.get("/health", (req, res) => {
    res.status(200).json({
        Message: "api/v1/user/health is hitted",
        JWT_SECRET: JWT_SECRET
    });
});

userAuthRouter.post("/signup", (req, res) => {

});

userAuthRouter.post("/signin", (req, res) => {

});

userAuthRouter.post("/room", (req, res) => {

});