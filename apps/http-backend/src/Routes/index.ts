import express, {Router}  from "express";
import {userAuthRouter} from "./userAuthRoute/index"

export const mainRouter: Router = express.Router();

mainRouter.get("/health", (req, res) => {
    res.status(200).json({
        Message:"api/v1/Health is hitted"
    })
});

mainRouter.use("/user", userAuthRouter);

