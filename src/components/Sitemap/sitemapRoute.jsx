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
 * @providesModule route
 **/
import React from "react";
import Sitemap from "./Sitemap.jsx";

export default function (routes:Array) {
  const lastUpdate = new Date().toISOString();
  return function (req, res) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>` +
      React.renderToStaticMarkup(
        <Sitemap
          lastUpdate={lastUpdate}
          protocol={req.secure ? "https" : "http"}
          host={req.headers.host}
          routes={routes}/>
      );
    res.type("text/xml").end(sitemap);
  };
}



