###
Copyright 2015 Jan Svager

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
###

React = require("react")
mapping = require("../mapping.json")

{PureRenderMixin} = React["addons"]
{div} = React.DOM


###
  Player crosshair UI
###
Crosshair = React.createFactory React.createClass

  mixins: [PureRenderMixin]

  crosshairUrl: mapping['ui']['crosshair']

  render: ->
    div
      id: "crosshair"
      style:
        top: (@props.height / 2) - 43
        left: (@props.width / 2) - 43
        opacity: if @props.playing then 1 else 0
        backgroundImage: "url('#{@crosshairUrl}')"


UIBox = React.createFactory React.createClass
  mixins: [PureRenderMixin]

  getDefaultProps: ->
    top: "auto"
    left: "auto"
    right: "auto"
    bottom: "auto"

  render: ->
    count = @props.count or @props.defaultCount
    style =
      top: @props.top
      left: @props.left
      right: @props.right
      bottom: @props.bottom

    div {className: "ui-box", style: style},
      div {}, @props.title
      div {}, count

###
  All player UI components together
###
UI = React.createClass

  mixins: [PureRenderMixin]

  render: ->
    div id: "ui",
      Crosshair
        width: @props.width
        height: @props.height
        playing: @props.playing
      UIBox
        defaultCount: 100
        title: "Hitpoints"
        left: 0
        bottom: 0
      UIBox
        defaultCount: 0
        count: @props.ammo
        title: "Ammo"
        right: 0
        bottom: 0


module.exports = React.createFactory(UI)