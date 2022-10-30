import * as controllers from "./controllers";
import * as middlewares from "./middlewares";
import express from "express";
import http from "http";
import path from "path";

const PORT = process.env.NODE_ENV || 8080;

const createServerFrom = app => {
  const server = http.createServer(app);
  server.on("listening", () => {
    console.log(`Listening to application on PORT ${PORT}`);
  });
  return server;
}

const createExpressApp = () => {
  const app = express();
  app.use(express.static(path.join(__dirname, "client")));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use("/api/v1", controllers.api);
  app.use("*", middlewares.fourOFour());
  app.use(middlewares.error());
  return app;
}

const app = createExpressApp();
const server = createServerFrom(app);
server.listen(PORT);