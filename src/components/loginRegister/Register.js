/**
 * Created by ASUS on 2016/5/19.
 */
var $ = require('jquery');
var template = require('./Register.html');
var BC = require('../../abstract/component.js');

require('jquery-datetimepicker');
$.datetimepicker.setLocale("zh");

var Register = function(options){
    BC.call(this,options);
}

Register.prototype = $.extend({},BC.prototype,{
    constructor : Register,
    /**/
    initProperty : function(){
        BC.prototype.initProperty.call(this);
        this.template = template;

        this.events = [
            {
                eventTarget:'#picker-box-1',
                type:'click',
                callback:function(){
                    $("#date-picker-1").datetimepicker('show');
                }.bind(this)
            }
        ]
    },
    render:function(){
        BC.prototype.render.call(this);

        $("#date-picker-1").datetimepicker({
            dayOfWeekStart : 1,
            disabledDates:['1986/01/08','1986/01/09','1986/01/10'],
            startDate:	'1986/01/05'
        });
    }
});

module.exports = Register;