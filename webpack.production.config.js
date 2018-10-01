/* eslint-disable no-undef */
"use strict";

const path = require("path"),
    UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
    webpack = require("webpack");

const distDir = "docs";

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, distDir, "js"),
        publicPath: "js/"
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
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery"
        })
    ],

    optimization: {
        minimizer: [new UglifyJsPlugin()],
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: "~",
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },

    mode: "production"
};
