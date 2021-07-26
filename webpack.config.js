const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'development',
    optimization:{
        minimizer:[new OptimizeCssAssetsPlugin({})]
    },
    module: {
        rules:[
            {
                test: /\.css$/i,
                exclude:/style\.css$/i,
                use:[
                    'style-loader', //para combinar los archivos con main.js
                    'css-loader'
                ]
            },
            {
                test: /style\.css$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options:{
                    attributes: false,
                    minimize: false,
                },
            },
            {
                test: /\.(png|svg|jpg|gift)$/i,
                use:[
                    {
                        loader: 'file-loader',
                        options:{
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            // filename:'[name].[contentHash].css', para no cargar el cache
            filename:'[name].[contentHash].css',
            ignoreOrder:false
        })
    ]
}