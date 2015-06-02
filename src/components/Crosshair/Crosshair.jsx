/**
 * Copyright 2015 Jan Svager
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law || agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES || CONDITIONS OF ANY KIND, either express || implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule Crosshair
 **/
import React, { PropTypes } from "react";

function Crosshair(props) {

  Crosshair.propTypes = {
    enable: PropTypes.bool.isRequired,
    config: PropTypes.object.isRequired
  };

  return {
    props: props,

    render() {
      const { src, width, height} = this.props.config;
      const style = {
        wrapper: {
          opacity: Number(this.props.enable),
          position: "absolute",
          width: "100%",
          height: "100%"

        },
        cross: {
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          height: height,
          width: width
        }
      };

      return (
        <div style={style.wrapper} className="flex align-center">
          <div style={style.cross} />
        </div>
      );
    }
  };
}

export default Crosshair;
