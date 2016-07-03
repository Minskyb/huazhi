/**
 * Created by ASUS on 2016/5/19.
 */
var $ = require('jquery');
var template = require('./Footer.html');
var BC = require('../../abstract/component.js');

var Footer = function(options){
    BC.call(this,options);
}

Footer.prototype = $.extend({},Footer.prototype,BC.prototype);
Footer.prototype.constructor = Footer;

Footer.prototype.initProperty = function(){

    BC.prototype.initProperty.call(this);

    this.template = template;
}


module.exports = Footer;