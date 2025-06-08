import express, {Router} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const userAuthRouter: Router = express.Router();


userAuthRouter.get("/health", (req, res) => {
    res.status(200).json({
        Message: "api/v1/user/health is hitted"
    });
});

userAuthRouter.post("/signup", (req, res) => {

});

userAuthRouter.post("/signin", (req, res) => {

});

userAuthRouter.post("/room", (req, res) => {

});