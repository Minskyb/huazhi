/**
 * Created by Punk.Li on 2016/8/8.
 */

var $ = require('jquery');
var BC = require('../../abstract/component.js');
var template = require('./index.html');

var HSlider = require('./HSlider.js');
var CCircleList = require('../common/CCircleList.js');
var Dropdwon = require('../common/Dropdown.js');
var CascadeCity = require('../common/CascadeCity.js');

var Home = function(options){
    BC.call(this,options);
}

Home.prototype = $.extend({},BC.prototype,{
    constructor:Home,
    initProperty:function(){
        BC.prototype.initProperty.call(this);
        this.template = template;

        this.views = [
            {
                componentClass:HSlider,
                options:{
                    wrapper:'.js_c_h_slider'
                }
            },
            {
                componentClass:CCircleList,
                options:{
                    wrapper:'.js_c_circle_list'
                }
            },
            {
                componentClass:Dropdwon,
                options:{
                    wrapper:'.js_c_dropdown',
                    data:{
                        title:'你要干撒嘛！',
                        'name':"province",
                        'menus':["北京","天津","上海","重庆","divider","黑龙江","吉林","辽宁"]
                    }
                }
            },
            {
                componentClass:CascadeCity,
                options:{
                    wrapper:'.js_c_cascade_city'
                }
            }
        ]
    }
});

module.exports = Home;
