import express, { Express, Request, Response } from "express";
import cors from "cors"

import { PORT } from "./secrets";
import { errorMiddleware } from "./middlewares/error";
import { rootRouter } from "./routes";

const app: Express = express();

app.use(express.json());
app.use(cors())

app.use("/api/v1", rootRouter);
app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
})


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});
