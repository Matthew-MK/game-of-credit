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
 * @providesModule Url
 **/

import React from "react";
import shouldPureComponentUpdate from "react-pure-render/function";

/**
 * @class Url
 */
class Url extends React.Component {

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const {protocol, host, path, lastMod, changeFreq, priority} = this.props;
    var changeFreqElement, priorityElement;

    if (changeFreq !== undefined)
      changeFreqElement = <changefreq>{changeFreq}</changefreq>;
    if (priority !== undefined)
      priorityElement = <priority>{priority}</priority>;
    return (
      <url>
        <loc>{`${protocol}://${host}${path}`}</loc>
        <lastmod>{lastMod}</lastmod>
        {changeFreqElement}
        {priorityElement}
      </url>
    );
  }
}

Url.propTypes = {
  protocol: React.PropTypes.oneOf(["http", "https"]).isRequired,
  host: React.PropTypes.string.isRequired,
  lastMod: React.PropTypes.string,
  changeFreq: React.PropTypes.oneOf([
    "always", "hourly", "daily", "weekly", "monthly", "yearly", "never"
  ]),
  priority: React.PropTypes.string
};

export default Url;
