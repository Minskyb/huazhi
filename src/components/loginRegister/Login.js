/**
 * Created by ASUS on 2016/5/19.
 */
var $ = require('jquery');
var template = require('./Login.html');
var BC = require('../../abstract/component.js');

var Login = function(options){
    BC.call(this,options);
}

Login.prototype = $.extend({},BC.prototype,{
    constructor : Login,
    /**/
    initProperty : function(){
        BC.prototype.initProperty.call(this);
        this.template = template;

        this.data = {
            bacColor:"#00b2fc",
            bacImg:"./images/pic_login_bg.jpg"
        }
    }
});

module.exports = Login;