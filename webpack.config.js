module.exports = {
    entry: './src/main.coffee',
    output: {
        filename: 'static/build/bundle.js'
    },
    externals: {
        three: "THREE",
        io: "io"
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
