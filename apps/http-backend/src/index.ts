import express from "express"
import { mainRouter } from "./Routes";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/v1", mainRouter);



app.listen(3001, () =>{
    console.log("Server started at port 3001");
})