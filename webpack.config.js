// Node Modules
const path = require('path');

module.exports = {
    mode: 'development',

    entry: {
        app: path.resolve(__dirname, 'src/index.js')
    },

    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'build')
    },

    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
};
