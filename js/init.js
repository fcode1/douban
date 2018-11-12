var obj = {
    init: function() {
        this.slider();
        this.tab();
        this.input();
    },
    input: function() {
        //input插件入口
        var self = this;
        $('#inputWrap').search({
            text: '唱片名、表演者、条码、ISRC',
            url: 'https://api.douban.com/v2/music/search',
            type: 'GET',
            dataType: 'jsonp',
            sucFun: self.addItem,
            data: 'q=', //搜索拼接的字段
            count: '&count=6',
            errFun: function() {
                console.log('error');
            }
        })
    },
    addItem: function(data) {
        // console.log(data.musics);
        var dataList = data.musics;
        var $searchList = $('.search-list');
        var str = '';
        if (dataList.length > 0) {
            dataList.forEach(function(ele, index) {
                str += '<li><a href="https://music.douban.com/subject/' + ele.id + '">\
                <img src="' + ele.image + '" alt="">\
                <div><span>' + ele.title + '</span><p>' + ele.author[0].name + '</p></div></a>\
               </li>';
            })
            $searchList.html($(str));
            // $searchList.style.display = 'block';
        } else {
            // $searchList.style.display = 'none';
        }
    },
    slider: function() {
        //轮播入口
        $('#swiper').sliderImg({
            image: ['img/banner1.jpg', 'img/banner2.jpg', 'img/banner3.jpg', 'img/banner4.jpg', 'img/banner5.jpg', 'img/banner1.jpg']
        })
    },
    tab: function() {
        //tab入口
        var arr1 = [
            { name: 'Get money', des: '记忆煽情', img: 'img/tab1.png' },
            { name: '梁晓燕', des: '几盒火柴', img: 'img/tab2.png' },
            { name: '尼玛', des: '婆婆空间', img: 'img/tab3.png' },
            { name: '2333', des: '全国覆盖', img: 'img/tab4.png' },
            { name: 'Get money', des: '记忆煽情', img: 'img/tab3.png' },
            { name: '梁晓燕', des: '几盒火柴', img: 'img/tab4.png' },
            { name: '尼玛', des: '婆婆空间', img: 'img/tab1.png' },
            { name: '2333', des: '全国覆盖', img: 'img/tab2.png' }
        ];
        var arr2 = [
            { name: '静安寺', des: '菜鸟教程', img: 'img/tab4.png' },
            { name: '梁晓燕', des: '几盒火柴', img: 'img/tab3.png' },
            { name: '尼玛', des: '婆婆空间', img: 'img/tab1.png' },
            { name: '轻机枪', des: '哦啊水水', img: 'img/tab2.png' }
        ]

        function addDom(conBox, arr, strHtml) {
            for (var i = 0; i < arr.length; i++) {
                strHtml += '<div class="box"><div class="imgBox">' +
                    '<img src="' + arr[i].img + '" alt=""></div>' +
                    '<div class="con"><a href="#" class="name">' + arr[i].name + '</a>' +
                    '<span href="#" >' + arr[i].des + '</span></div></div>';
            }
            conBox.append(strHtml);
            return conBox;
        }

        var div1 = addDom($('<div class="conBox"></div>'), arr1, '');
        var div2 = addDom($('<div class="conBox"></div>'), arr2, '');

        $('#tabWrapper').tab({
            tabList: ['本周流行音乐人', '上升最快音乐人'],
            conStr: [div1, div2],
            spanStr: ''
        })
    }
}
obj.init();