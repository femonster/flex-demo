var oMaskBox = document.querySelector(".mask-box");
var oImgNums = document.querySelector(".img-nums");
var oImgsBox = document.querySelector(".my-img-com");
var oOtherImgsBoxs = document.querySelector(".other-img-com");
var oBody = document.body;
var oSliderBox = document.querySelector(".slider-box");
var oBack = document.querySelector(".i-back");

var slider = {
    mySliderNum: function() {
        var tmp = Number(getQueryString("m"));
        if (tmp > 9) {
            return 9;
        } else {
            return tmp;
        }
    },
    othSliderNum: function() {
        var tmp = Number(getQueryString("o"));
        if (tmp > 9) {
            return 9;
        } else {
            return tmp;
        }
    },
    isloaded: false,
    isrenderW: false,
    isrender: false,
    scroll: null,
    imgArr: [], //{w:1,h:1,url:1}
    render: function(p, sArr) {
        var str = "";
        var count = 0;
        var boxW = document.documentElement.clientWidth || document.body.clientWidth;
        var boxH = document.querySelector(".show-img").clientHeight;
        for (var i = 0; i < p; i++) {
            str += '<li class="s-item" data-url=' + sArr[i].url + '><img class="loading" src="http://a.xnimg.cn/wap/mobile/2017activity/real-estate/img/loading.gif" width="50" height="50"/></li>';
        }
        oSliderBox.innerHTML = str;
        var aSliderLi = document.querySelectorAll(".s-item");
        this.setSliderWidth(aSliderLi);

        var aLi = Array.prototype.slice.call(aSliderLi);
        aLi.forEach(function(item, index) {
            var oimg = new Image();
            oimg.src = item.dataset.url;

            oimg.onload = function() {
                var w = oimg.width;
                var h = oimg.height;

                aSliderLi[index].innerHTML = "";
                aSliderLi[index].appendChild(oimg);
                if (imgProp >= boxProp) {
                    oimg.style.width = boxW + "px";
                    oimg.style.height = (h * (1 / imgProp)) + "px";
                } else if (imgProp < boxProp) {
                    oimg.style.height = boxH + "px";
                    // oimg.style.width = (w * (boxProp)) + "px";
                }

            }
        });
    },
    setSliderWidth(aSliderItem) {
        var oSliderBox = document.querySelector(".slider-box");
        var width = 0;
        var i;
        var len = aSliderItem.length;
        var sliderWidth = document.documentElement.clientWidth || document.body.clientWidth;
        for (i = 0; i < len; i++) {
            aSliderItem[i].style.width = sliderWidth + "px";
            width += sliderWidth;
        }
        oSliderBox.style.width = width + "px";
    },
    // 显示图片展示mask
    showMask: function(i, len, _this) {
        oMaskBox.style.display = "block";
        document.body.className = "lock";
        oImgNums.innerText = i + "/" + len;
        var achild = _this.children;
        for (var j = 0; j < achild.length; j++) {
            var temp = achild[j];
            this.imgArr.push({
                "url": temp.dataset.bg,
                "loading": "http://a.xnimg.cn/wap/mobile/2017activity/real-estate/img/loading.gif"
            })
        }
        this._initSlider(i, len, this.imgArr);
    },
    // 隐藏mask
    hideMask: function() {
        oMaskBox.style.display = 'none';
        document.body.className = "";
        this.imgArr = [];
        this.scroll.destroy();
    },
    // 初始化slider
    _initSlider: function(i, len, sArr) {
        var self = this;
        self.render(len, sArr);
        var oSliderWrap = document.querySelector(".show-img");
        self.scroll = new BScroll(oSliderWrap, {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: {
                loop: false,
                threshold: 0.3,
                speed: 400
            }
        });
        self.scroll.goToPage(Number(i) - 1, 0, 0);
        self.scroll.on("scrollEnd", function() {
            var pageIndex = Number(self.scroll.getCurrentPage().pageX) + 1;
            oImgNums.innerText = pageIndex + "/" + len;
        })
    }
}


window.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("click", function(e) {
            console.log("all");
            if (hasClass(e.target, "download")) {
                e.stopPropagation();
                alert("请前往APP store下载");
            }
        })
        // 点击我的相册照片
    oImgsBox.addEventListener("click", function(e) {
            var _this = this;
            if (e.target.className == "img-item") {
                var index = e.target.dataset.i;
                slider.showMask(index, slider.mySliderNum(), _this);
            }
            if (e.target.className == "more-mask") {
                e.stopPropagation();
                alert("请前往APP store下载");
            }
        })
        // 点击别人的相册照片
    oOtherImgsBoxs.addEventListener("click", function(e) {
        var _this = this;
        if (e.target.className == "img-item") {
            var index = e.target.dataset.i;
            slider.showMask(index, slider.othSliderNum(), _this);
        }
        if (e.target.className == "more-mask") {
            e.stopPropagation();
            alert("请前往APP store下载");
        }
    })

    oBack.addEventListener("click", function(e) {
        slider.hideMask();
    })

})



// }