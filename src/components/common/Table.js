/**
 * Created by Punk.Li on 2016/5/19.
 */
var $ = require('jquery');
var template = require('./Table.html');
var BC = require('../../abstract/component.js');
var TableRow = require('./TableRow');

require('../../less/table.less');

if(Window.BT){
    window.BT.TableRow = TableRow
}
else{
    window.BT = {
        TableRow:TableRow
    }
}

var Table = function(options){
    BC.call(this,options);
}

Table.prototype = $.extend({},BC.prototype,{
    constructor : Table,
    initProperty : function(){

        BC.prototype.initProperty.call(this);

        this.template = template;

        this.data ={
            tableData:{
                'colAttributes':[
                    {
                        'colType':'',
                        'className':'bt-text-ellipsis'
                    },
                    {
                        'colType':'',
                        'className':'bt-text-ellipsis'
                    },
                    {
                        'colType':'',
                        'className':'td_w84'
                    }
                ],
                'rows':[
                    ["品种","牌号","厂家"],
                    ["PVC","SG-5","新疆中泰"],
                    ["PVC","SG-5","新疆中泰"]
                ]
            }
        }
    }
});

module.exports = Table;