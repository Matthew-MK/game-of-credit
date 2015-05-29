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
 * @providesModule Html
 **/
import React, { PropTypes } from "react";

/**
 * Basic HTML layout component for server side rendering
 * with application state & client HTML injection.
 * @param props {Object} Initial props
 */
function Html(props) {
  Html.propTypes = {
    title: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired
  };

  function inject(obj) {
    return {__html: obj};
  }

  function injectState(state) {
    return inject(`window._STATE_ = ${JSON.stringify(state)};`);
  }

  function injectChildren(children) {
    return inject(children);
  }

  function insertCSS(links) {
    return Object.keys(links)
      .map(key => <link key={key} href={links[key]} rel="stylesheet"/>);
  }

  function insertJS(links) {
    return Object.keys(links)
      .map(key => <script key={key} src={links[key]}/>);
  }

  return {
    render() {
      const { js, css, favicon } = props.config.links;
      return (
        <html>
        <head>
          <title>{props.title}</title>
          <meta name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
          <link rel="icon" href={favicon}/>
          {insertCSS(css)}
        </head>
        <body>
        <div id="render"
             dangerouslySetInnerHTML={injectChildren(props.children)}/>
        <script dangerouslySetInnerHTML={injectState(props.state)}/>
        {insertJS(js)}
        </body>
        </html>
      );
    }
  };
}

export default Html;
