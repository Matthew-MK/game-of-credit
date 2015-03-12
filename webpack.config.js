module.exports = {
    entry: __dirname + '/client/main.coffee',
    output: {
        path: __dirname + "/static/build/",
        filename: "bundle.js"
    },
    externals: {
        three: "THREE",
        io: "io",
        react: "React"
    },
    module: {
        loaders: [
            {test: /\.coffee$/, loader: "coffee-loader"},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.json$/, loader: 'json'}
        ]
    },
    resolve: {
        extensions: ["", ".coffee", ".js", ".json"]
    }
};
