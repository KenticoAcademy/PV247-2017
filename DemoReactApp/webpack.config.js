/* eslint-disable no-undef */
const webpack = require('webpack');

const productionEnv = 'production';
const env = process.env.NODE_ENV;

const babelLoader = {
    loader: 'babel-loader',
    options: {
        presets: [['env', {
            targets: {
                browsers: ['last 2 versions', 'not ie <= 11']
            }
        }], ['stage-2']]
    }
};

const eslintLoader = {
    loader: 'eslint-loader',
    options: {}
};

const javascriptLoaders = [babelLoader, eslintLoader];

const plugins = [];

if (env === productionEnv) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
    entry: ['babel-polyfill', './src/app.jsx'],
    output: {
        path: __dirname + '/build',
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: javascriptLoaders
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: javascriptLoaders
            },
            {
                test: /plugin\.css$/,
                loaders: [
                    'style-loader', 'css-loader',
                ],
            },
            {
                test: /\.css$/,
                exclude: /plugin\.css$/,
                loader: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'styles/[name].[ext]',
                        },
                    },
                    {
                        loader: 'extract-loader',
                        options: {
                            publicPath: '../',
                        }
                    },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'assets/[name].[ext]',
                        limit: 10000,
                    },
                }
            },
            {
                test: /\.(html|jpg|png|ico)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        context: 'static',
                    }
                },
            }
        ]
    },
    devtool: env === productionEnv ? '' : 'source-map',
    plugins: plugins
};