const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const __PATH = {
    DIST: path.resolve(__dirname, 'public'),
    SRC: path.resolve(__dirname, 'resources')
};

module.exports = {
    context: path.resolve(__dirname, './'),
    entry: path.join(__PATH.SRC, 'app.jsx'),
    output: {
        path: __PATH.DIST,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',    // where the fonts will go
                        publicPath: '../'       // override the default path
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    allChunks: true,
                    disable: false,
                    // fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: path.join('css', 'app.css')
        }),
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: false
            },
            hash: true,
            template: './resources/index.html'
        }),
        new CleanWebpackPlugin(__PATH.DIST, {
            watch: true,
            exclude: []
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: 'popper.js',
            Tether: 'tether'
        })
    ]
};








// const webpack = require('webpack');

//
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
//
// const __PATH = {
//     DEST: path.resolve(__dirname, 'public/'),
//     SRC: path.resolve(__dirname, 'resources/')
// };
//
// const config = {
//     entry: path.join(__PATH.SRC, 'index.js'),
//     output: {
//         path: __PATH.DEST,
//         filename: 'app.bundle.js'
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: "babel-loader"
//             },
//             {
//                 test: /\.scss$/,
//                 loader: ExtractTextPlugin.extract('css-loader!sass-loader')
//             }
//         ]
//     },
//     plugins: [
//         new CleanWebpackPlugin(__PATH.DEST)
//     ]
// };