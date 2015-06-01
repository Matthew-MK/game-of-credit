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
import compression from "compression";
import DocumentTitle from "react-document-title";
import express from "express";
import http from "http";
import React from "react";
import Router from "react-router";

import routes from "./routes.jsx";
import sitemapRoute from "./components/Sitemap/sitemapRoute";
import { config } from "../package.json";
import { createStaticHtml } from "./components/Html/Html.jsx";
import { generateBundle } from "./bundler";
import { getInitialState } from "./initialState";
import { createWebSocketsServer } from "./sockets/server";

const app = express();
const server = http.createServer(app);

const env = app.get("env");
const port = parseInt(process.env.PORT, 10) || config.port;

generateBundle(env);
createWebSocketsServer(server);

app.use(compression());
app.use("/build", express.static(`${__dirname}/../build`));
app.use("/static", express.static(`${__dirname}/../static`));
app.get("/sitemap.xml", sitemapRoute(routes));

app.get("*", function (req, res) {
  const state = getInitialState(env);
  Router.run(routes, req.originalUrl, (Handler, routerState) => {
    const innerHTML = React.renderToString(<Handler state={state}/>);
    const title = DocumentTitle.rewind(); // always call rewind after rendering components to string
    const notFound = routerState.routes.some(route => route.name === "not-found");
    res.status(notFound ? 404 : 200).end(createStaticHtml({ title, state }, innerHTML));
  });
});

server.listen(port, () => console.log(`Server listening on ${port} in ${env}`));


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
