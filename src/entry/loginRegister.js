/**
 * Created by ASUS on 2016/5/19.
 */

require('babel-polyfill');
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');


var $ = require('jquery');

$(document).ready(function(){
    console.log("hello world!");
});