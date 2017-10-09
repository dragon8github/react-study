var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')

module.exports = {
    entry: {
        main: __dirname + '/src/main.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/build'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "my title",
            filename: __dirname + "/build/index.html",
            template: __dirname + "/index.html",
            chunks: ["main"]
        })
    ],
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
}