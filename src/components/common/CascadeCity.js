/**
 * Created by Punk.Li on 2016/8/12.
 */

var $ = require("jquery");
var BC = require('../../abstract/component');
var template = require('./CascadeCity.html');

var originData = require('json!../../city2.json');
var Dropdown = require('./Dropdown');

var CascadeCity = function(options){
    BC.call(this,options);
}

CascadeCity.prototype = $.extend({},BC.prototype,{
    constructor:CascadeCity,
    initProperty:function(){
        BC.prototype.initProperty.call(this);
        this.template = template;

        var province = originData.map(function(item,index){
            return item.name;
        })

        this.views = [
            {
                componentClass:Dropdown,
                options:{
                    wrapper:'.js_cascade_province',
                    data:{
                        'title': "请选择省份",
                        'name':"province",
                        'menus':province
                    }
                }
            },
            {
                componentClass:Dropdown,
                options:{
                    wrapper:'.js_cascade_city',
                    data:{
                        'title': "请选择城市",
                        'name':"city",
                        'menus':[]
                    }
                }
            },
            {
                componentClass:Dropdown,
                options:{
                    wrapper:'.js_cascade_district',
                    data:{
                        'title': "请选择区县",
                        'name':"district",
                        'menus':[]
                    }
                }
            }
        ]

        this.events = [
            {
                eventTarget:'.js_cascade_province',
                type:'click',
                callback:this._provinceHandler.bind(this)
            },
            {
                eventTarget: '.js_cascade_city',
                type: 'click',
                callback: this._cityHandler.bind(this)
            }
        ]
    },
    _provinceHandler:function(e){

        var $target = $(e.target);
        // 如果点击的是标题
        if($target.hasClass("cow_dropdown_title")) return;
        // 重置后面两个内容
        this._resetTitle(this.components.slice(1,3));

        var province = $target.text()
            ,cityArr = [];

        // 获取城市数据
        cityArr = originData.filter(function(item){
            if(item.name !== province){
                return false;
            } else {
                return true;
            }
        })[0].city.map(function(item){
                return item.name;
            });
        // 替换组件数据
        $.extend(this.components[1].data,{
            menus:cityArr
        });
        // 重新渲染
        this.components[1].create();
    },
    _cityHandler:function(e){
        var $target = $(e.target);
        if($target.hasClass("cow_dropdown_title")) return;

        this._resetTitle(this.components.slice(2,3));

        var province = this.components[0].getValue()
            ,city = $target.text()
            ,districtArr = [];

        districtArr = originData.filter(function(item){
            if(item.name != province){
                return false;
            } else {
                return true;
            }
        })[0].city.filter(function(item){
                if(item.name != city){
                    return false;
                } else {
                    return true;
                }
            })[0].district;

        $.extend(this.components[2].data,{
            menus:districtArr
        });
        this.components[2].create();
    },
    _resetTitle:function(arr){
        arr.forEach(function(item){
            item.reset();
        })
    }

});


module.exports = CascadeCity;