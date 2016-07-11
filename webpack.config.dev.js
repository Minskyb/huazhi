/**
 * Created by Punk.Li on 2016/7/2.
 */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');

var commonLib = new webpack.optimize.CommonsChunkPlugin({
    name:"commons",
    filename:'commons.js',
    minChunks:2,  // 被至少 2 个 chunks 引用才会被提炼出来。
    chunks:["index","loginRegister"]
})

var chunkCss =  new ExtractTextPlugin("[name].css",{
    allChunks:true
})

/*
* 注意：兼容模式调试时，请关闭热启动
* */
module.exports = {
    devtool:'source-map',
    entry:{
        index:'./src/entry/index',
        login_register:'./src/entry/loginRegister'
    },
    output:{
        path:path.join(__dirname,'dist','js'),
        filename:'[name].js'
    },
    plugins:[
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        commonLib,
        chunkCss,
	    new HtmlWebpackPlugin({
		    filename:'../index.html',
		    chunks:['index','commons'],
		    template:'./src/index.html'
	    }),
	    new HtmlWebpackPlugin({
		    filename:'../login_register.html',
		    chunks:['index','commons'],
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
                loader: ExtractTextPlugin.extract(
                    // activate source maps via loader query
                    'css?sourceMap!'+
                    'less?sourceMap!' +
                    'postcss?{browsers:["last 2 version", "Firefox 15","ie8","ie9"]}'
                )
            },
            // {
            //    test:/\.less$/,
            //    loaders:['style','css','less']
            // },
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
	},
	devServer:{
        hot:true  // 关闭这里
    }
}
