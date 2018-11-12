(function($) {

    function Swiper(options) {
        //实现轮播功能的构造函数
        this.opts = options || {};
        this.wrap = this.opts.father;
        // options.father
        // options.image
        this.init();
    }
    Swiper.prototype.init = function() {
            //this-->挂载到全局
            this.nowIndex = 0;
            this.timer = undefined;
            this.flag = true;

            this.image = this.opts.image;
            this.len = this.image.length - 1; //传入的img
            this.itemWidth = parseInt(this.wrap.css('width'))
            this.createDom();

            //实现点击事件
            this.bindEvent();
            //实现自动轮播
            this.slideAuto();
        }
        //生成dom结构 -->father,image.length
    Swiper.prototype.createDom = function() {
        var len = this.len;
        var str = ''; //生成img-box里边的li
        var imgBox = $('<ul class="img-box"></ul>');
        var buttons = $('<div class="buttons"></div>');
        var list = $('<ul></ul>'); //bottons的 ul
        var listStr = ''; //生成butons按钮li
        var btn = ' <a href="javascript:;" id="prev" class="arrow">&lt</a><a href="javascript:;" id="next" class="arrow">&gt</a>'
        for (var i = 0; i < len; i++) {
            str += '<li><a href="javascript:void(0)"><img src="' + this.image[i] + '" alt=""></a></li>';
            listStr += '<li></li>';
        }
        //最后一张图片获取
        str += '<li><a href="javascript:void(0)"><img src="' + this.image[0] + '" alt=""></a></li>'
        $(listStr).appendTo(list);
        this.wrap.append(imgBox.html(str))
            .append(buttons.append(list))
            .append($(btn));
        $('.buttons li').eq(0).addClass('on');


        $('.img-box li').css({
            width: this.itemWidth + 'px',
            height: this.itemHeight + 'px',
        })
        $('.img-box').css({
            width: this.itemWidth * (this.len + 1) + 'px',
            height: this.itemHeight + 'px',
        })

    }

    Swiper.prototype.bindEvent = function() {
        var self = this; //处理全局this问题
        $('#prev').add('#next').add('.buttons li').on('click', function() {
                if ($(this).attr('id') == 'prev') {
                    self.move('prev');
                } else if ($(this).attr('id') == 'next') {
                    self.move('next');
                } else {
                    self.move($(this).index());
                }
            })
            //移入暂停
        self.wrap.on('mouseenter', function() {
                $('.arrow').show();
                clearTimeout(self.timer);
            })
            .on('mouseleave', function() {
                $('.arrow').hide();
                self.slider();
            })
    }

    Swiper.prototype.move = function(dir) {
        //同样处理全局对象
        var flag = this.flag;
        var self = this;
        // var nowIndex = self.nowIndex;
        var len = self.len;
        var itemWidth = self.itemWidth;
        if (flag) {
            flag = false;
            if (dir == 'prev' || dir == 'next') { //点击左右按钮时时
                if (dir == 'prev') {
                    if (self.nowIndex == 0) { //图片为第一张时，索引为0
                        $('.img-box').css('left', -(len * itemWidth) + 'px');
                        self.nowIndex = len - 1;
                    } else {
                        self.nowIndex--; //其他情况，均减一
                    }
                } else {
                    if (self.nowIndex == len - 1) { //图片为最后一张张时，索引-1=张数
                        $('.img-box').animate({ 'left': -(len * itemWidth) + 'px' }, function() {
                            $(this).css('left', '0');
                            self.slideAuto();
                            flag = true;
                        });
                        self.nowIndex = 0;
                    } else {
                        self.nowIndex++; //其他情况，均加一
                    }
                }
            } else { //点击下方圆点时
                self.nowIndex = dir;
            }
            self.slider();
        }
    }

    Swiper.prototype.slider = function() {
        var self = this;
        var nowIndex = this.nowIndex;
        var itemWidth = this.itemWidth;
        $('.img-box').animate({ 'left': -(nowIndex * itemWidth) + 'px' });
        self.changeStyle();
        self.slideAuto();
        self.flag = true;
    }

    Swiper.prototype.changeStyle = function() {
        var nowIndex = this.nowIndex;
        $('.on').removeClass('on');
        $('.buttons li').eq(nowIndex).addClass('on');
    }

    Swiper.prototype.slideAuto = function() {
        var self = this;
        clearTimeout(self.timer);
        self.timer = setTimeout(function() {
            self.move('next');
            self.changeStyle();
        }, 2500)
    }

    $.fn.extend({
        sliderImg: function(options) {
            options.father = this || $('body');
            new Swiper(options);
        }
    })
})(jQuery)