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
 * @providesModule router
 **/
import React from "react";
import Router from "react-router";

import DocumentTitle from "react-document-title";
import routes from "../routes";
import Html from "../components/Html/Html.jsx";
import { getInitialState } from "./../initialState";

/**
 * Server side rendering / router
 * @param req Request
 * @param res Response
 */
export default function (req, res){
  Router.run(routes, req.originalUrl, (Handler, routerState) => {
    const env = req.app.get("env");
    const state = getInitialState(env);
    const innerHTML = React.renderToString(<Handler state={state}/>);
    // always call rewind after rendering components to string
    const title = DocumentTitle.rewind();
    const html = "<!DOCTYPE html>" + React.renderToStaticMarkup(
        <Html
          title={title}
          state={state}>
        {innerHTML}
        </Html>
      );
    const notFound = routerState.routes.some(route => route.name === "not-found");
    res.status(notFound ? 404 : 200).end(html);
  });
}
