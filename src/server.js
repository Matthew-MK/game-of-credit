/**
 * Copyright 2015 Jan Svager
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule server
 **/
import http from "http";
import express from "express";
import compression from "compression";
import socketIO from "socket.io";

import {config} from "../package.json";
import router from "./server/router";
import routes from "./routes.jsx";
import generateBundle from "./server/webpack.compiler";
import sitemapRoute from "./components/Sitemap/sitemapRoute";
import "./dispatcher.js";

let app = express();
let io = socketIO();

const env = app.get("env");
const port = process.env.PORT || config.port;

app.use(compression());
app.use("/build", express.static(`${__dirname}/../build`));
app.use("/static", express.static(`${__dirname}/../static`));
app.get("/sitemap.xml", sitemapRoute(routes));
app.get("*", router); // pass all requests to router

generateBundle(env);

io.on("connection", function (socket) {
  console.log("connect");
});

let server = http.createServer(app);
server.listen(port);
io.listen(server);

server.on("listening", () => {
  console.log(`Server listening on ${port} in ${env}`);
});
server.on("error", (err) => {
  if (err.syscall !== "listen") throw err;
  switch (err.code) {
    case "EACCES":
      console.error(`Port ${port} requires elevated privileges`);
      throw err;
    case "EADDRINUSE":
      console.error(`Port ${port} is already in use`);
      throw err;
    default:
      throw err;
  }
});

export default app;
