/**
 * Created by ASUS on 2016/5/18.
 */

var $ = require('jquery');
var template = require('./LogoSearch.html');
var BC = require('../../abstract/component.js');

var LogoSearch = function(options){
    BC.call(this,options);
}

LogoSearch.prototype = $.extend({},BC.prototype,{
    constructor :LogoSearch,
    /**/
    initProperty : function(){
        BC.prototype.initProperty.call(this);
        this.template = template;

        this.events = [
            {
                eventTarget:'.js-search',
                type:'click',
                callback:this._searchBoxEventAgent.bind(this)
            }
        ];

        this.searchType = "sale";
    },
    /*搜索框事件代理*/
    _searchBoxEventAgent : function(e){
        var $target = $(e.target);

        if($target.hasClass('search-type')){
            this._changeSearchType(e);
        }
        else if($target.hasClass('search-button')){
            this._search();
        }
    },
    /*切换搜索内容类型*/
    _changeSearchType : function(e){
        var $collection = $('.search-type',this.$element),
            $target = $(e.target);

        $collection.removeClass("active");
        $target.addClass("active");

        this.searchType = $target.data("search-type");

    },
    /*搜索*/
    _search : function(){
        var searchKeyWords = "";
        searchKeyWords = $(".search-input",this.$element).val();

        window.location.href = "#/search?type="+window.btoa(encodeURI(this.searchType))+"&key="+window.btoa(encodeURI(searchKeyWords))
    }
});


module.exports = LogoSearch;