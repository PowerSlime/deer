/* eslint-disable no-undef */
"use strict";

const path = require("path"),
    webpack = require("webpack");

const distDir = "docs";

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, distDir, "js"),
        publicPath: "/js/"
    },

    module: {
        rules: [{
            test: /\.(css|sass|scss)$/,
            use: [
                {loader: "style-loader"},
                {loader: "css-loader"},
                {loader: "sass-loader"}
            ]
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                {loader: "babel-loader"}
            ]
        }, {
            test: /\.pug$/,
            use: [
                {loader: "pug-loader"}
            ]
        }, {
            test: /\.(png|jpg|jpeg|svg|ttf|eot|woff|woff2)$/,
            use: [
                {
                    loader: "file-loader"
                }
            ]
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery"
        })
    ],

    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, distDir),
        hot: true
    },

    mode: "development",
    watch: true
};
