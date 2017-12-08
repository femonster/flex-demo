var oMaskBox = document.querySelector(".mask-box");
var oImgNums = document.querySelector(".img-nums");
var oImgsBox = document.querySelector(".my-img-com");
var oOtherImgsBoxs = document.querySelector(".other-img-com");
var oBody = document.body;
var oSliderBox = document.querySelector(".slider-box");
var oBack = document.querySelector(".i-back");
var navBox = document.querySelector(".img-nav-box");

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
    scroll: null,
    imgArr: [], //{w:1,h:1,url:1}
    render: function(p, sArr) {
        var str = "";
        var navStr = "";
        var count = 0;
        var boxW = document.documentElement.clientWidth || document.body.clientWidth;
        var boxH = document.querySelector(".show-img").clientHeight;
        var navW = ((boxW - 10) / p) > navBox.clientHeight ? navBox.clientHeight - 10 : ((boxW - 10) / p);
        var rurl;

        for (var i = 0; i < p; i++) {
            if (sArr[i].isload == 1) {
                str += '<li class="s-item"><img></img src="' + sArr[i].blobUrl + '"></li>';
            } else {
                str += '<li class="s-item" data-url=' + sArr[i].originUrl + '>\
                            <svg width="110" height="110" viewbox="0 0 350 350">\
                                <circle cx="170" cy="170" r="43" stroke="#D1D3D7" stroke-width="12" fill="none"></circle>\
                                <circle cx="170" cy="170" r="43" stroke="#00A5E0" stroke-width="12" fill="none" class="changecircle" stroke-dasharray="0 1069"  transform="matrix(0,-1,1,0,0,110)"></circle>\
                            </svg>\
                        </li>';
            }
            navStr += '<div class="img-nav" style="width:' + navW + 'px;height:' + navW + 'px;background-image:url(' + sArr[i].url + ')" data-index=' + i + '></div>';
        }
        oSliderBox.innerHTML = str;
        navBox.innerHTML = navStr;
        var aSliderLi = document.querySelectorAll(".s-item");
        this.setSliderWidth(aSliderLi);

        var aLi = Array.prototype.slice.call(aSliderLi);
        aLi.forEach(function(item, index) {
            if (item.children.typeName != "IMG") {

            }
            var oimg = new Image();
            oimg.src = item.dataset.url;
            oimg.onload = function() {
                var w = oimg.width;
                var h = oimg.height;
                var imgProp = w / h;
                var boxProp = boxW / boxH;
                aSliderLi[index].innerHTML = "";
                aSliderLi[index].appendChild(oimg);

                // 感觉算的还不太对
                if (imgProp >= boxProp) {
                    oimg.style.width = boxW + "px";
                    oimg.style.height = (h * (1 / imgProp)) + "px";
                } else if (imgProp < boxProp) {
                    oimg.style.height = boxH + "px";
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
                index: temp.dataset.i,
                isload: temp.dataset.isload,
                width: temp.dataset.w,
                height: temp.dataset.h,
                originUrl: temp.dataset.echoBackground,
                blobUrl: temp.getAttribute("src")
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
        console.log(sArr);
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
            },
            click: true
        });
        self.scroll.goToPage(Number(i) - 1, 0, 0);
        var nb = Array.prototype.slice.call(navBox.children);
        nb.forEach(function(item) {
            if (item.dataset.index == Number(i) - 1) {
                addClass(item, "active");
            }
        })
        self.scroll.on("scrollEnd", function() {
            var pageIndex = Number(self.scroll.getCurrentPage().pageX) + 1;
            oImgNums.innerText = pageIndex + "/" + len;
            nb.forEach(function(item) {
                item.className = "img-nav";
                if (item.dataset.index == Number(pageIndex) - 1) {
                    addClass(item, "active");
                }
            })
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
                var oImgDiv = e.target;
                var options = {
                    index: oImgDiv.dataset.i,
                    isload: oImgDiv.dataset.isload,
                    width: oImgDiv.dataset.w,
                    height: oImgDiv.dataset.h,
                    originUrl: oImgDiv.dataset.echoBackground,
                    blobUrl: oImgDiv.getAttribute("src")
                };
                var index = e.target.dataset.i;
                // var isload = e.target.dataset.i
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

    navBox.addEventListener("click", function(e) {
        var _this = e.target;
        if (hasClass(_this, "img-nav")) {
            var page = Number(_this.dataset.index);
            e.stopPropagation();
            var nb = Array.prototype.slice.call(navBox.children);
            nb.forEach(function(item) {
                item.className = "img-nav";
            })
            addClass(_this, "active");
            if (!!slider.scroll) {
                slider.scroll.goToPage(page, 0, 0);
            }
            oImgNums.innerText = (page + 1) + "/" + nb.length;
        }
    })
    oSliderBox.addEventListener("click", function(e) {
        if (e.target.nodeName != 'IMG') {
            console.log(1);
            slider.hideMask();

        }
    })
})