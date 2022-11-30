const {merge} = require('webpack-merge');
let common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[contenthash].js',
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new htmlWebpackPlugin({
			title: 'Webpack App',
			filename: 'index.html',
			template: './src/template.html',
			minify:{
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
			}
		})
	],
	optimization: {
		minimizer: [
			new CssMinimizerPlugin(),
			'...',
		],
	},
});