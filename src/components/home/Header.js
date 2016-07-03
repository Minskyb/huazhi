/**
 * Created by ASUS on 2016/5/18.
 */

var $ = require('jquery');
var template = require('./Header.html');
var BC = require('../../abstract/component.js');

var Header = function(options){
    BC.call(this,options);
}

Header.prototype = $.extend({},BC.prototype,{
    constructor : Header,
    /**/
    initProperty : function(){
        BC.prototype.initProperty.call(this);
        this.template = template;
    }
});

module.exports = Header;
