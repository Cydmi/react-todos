var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: __dirname + "/app/index.js", //指定入口，__dirname指当前根目录
    // 输出
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }

        ]
    },
    devtool: "cheap-eval-source-map",
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 8080,
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        //热加载
        new webpack.HotModuleReplacementPlugin(),
        //自动构建html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            hash: true
        }),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: JSON.stringify('production')
        //     }
        // }),
        // 构建优化插件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor-[hash].js',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        })
    ]
}
