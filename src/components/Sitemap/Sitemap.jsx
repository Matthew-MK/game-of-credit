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
 * @providesModule Sitemap
 **/

import React from "react";
import Router from "react-router";
import Url from "./SitemapUrl.jsx";

/**
 * Simple sitemap component generated from react router routes.
 * @class Sitemap
 */
class Sitemap extends React.Component {

  createUrlSet(route, urls = [], level = 0) {

    if (route.props !== undefined && route.type === Router.Route) {
      const {path, name, lastMod, changeFreq, priority, children} = route.props;
      const {protocol, host} = this.props;
      urls.push(
        <Url
          key={level}
          protocol={protocol}
          host={host}
          path={path || ("/" + name)}
          lastMod={lastMod || this.props.lastUpdate}
          changeFreq={changeFreq}
          priority={priority}/>
      );
      if (children !== undefined) {
        const length = children.length;
        for (var i = 0; i < length; i++)
          urls = this.createUrlSet(children[i], urls, ++level);
      }
    }
    return urls;
  }

  render() {
    return (
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        {this.createUrlSet(this.props.routes)}
      </urlset>
    );
  }
}

Sitemap.propTypes = {
  lastUpdate: React.PropTypes.string,
  protocol: React.PropTypes.oneOf(["http", "https"]).isRequired,
  host: React.PropTypes.string.isRequired,
  routes: React.PropTypes.element.isRequired
};

export default Sitemap;
