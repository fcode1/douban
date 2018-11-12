(function($) {
    //具体实现插件功能
    var obj = {
            init: function(opt) {
                this.opt = opt;
                this.createDom();
                this.bindEvent();
            },
            //根据option传进来的参数，实现dom元素
            createDom: function() {
                var self = this;
                var opt = self.opt;
                var wrap = opt.father;
                var len = opt.tabList.length;
                var oUl = $('<ul id="tabs"></ul>');
                var con = $('<div id="tabContent"></div>');
                var oSpan = $('<span class="tabHeader"></span>')
                var tabHtml = '';
                for (var i = 0; i < len; i++) {
                    tabHtml += '<li><a href="javascript:;" title="tab' + (i + 1) + '"> ' + opt.tabList[i] + '</a></li>'
                }
                wrap.append(oSpan.text(opt.spanStr))
                    .append(oUl.html(tabHtml))
                    .append(con.html(opt.conStr));
                //点击标签与下方内容相对应
                for (var i = 0; i < len; i++) {
                    $($('.conBox')[i]).attr('id', 'tab' + (i + 1));
                }
                $('#tabContent').find('.conBox:first').addClass('current');
                $('#tabs').find('a').eq(0).addClass('activeTab');
            },
            //实现点击切换
            bindEvent: function() {
                var self = this;
                var wrap = self.opt.father;
                $('#tabs').on('click', 'a', function(e) {
                    e.preventDefault();
                    var id = $(this).attr('title');
                    $('.activeTab').removeClass('activeTab');
                    $(this).addClass('activeTab');
                    $('.current').removeClass('current');
                    $('#' + id).addClass('current');
                })
            }
        }
        //扩展插件
    $.fn.extend({
        tab: function(option) {
            option.father = this || $('body');
            obj.init(option);
        }
    })
})(jQuery)