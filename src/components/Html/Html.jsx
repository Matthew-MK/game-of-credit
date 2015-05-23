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
import React from "react";

/**
 * Basic HTML layout component for server side rendering
 * with application state & client HTML injection.
 * @class Html
 */
export default class Html extends React.Component {

  static propTypes = {
    env: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    version: React.PropTypes.string.isRequired,
    state: React.PropTypes.object.isRequired
  };

  injectState() {
    return {
      __html: `window._STATE_ = ${JSON.stringify(this.props.state)};`
    };
  }

  injectInnerHTML() {
    return {__html: this.props.children};
  }

  render() {
    const { env, version, devURL, title } = this.props;

    const js = (key, src) => <script key={key} src={src}/>;
    const css = (key, href) => <link key={key} href={href} rel="stylesheet"/>;

    const jsLinks = {
      development: [
        js("three", "/static/js/three.js"),
        js("bundle", `${devURL}/build/bundle.js`)
      ],
      production: [
        js("three", "https://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js"),
        js("bundle", `/build/bundle.js?v=${version}`)
      ]
    };

    const cssLinks = {
      development: [
        css("normalize", "/static/css/normalize.css")
      ],
      production: [
        css("normalize", "/static/css/normalize.min.css"),
        css("bundle", `/build/bundle.css?v=${version}`)
      ]
    };
    return (
      <html>
      <head>
        <title>{title}</title>
        <meta name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
        <link rel="icon" href="/static/favicon.ico"/>
        {cssLinks[env]}
      </head>
      <body>
      <div id="render" dangerouslySetInnerHTML={this.injectInnerHTML()}/>
      <script dangerouslySetInnerHTML={this.injectState()}/>
      {jsLinks[env]}
      </body>
      </html>
    );
  }
}