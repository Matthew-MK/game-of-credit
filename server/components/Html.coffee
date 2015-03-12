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

React = require("react/addons")
pkg = require("../../package")
{PureRenderMixin} = React["addons"]
{html, head, title, meta, link, body, script, div} = React.DOM

scripts =
  development: [
    script(key: 1, src: "https://cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react-with-addons.js")
    script(key: 2, src: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r70/three.js")
    script(key: 3, src: "https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.3.4/socket.io.js")
    script(key: 4, src: "bundle.js")
  ]
  production: [
    script(key: 1, src: "https://cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react-with-addons.min.js")
    script(key: 2, src: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r70/three.min.js")
    script(key: 3, src: "https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.3.4/socket.io.min.js")
    script(key: 4, src: "static/build/bundle.js?v=#{pkg.version}")
  ]

Html = React.createClass

  mixins: [PureRenderMixin]

  getDefaultProps: ->
    title: "Play"
    name: pkg["name"].replace(/-/g, ' ')

  render: ->
    html {lang: "en"},
      head {},
        title {},
          "#{@props.title} | #{@props.name}"
        link
          rel: "icon"
          href: "static/favicon.ico"
        meta
          name:"viewport"
          content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
      body {},
        div {id: "app", "data-server": @props.socketServer},
          @props.children
        scripts[@props.env]

module.exports = React.createFactory(Html)