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
 * @providesModule IndexPage
 **/

import React, { PropTypes } from "react";
import Title from "react-document-title";
import { Link } from "react-router";

import "./IndexPage.css";

/**
 * Index page component
 * @param initialProps
 */
function IndexPage(initialProps) {

  IndexPage.propTypes = {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,
    socket: PropTypes.object
  };

  return {
    props: initialProps,

    render() {
      const { version, githubLink } = this.props.state;
      return (
        <Title title="Game of Credit">
          <div id="index-page" className="center">
            <h1>Game of Credit
              <small className="version">v{version}</small>
            </h1>
            <h2>3D first person multiplayer shooter</h2>
            <Link className="button" to="play">PLAY NOW</Link>

            <p>
              For more information checkout GitHub <a href={githubLink} target="_blank">repository</a>.
            </p>
          </div>
        </Title>
      );
    }
  };
}

export default IndexPage;
