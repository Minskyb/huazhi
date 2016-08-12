/**
 * Created by Punk.Li on 2016/8/10.
 */
var $ = require('jquery');
var BC = require('../../abstract/component.js');
var template = require('./Dropdown.html');


var Dropdown = function(options){
    BC.call(this,options);
}

Dropdown.prototype = $.extend({},BC.prototype,{
    constructor:Dropdown,
    initProperty:function(){
        BC.prototype.initProperty.call(this);
        this.template = template;
    },
    reset:function(){
        $(".cow_dropdown_title",this.$element).text(this.data.title);
        $(".cow_dropdown_value",this.$element).val(this.data.title);
    },
    getValue:function(){
        return $(".cow_dropdown_value",this.$element).val();
    }
});


module.exports = Dropdown;