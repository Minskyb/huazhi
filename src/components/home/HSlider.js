/**
 * Created by ASUS on 2016/5/18.
 */

var $ = require('jquery');
var BC = require('../../abstract/component.js');
var template = require('./HSlider.html');

var Slider = require('../../libs/cow/src/slider');

var HSlider = function(options){
    BC.call(this,options);
}

HSlider.prototype = $.extend({},BC.prototype,{
    constructor : HSlider,
    /**/
    initProperty : function(){
        BC.prototype.initProperty.call(this);
        this.template  = template;

        this.data = {
            sliders:[
                {
                    img:'./images/avd.jpg',
                    url:'http://www.baidu.com/'
                },
                {
                    img:'./images/blog.jpg',
                    url:'http://www.aiqiyi.com/'
                },
                {
                    img:'./images/fisrtbg.jpg',
                    url:'http://www.uicare.cn/'
                }
            ]
        }
    },
    render : function(){
        BC.prototype.render.call(this);

	    var slider = Slider($("#h_slider"),{});
        // $(".bt-slider").Slider({});
    }
});

module.exports = HSlider;