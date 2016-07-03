/**
 * Created by ASUS on 2016/6/6.
 */

var $ = require('jquery');
var BC = require('../../abstract/view.js');
var template = require('./Datetimepicker.html');

require('jquery-datetimepicker');
$.datetimepicker.setLocale("zh");

var Datetimepicker = function(options){
    BC.call(this,options);
}

Datetimepicker.prototype = $.extend({},BC.prototype,{
    constructor:Datetimepicker,
    /**/
    initProperty:function(){
        BC.prototype.initProperty.call(this);
        this.template = template;

        this.events = [{
            eventTarget:'#picker-box-1',
            type:'click',
            callback:this._base.bind(this)
        }]
    },
    _base:function(e){
        e.stopPropagation();

        $("#date-picker-1") .datetimepicker("show");
    },
    render:function(){
        BC.prototype.render.call(this);

        $("#date-picker-1").datetimepicker({
            dayOfWeekStart : 1, // 一周从星期几开始，默认是从星期日（0）开始
            //datepicker:false, // 默认为 true
            timepicker:false // 默认为 true,此时屏蔽了时间选择，只展示日期选择
        });

        $("#date-picker-2").datetimepicker({
            formatDate:'d.m.Y',// 指定 defaultDate 各参数含义。
            // 设置当前日期加 3 天为默认时间（此值最小为 1970/01/01 可正负），必须和上面参数配合使用，不然会导致日期错误
            defaultDate:'+03.01.1970',
            defaultTime:'10:00',
            // defaultDate 主要设置以当前日期为基础的默认日期，而 startDate 主要设置某个固定日期
            //startDate:'03.01.2016',
            timepickerScrollbar:false // 屏蔽时间选择框滚动条

        });

        $('#date-picker-3').datetimepicker({

            //禁止所有周末
            onGenerate:function( ct ){
                $(this).find('.xdsoft_date.xdsoft_weekend')
                    .addClass('xdsoft_disabled');
            },
            timepicker:false
        });

        var dateToDisable = new Date('2016-06-01');
        $('#date-picker-4').datetimepicker({
            beforeShowDay:function(date){
                if(dateToDisable.getTime() > date.getTime()){
                    // 第一个展示表示决定日期是否可选，第二个设置自定义样式
                    return [false,"custom-date-style"];
                }
            },
            timepicker:false
        });

    }
});

module.exports = Datetimepicker;