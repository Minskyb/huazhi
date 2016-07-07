/**
 * Created by ASUS on 2016/5/17.
 */
require('babel-polyfill');
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

// require('../libs/cowui/dist/cowui.css');
require('../libs/cow/src/modal');

var $ = require('jquery');
var App = require('../abstract/app.js');

var Header = require('../components/home/Header');
var HSlider = require('../components/home/HSlider');
var CCircleList = require('../components/common/CCircleList');

$(document).ready(function(){

    var options = {
        views:[
            {
                componentClass:Header,
                options:{
                    wrapper:".js_c_header"
                }
            },{
		        componentClass:HSlider,
		        options:{
					wrapper:".js_c_h_slider"
		        }
	        },{
		        componentClass:CCircleList,
		        options:{
			        wrapper:".js_c_circle_list"
		        }
	        }
        ]
    }

    var index = new App(options);
    index.init();
});