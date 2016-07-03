/**
 * Created by ASUS on 2016/5/20.
 */
var $ = require('jquery');
var template = require('./TableRow.html');
var BC = require('../../abstract/component.js');

var TableRow = function(options){
    BC.call(this,options);
}

TableRow.prototype = $.extend({},TableRow.prototype,BC.prototype);

TableRow.prototype.initProperty = function(){

    BC.prototype.initProperty.call(this);

    this.template = template;

}

TableRow.prototype.constructor = TableRow;

TableRow.prototype.render = function(){
    this.$wrapper.empty();
    this.$wrapper.append(this.$element.children());
    this.$element.remove();
    this.$element = this.$wrapper.clone();
    this.state = 'complete';
}

module.exports = TableRow;