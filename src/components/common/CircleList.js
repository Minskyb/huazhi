/**
 * Created by ASUS on 2016/6/2.
 */


var BC = require('../../abstract/component');
var $ = require('jquery');
var template = require('./CircleList.html');
var TableRow = require('./TableRow');

if(Window.BT){
    window.BT.TableRow = TableRow
}
else{
    window.BT = {
        TableRow:TableRow
    }
}

var CircleList = function(options){
    BC.call(this,options);
}

CircleList.prototype = $.extend({},BC.prototype,{
    constructor :CircleList,
    initProperty :function(){
        BC.prototype.initProperty.call(this);

        this.template = template;

        this.data = {
            tableData:{
                'colAttributes':[
                    {
                        'colType':'',
                        'className':''
                    },
                    {
                        'colType':'',
                        'className':''
                    },
                    {
                        'colType':'link',
                        'className':'td_w84'
                    }
                ],
                'rows':[
                    ["品种","牌号","厂家"],
                    ["PVC1","SG-5","新疆中泰"],
                    ["PVC2","SG-5","新疆中泰"],
                    ["PVC3","SG-5","新疆中泰"],
                    ["PVC4","SG-5","新疆中泰"]
                ]
            }
        }
    },
    render : function(){
        BC.prototype.render.call(this);
        $(".bt-circle").CircleList();
    }

});


module.exports = CircleList;

