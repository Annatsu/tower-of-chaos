// Node Modules
const path = require('path');

// Webpack Plugins
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');



module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src', 'index.js')
    },

    output: {
        filename: '[name].[chunkhash].min.js',
        path: path.resolve(__dirname, 'build')
    },

    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin('build'),
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        }),
        new HtmlWebpackPlugin({
            path: path.resolve(__dirname, 'build', 'index.html'),
            template: 'index.html'
        })
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: false,
                default: false,
                vendor: {
                    chunks: 'all',
                    test: /node_modules/
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    ecma: 8,
                    compress: true,
                    output: {
                        comments: false,
                        beautify: false,
                    }
                }
            })
        ]
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        compress: true,
        port: 3000
    }
};
