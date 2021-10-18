const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require("fs");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


function generateHtmlTemplate(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split(".");
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            filename: `views/${name}.html`,
            inject: 'body',
        });
    });
}

const htmlPlugins = generateHtmlTemplate("./src/views");


module.exports = {

    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.min.[contenthash].js',
    },
    resolve: {
        extensions: ['.js'],
    },

    mode: 'production',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|gif|jpe?g|svg|ico)$/i,
                type: 'asset',
                generator: {
                    filename: 'assets/images/[name].[hash][ext]',
                },
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                type: 'asset',
                generator: {
                    filename: 'assets/fonts/[name].[hash][ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
            inject: 'body',
        }),
        new MiniCssExtractPlugin({
            filename: "styles.min.[contenthash].css"
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin(),
    ].concat(htmlPlugins),

    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
}
