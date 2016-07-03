/**
 * Created by ASUS on 2016/5/18.
 */
var $ = require('jquery');
var template = require('./404.html');
var BC = require('../abstract/component.js');

var C404 = function(options){
    BC.call(this,options);
}

C404.prototype = $.extend({},BC.prototype,{
    constructor : C404,
    /**/
    initProperty : function(){
        BC.prototype.initProperty.call(this);
        this.template = template;
    }
});

module.exports = C404;
