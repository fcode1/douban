(function($) {
    var obj = {
        init: function(options) {
            this.opt = options || {};
            this.createDom();
            this.bindEvent();
        },
        createDom: function() {
            var htmlStr = '<div class="inp">\
            <input type="text" class="text" placeholder="">\
            <input type="button" class="btn" value="搜索"></div>';
            this.opt.father.html(htmlStr);
            $('.inp .text').attr('placeholder', this.opt.text);
        },
        bindEvent: function() {
            var self = this;
            $('.text').on('input', function(e) {
                e.preventDefault();
                var value = $(this).val();
                self.getData(value);
            })
        },
        getData: function(val) {
            var self = this;
            var opt = self.opt;
            $.ajax({
                type: opt.type,
                url: opt.url,
                data: opt.data + val + opt.count,
                dataType: opt.dataType,
                success: function(data) {
                    opt.sucFun(data);
                },
                error: function(data) {
                    opt.errFun(data);
                }
            })
        }
    }

    $.fn.extend({
        search: function(options) {
            options.father = this || $('body');
            obj.init(options);
        }
    })
})(jQuery)