path = require("path")
webpack = require('webpack')
pkg = require("./package")

makeConfig = (env) ->

  plugins =
    common: [
      new webpack.DefinePlugin
        _VERSION: JSON.stringify(pkg.version)
        _ENVIRONMENT: JSON.stringify(env)
    ]
    production: [
      new webpack.optimize.DedupePlugin()
      new webpack.optimize.OccurenceOrderPlugin()
      new webpack.optimize.UglifyJsPlugin()
    ]
    development: []

  return {
    entry:
      path.join(__dirname, 'client/main.coffee')
    output:
      path: path.join(__dirname, "static/build")
      filename: "bundle.js"
    externals:
      three: "THREE",
      io: "io",
      react: "React"
    module:
      loaders: [
        {test: /\.coffee$/, loader: "coffee-loader"},
        {test: /\.css$/, loader: 'style-loader!css-loader'},
        {test: /\.json$/, loader: 'json'}
      ]
    resolve:
      extensions: ["", ".coffee", ".js", ".json"]
    plugins: plugins["common"].concat(plugins[env])
  }

module.exports = makeConfig

