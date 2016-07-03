/**
 * Created by Punk.Li on 2016/7/2.
 */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


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
    entry:{
        index:'./src/entry/index',
        login_register:'./src/entry/loginRegister'
    },
    output:{
        path:path.join(__dirname,'dist'),
        filename:'[name].js',
        publicPath:path.join(__dirname,'static')
    },
    plugins:[
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        commonLib,
        chunkCss
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
                test:/\.less$/,
                loaders:['style','css','less']
            },
            {
                test:/\.html$/,
                loaders:['html-loader'],
                exclude:/node_modules/,
                include:__dirname
            }
        ]
    }
}
