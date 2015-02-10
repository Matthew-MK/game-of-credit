module.exports = {
    entry: './src/main.coffee',
    output: {
        filename: 'static/build/bundle.js'
    },
    externals: {
        three: "THREE"
    },
    module: {
        loaders: [
            {test: /\.coffee$/, loader: "coffee-loader"},
            {test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
    },
    resolve: {
        extensions: ["", ".coffee", ".js"]
    }
};
