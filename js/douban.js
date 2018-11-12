//编辑推荐
$('.slick-prev').click(function() {
    $(this).addClass('slickActive');
    $('.slick-next').removeClass('slickActive');
    $('.slick-track')
        .css('transform', 'translate(0px)');
})
$('.slick-next').click(function() {
    $(this).addClass('slickActive');
    $('.slick-prev').removeClass('slickActive');

    $('.slick-track')
        .css('transform', 'translate(-645px)')
        .css('transition', 'all 0.6s');
})

//
var oDiv = document.getElementById('newWrapper');
var aBtn = oDiv.getElementsByTagName('li');
var aDiv = oDiv.getElementsByTagName('div');

for (var i = 0; i < aBtn.length; i++) {
    (function(n) {
        aBtn[n].onclick = function() {
            for (var i = 0; i < aBtn.length; i++) {
                aBtn[i].className = '';
                aDiv[i].style.display = 'none';
            }
            this.className = 'active';
            aDiv[n].style.display = 'block';
        }
    }(i))
}

//弹性导航
var oArrayLi = document.getElementsByClassName('navs');
// var oArrayLi = Array.prototype.slice.call(document.getElementsByClassName('nav'), 0);
var oBg = document.getElementsByTagName('li')[11];
var timer = null;
// oArrayLi.forEach(function(ele, index) {
//     ele.onmouseenter = function() {
//         var newLeft = this.offsetLeft;
//         StartMove(oBg, newLeft)
//     }
// })

for (var i = 0; i < oArrayLi.length; i++) {
    oArrayLi[i].onmouseenter = function() {
        var newLeft = this.offsetLeft;
        StartMove(oBg, newLeft)
    }
}

function StartMove(obj, target) {
    clearInterval(obj.timer);
    var iSpeed = 15,
        a,
        u = 0.75;
    obj.timer = setInterval(function() {
        a = (target - obj.offsetLeft) / 4;
        iSpeed = iSpeed + a;
        iSpeed = iSpeed * u; //模拟摩擦力，弹性失能

        if (Math.abs(iSpeed) <= 1 && Math.abs(target - obj.offsetLeft) <= 1) {
            clearInterval(obj.timer);
            obj.style.left = target + 'px';
        } else {
            obj.style.left = obj.offsetLeft + iSpeed + 'px';
        }
    }, 30)
}