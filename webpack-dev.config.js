var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/app.html",
    filename: "./index.html"
});

const cleanPlugin = new CleanWebpackPlugin(['dist']);

module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [cleanPlugin, htmlPlugin],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            }
        ]
    }
}