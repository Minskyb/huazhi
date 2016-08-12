/**
 * Created by ASUS on 2016/5/17.
 */
require('babel-polyfill');
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

/*
*  常用插件
* */
require('../libs/cow/src/modal');
require('../libs/cow/src/dropdown');

/*
*  index 特有样式
* */
require('../less/index.less');

var $ = require('jquery');
var App = require('../abstract/app.js');

var Header = require('../components/common/Header');
var Home = require('../components/home/');

$(document).ready(function(){

    var options = {
        views:[
            {
                componentClass:Header,
                options:{
                    wrapper:".js_c_header"
                }
            }
        ],
        routers:[
            {
                componentId:"home",
                componentClass:Home
            }
        ]
    }

    var index = new App(options);
    index.init();
});