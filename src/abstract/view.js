/*
 * Created by Punk.Li on 2016/5/14.
 *
 *  BView 为所有组件基类，主要负责： 数据加载、template 的解析、DOM 操作及事件监听等。
 *
 *
 * this.animation_duration (后面简称 duration )动画执行时间
 * 当 duration <=0 时不执行动画
 * 当 duration > 0 时
 * ---------   进入  ---------------
 * 在组件被添加进入 DOM 之前添加 template_enter 类；
 * 然后经过 duration 毫秒后，添加 template_enter_active 类
 * ---------   卸载  ---------------
 * 在组件被卸载之前，添加 template_leave 类
 * 然后经过 duration 毫秒后，添加 template_leave_active 类
 * 每 0.5 秒检查一次组件上的动画是否执行完成，
 * 如果完成则把组件从 DOM 中移除。
 *
 *     this.events =[
 *     {
 *          eventTarget:'.target', // 采用字符串是因为元素还未添加到 DOM 结构之前是获取不到的，.
 *          type:'click',
 *          callback:'func'
 *      }
 *     ];
 * */


var _ = require('underscore');
var $ = require('jquery');

var BView = function(options){

    this.initProperty();
    this.setOptions(options);
    this.initData();
}

/* 基本属性初始化 */
BView.prototype.initProperty = function(){

    this.$wrapper = undefined;
    this.template = null;
    this.element = undefined;
    this.$element = undefined;
    this.state = 'init';
    this.data = null;
    this.id = _.uniqueId('template_ui_');
    console.time(this.id);
    this.events = [
        //{
        //    eventTarget:'jquery selector',
        //    type:'eventType',
        //    callback:'callback'
        //}
    ];
    // !=0 时，框架会为组件的载入载出提供一个 class 的变化过程，方便 css 动画控制
    // animation_duration 即为 class 变化的时间间隔
    this.animation_duration = 0;
}

BView.prototype.setOptions = function(options){

    $.extend(this,options);

    if(_.isString(this.wrapper) && /^\.|\#/.test(this.wrapper)){
        this.$wrapper = $(this.wrapper);

        if(!this.$wrapper.length){
            console.error("未找到指定容器!");
        }
    }
    else{
        console.error("wrapper 未找到，请检查传入值是否符合规则（. 或 # 开头）")
    }
}

/*
* 如果数据需要异步加载，请重写此方法，
* 并确保在数据加载完后，调用 this.create()
* 否则 template 不会被渲染。
* */
BView.prototype.initData = function(){

    this.create();
}

BView.prototype.create = function(){

    if(!this.$wrapper){
        console.error("$wrapper 错误！");
    }

    if(!this.template){
        return ;
    }

    this.element = this.parse();
    if(!this.element){
        console.error('template 解析失败！请检查 template 格式或数据是否已初始化！');
        return;
    }
    this.$element = $(this.element);
    this.$element.addClass(this.id);
    this.render();
    this.addEvent();
}

BView.prototype.parse = function(data){

    if(_.isString(this.template)){
        this.template = _.template(this.template);
    }

    if(!data)
        return this.template(this.data);
    return this.template(data);
}

BView.prototype.addEvent = function(){

    this.removeEvent();

    var self = this;
    this.events.map(function(item,i){
        self.$element.delegate(item.eventTarget,item.type,item.callback);
    });
    console.timeEnd(this.id);
}

BView.prototype.removeEvent = function(){

    var self = this;
    self.$element.undelegate();
}

/* reload = true 表示重新载入*/
BView.prototype.render = function(reload){

    this.$wrapper.empty();
    // 载入动画控制
    if(this.animation_duration > 0){

        this.$element.addClass('template_enter');

        var self = this;
        setTimeout(function(){
            self.$element.addClass('template_enter_active');
        },this.animation_duration);
    };

    this.$wrapper.append(this.$element);
    this.state = reload ? 'reloaded' : 'complete';
}

BView.prototype.edelete = function(callback){

    if(this.animation_duration > 0){

        this.$element.addClass('template_leave');

        var self = this;
        setTimeout(function(){
            self.$element.addClass('template_leave_active');
        },this.animation_duration);

        var setInter = setInterval(function(){
            if(!self.$element.is(":animated")){
                clearInterval(setInter);
                setInter = null;
                self.$wrapper.empty();
                self.state = 'waiting';
                callback();
            }
            console.log("载出动画循环检查中...");
        },this.animation_duration)
    }
    else{
        this.$wrapper.empty();
        this.state = 'waiting';
        callback();
    }
}

module.exports = BView;