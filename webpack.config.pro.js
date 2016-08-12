/**
 * Created by Punk.Li on 2016/7/2.
 */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');

/*
 * 注意：兼容模式调试时，请关闭热启动
 * */
module.exports = {
    entry:{
        index:'./src/entry/index',
        login_register:'./src/entry/loginRegister'
    },
    output:{
        path:path.join(__dirname,'dist','js'),
        filename:'[name].js?[chunkhash:8]',
	    chunkFilename: "./async/[name].[id].js"
    },
    plugins:[
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
	    new webpack.optimize.CommonsChunkPlugin({
		    name:"commons",
		    filename:'commons.js',
		    minChunks:2,  // 被至少 2 个 chunks 引用才会被提炼出来。
		    chunks:["index","login_register"]
	    }),
	    new ExtractTextPlugin("../ccs/[name].css?[chunkhash:8]",{
		    allChunks:true,
            disable:false
	    }),
	    new HtmlWebpackPlugin({
		    filename:'../index.html',
		    chunks:['index','commons'],
		    template:'./src/index.html'
	    }),
	    new HtmlWebpackPlugin({
		    filename:'../login_register.html',
		    chunks:['login_register','commons'],
		    template:'./src/login_register.html'
	    })
    ],
    externals:{
        "jquery":"jQuery"
    },
    module:{
        loaders:[
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
	        {
		        test:/\.css$/,
		        loaders:['style','css','postcss?{browsers:["last 2 version", "Firefox 15","ie8","ie9"]}']
	        },
            {
                test:/\.less$/,
                //loaders:['style','css','less','postcss?{browsers:["last 2 version", "Firefox 15","ie8","ie9"]}'],
                loader: ExtractTextPlugin.extract('style','css','less','postcss?{browsers:["last 2 version", "Firefox 15","ie8","ie9"]}')
            },
            {
                test:/\.html$/,
                loaders:['html-loader'],
                exclude:/node_modules/,
                include:__dirname
            }
        ]
    },
	postcss: function () {
		return [autoprefixer, precss];
	}
}
