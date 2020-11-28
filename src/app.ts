require("dotenv").config();
import express, {
  Application,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
// import {notFound} from './middlewares/errorHandlers.js'

// import local routes
const UserRouter = require("./routes/users-routes");
const ProjRouter = require("./routes/project-routes");
const DonoRouter = require("./routes/donation-routes");

// set server up
const server: Application = express();

// use 3rd party middlewares
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan("short"));

// use custom routes
server.use("/users", UserRouter);
server.use("/projects", ProjRouter);
server.use("/donations", DonoRouter);

// generic welcome
server.get("/", (_, res: Response, __) => {
  res.status(200).json({ message: "Welcome to Lambda VR Funding" });
});

// not found
// server.use(notFound);

// error handling
server.use(
  (err: ErrorRequestHandler, _: Request, res: Response, __: NextFunction) => {
    console.log("FROM app.js", err);
    res.status(500).json({ message: "From App: Something Went Wrong" });
  }
);

export default server;
