import express, {Router} from "express";

export const userAuthROuter: Router = express.Router();


userAuthROuter.get("/health", (req, res) => {
    res.status(200).json({
        Message: "api/v1/user/health is hitted"
    });
});