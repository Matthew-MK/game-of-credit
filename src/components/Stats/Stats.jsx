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
 * @providesModule Stats
 **/
import React, { PropTypes } from "react";

function Stats(props) {

  Stats.propTypes = {
    align: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  };

  return {
    props: props,

    render() {

      const { align, count, title } = this.props;

      const style = {
        wrapper: {
          position: "absolute",
          width: "100%",
          height: "100%"
        },
        content: {
          background: "rgba(0, 0, 0, 0.5)",
          color: "#ffffff",
          padding: 10,
          margin: 10
        },
        title: {
          fontSize: "1em"
        },
        count: {
          fontSize: "3em"
        }
      };

      return (
        <div style={style.wrapper} className={"flex " + align}>
          <div style={style.content} className="flex columns align-center">
            <div style={style.title}>{title}</div>
            <div style={style.count}>{count}</div>
          </div>
        </div>
      );
    }
  };
}

export default Stats;
 