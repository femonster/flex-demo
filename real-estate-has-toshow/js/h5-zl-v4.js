var oMaskBox = document.querySelector(".mask-box");
var oImgNums = document.querySelector(".img-nums");
var oImgsBox = document.querySelector(".my-img-com");
var oOtherImgsBoxs = document.querySelector(".other-img-com");
var oSliderBox = document.querySelector(".slider-box");
var oBack = document.querySelector(".i-back");
var navBox = document.querySelector(".img-nav-box");

var countme = 0;
var countother = 0;
var myImgArr = [];
var otherImgArr = [];
var myTmpsNum = mySliderNum();
var myTmpsNum2 = othSliderNum();
for (var i = 0; i < myTmpsNum; i++) {
    myImgArr.push({
        "index": i,
        "url": "http://a.xnimg.cn/wap/mobile/2017activity/real-estate/img/loading.gif",
        "isload": 0,
        "width": 30,
        "height": 30,
        "error": 0,
        "originUrl": tempImgs[i]
    })
}

for (var i = 0; i < myTmpsNum2; i++) {
    otherImgArr.push({
        "index": i,
        "url": "http://a.xnimg.cn/wap/mobile/2017activity/real-estate/img/loading.gif",
        "isload": 0,
        "width": 30,
        "height": 30,
        "error": 0,
        "originUrl": otherTmps[i]
    })
}

function sortToshow(res) {
    var who = res.dataset.who;
    var boxW = document.documentElement.clientWidth - 30 || document.body.clientWidth - 30;
    var boxH = document.querySelector(".show-img").clientHeight;
    if (who == "me") {
        var src = res.dataset.echoBackground;
        var img = new Image();
        var index = res.dataset.sort;
        img.onload = function() {
            if (countme == index) {
                res.style.opacity = 1;
                countme++;
            } else {
                sortToshow(res);
            }
            var MaskShow = oMaskBox.dataset.show;
            var MaskWho = oMaskBox.dataset.who;
            myImgArr[index].url = src;
            myImgArr[index].width = img.width;
            myImgArr[index].height = img.height;
            res.dataset.w = img.width;
            res.dataset.h = img.height;
            res.dataset.isload = 1;
            if (MaskShow == 1 && MaskWho == "me") {
                var isShowCurr = document.querySelector(".s-current");
                var nowNumer = isShowCurr.dataset.sIndex;
                if (nowNumer == index) {
                    isShowCurr.children[0].src = src;
                    var nWaH = slider.newImgWaH(boxW, boxH, img.width, img.height);
                    isShowCurr.children[0].style.width = nWaH.width + "px";
                    isShowCurr.children[0].style.height = nWaH.height + "px";
                }
            }
        }

        img.onerror = function() {
            countme++;
            myImgArr[index].url = src;
            myImgArr[index].error = 1;
        }
        img.src = src;
    } else {
        var src = res.dataset.echoBackground;
        var img = new Image();
        var index = res.dataset.sort;
        img.onload = function() {
            if (countother == index) {
                res.style.opacity = 1;
                countother++;
            } else {
                sortToshow(res);
            }
            var MaskShow = oMaskBox.dataset.show;
            var MaskWho = oMaskBox.dataset.who;
            otherImgArr[index].url = src;
            otherImgArr[index].width = img.width;
            otherImgArr[index].height = img.height;
            res.dataset.w = img.width;
            res.dataset.h = img.height;
            res.dataset.isload = 1;
            if (MaskShow == 1 && MaskWho == "other") {
                var isShowCurr = document.querySelector(".s-current");
                var nowNumer = isShowCurr.dataset.sIndex;
                if (nowNumer == index) {
                    isShowCurr.children[0].src = src;
                    var nWaH = slider.newImgWaH(boxW, boxH, img.width, img.height);
                    isShowCurr.children[0].style.width = nWaH.width + "px";
                    isShowCurr.children[0].style.height = nWaH.height + "px";
                }
            }
        }
        img.onerror = function() {
            countother++;
            otherImgArr[index].url = src;
            otherImgArr[index].error = 1;
        }
        img.src = src;
    }

}

echo.init({
    callback: function(res) {
        sortToshow(res);
    }
});

var slider = {
    imgArr: [],
    boxWidth: window.innerWidth,
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
    newImgWaH: function(cw, ch, imgw, imgh) {
        var rate1 = 0;
        var rate2 = 0;
        if (imgw == 30 && imgh == 30) {
            return { width: imgw, height: imgh }
        } else {
            if (ch > 0) {
                rate1 = cw / ch;
            }
            if (imgh > 0) {
                rate2 = imgw / imgh
            }
            if (rate1 > rate2) {
                return { width: ch * rate2, height: ch }
            } else {
                return { width: cw, height: cw / rate2 }
            }
        }
    },
    init: function(el, tempImgs, index) {
        // document.addEventListener("DOMContentLoaded", function() {
        if (el.dataset.isbind == 0) {
            slider.bindTouchEvent(el, index);
            el.dataset.isbind = 1;
        }
        // });
    },
    transform: function(translate) {
        this.style.webkitTransform = "translate3d(" + translate + "px,0,0)";
    },
    bindTouchEvent: function(el, clickIndex) {
        var self = this;
        var startX, startY;
        var initialPos = 0; //手指按下的屏幕距离
        var moveLen = 0; //手指当前滑动的距离
        var direction = "left"; //滑动方向
        var isMove = false; //是否发生左右滑动
        var startT = 0; //记录手指按下去的时间
        var isTouchEnd = true; //标记当前滑动是否结束（手指已离开屏幕）
        var pageWidth = this.boxWidth; //容器宽
        var currentItem = null; //显示的容器
        var tmpBox = null; //备用的容器
        var currImgIndex = 0; //主容器的标记（第几张图片）
        var tmpImgIndex = 0; //副容器的标记（第几张图片）
        var maxLen; //图片最大值
        var boxW = document.documentElement.clientWidth - 30 || document.body.clientWidth - 30;
        var boxH = document.querySelector(".show-img").clientHeight;
        var tempImgs = [];
        var who;
        el.addEventListener("touchstart", function(e) {
            who = oMaskBox.dataset.who;
            tempImgs = who == "me" ? myImgArr : otherImgArr;
            // tempImgs = self.imgArr;
            maxLen = tempImgs.length - 1;
            currentItem = el.querySelector(".s-current");
            tmpBox = el.querySelector(".s-tmp-box");
            currImgIndex = Number(currentItem.dataset.sIndex);
            tmpBox.dataset.isCurr = 0;
            e.preventDefault();
            if (e.touches.length == 1 || isTouchEnd) {
                var touch = e.touches[0];
                startX = touch.pageX;
                startY = touch.pageY;
                initialPos = 0; //滑动前的初始位置都为0，因为划完后会重置
                currentItem.style.webkitTransform = "";
                startT = new Date().getTime();
                isMove = false; //是否产生滑动
                isTouchEnd = false; //当前滑动开始
            }
        });

        el.addEventListener("touchmove", function(e) {
            e.preventDefault();

            if (isTouchEnd) return;

            var touch = e.touches[0];
            var deltaX = touch.pageX - startX;
            var deltaY = touch.pageY - startY;
            direction = deltaX > 0 ? "right" : "left";
            var tmpChildImg = tmpBox.children[0];
            // touchmove时不要有transition
            tmpBox.style.webkitTransition = "";
            currentItem.style.webkitTransition = "";
            // 当向右滑时的一些操作
            if (direction == "right") {
                if (typeof tmpBox.dataset.dirc == 'undefined' || tmpBox.dataset.dirc != "right") {
                    tmpBox.dataset.dirc = "right";
                    tmpImgIndex = currImgIndex - 1;
                    if (tmpImgIndex >= 0) {
                        var nWaH = self.newImgWaH(boxW, boxH, tempImgs[tmpImgIndex].width, tempImgs[tmpImgIndex].height);
                        self.transform.call(tmpBox, deltaX - pageWidth);
                        tmpChildImg.src = tempImgs[tmpImgIndex].url;
                        tmpChildImg.style.width = nWaH.width + "px";
                        tmpChildImg.style.height = nWaH.height + "px";
                        tmpBox.dataset.isborder = 0;
                        tmpBox.style.opacity = 1;
                    } else {
                        tmpBox.style.opacity = 0;
                        tmpBox.dataset.isborder = 1;
                    }

                }
            } else {
                // 当向左滑时的一些操作
                if (typeof tmpBox.dataset.dirc == 'undefined' || tmpBox.dataset.dirc != "left") {
                    tmpBox.dataset.dirc = "left";
                    tmpImgIndex = currImgIndex + 1;
                    if (tmpImgIndex <= maxLen) {
                        var nWaH = self.newImgWaH(boxW, boxH, tempImgs[tmpImgIndex].width, tempImgs[tmpImgIndex].height);

                        self.transform.call(tmpBox, pageWidth + deltaX);
                        tmpChildImg.src = tempImgs[tmpImgIndex].url;
                        tmpChildImg.style.width = nWaH.width + "px";
                        tmpChildImg.style.height = nWaH.height + "px";
                        tmpBox.dataset.isborder = 0;
                        tmpBox.style.opacity = 1;
                    } else {
                        tmpBox.style.opacity = 0;
                        tmpBox.dataset.isborder = 1;
                    }

                }
            }
            // 若x方向位移>y方向位移，认为左右滑动
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                moveLen = deltaX;
                var translate = initialPos + deltaX;
                var prevTrans = deltaX - pageWidth;
                var nextTrans = pageWidth + deltaX;
                if (direction == "right") {
                    self.transform.call(tmpBox, prevTrans);
                } else {
                    self.transform.call(tmpBox, nextTrans);
                }
                self.transform.call(currentItem, translate);
                isMove = true;
            }
        });
        el.addEventListener("touchend", function(e) {
            e.preventDefault();
            // 主屏滑动距离
            var translate = 0;
            //tmp容器滑动距离
            var tmpTrans = 0;
            //计算手指在屏幕上停留时间
            var deltaT = new Date().getTime() - startT;
            //发生了滑动，并且滑动事件未结束
            if (isMove && !isTouchEnd) {
                isTouchEnd = true;
                currentItem.style.webkitTransition = "0.3s ease -webkit-transform";
                tmpBox.style.webkitTransition = "0.3s ease -webkit-transform";
                // 如果手指停留时间小于300ms,则滑动到下一页
                if (deltaT < 300) {
                    if (direction == "left") {
                        translate = -pageWidth;
                        if (tmpImgIndex > maxLen) {
                            translate = 0;
                            tmpImgIndex = maxLen;
                        }
                    } else {
                        translate = pageWidth;
                        if (tmpImgIndex < 0) {
                            translate = 0;
                            tmpImgIndex = 0;
                        }
                    }
                    tmpBox.dataset.isCurr = 1;
                    tmpBox.dataset.sIndex = tmpImgIndex;
                    tmpBox.dataset.dirc = "";
                    if (tmpBox.dataset.isCurr == 1 && tmpBox.dataset.isborder == 0) {
                        replaceClass(tmpBox, "s-current", "s-tmp-box");
                        replaceClass(currentItem, "s-tmp-box", "s-current");
                    }
                } else {
                    if (Math.abs(moveLen) / pageWidth < 0.5) {
                        translate = 0;
                        tmpTrans = direction == "left" ? pageWidth : -pageWidth;
                    } else {
                        if (direction == "left") {
                            translate = -pageWidth;
                            if (tmpImgIndex > maxLen) {
                                translate = 0;
                                tmpImgIndex = maxLen;
                            }
                        } else {
                            translate = pageWidth;
                            if (tmpImgIndex < 0) {
                                translate = 0;
                                tmpImgIndex = 0;
                            }
                        }
                        tmpBox.dataset.isCurr = 1;
                        tmpBox.dataset.sIndex = tmpImgIndex;
                        tmpBox.dataset.dirc = "";
                        if (tmpBox.dataset.isCurr == 1 && tmpBox.dataset.isborder == 0) {
                            replaceClass(tmpBox, "s-current", "s-tmp-box");
                            replaceClass(currentItem, "s-tmp-box", "s-current");
                        }
                    }
                }
                self.transform.call(currentItem, translate);
                self.transform.call(tmpBox, tmpTrans);
                // var nowNum = currentItem.dataset.sIndex;
                var nb = Array.prototype.slice.call(navBox.children);
                nb.forEach(function(item, index) {
                    item.className = "img-nav";
                    addClass(nb[tmpImgIndex], "active");
                })
                oImgNums.innerText = (tmpImgIndex + 1) + "/" + nb.length;
            }
        });

        navBox.addEventListener("click", function(e) {
            who = oMaskBox.dataset.who;
            tempImgs = who == "me" ? myImgArr : otherImgArr;
            maxLen = tempImgs.length - 1;
            var _this = this;
            var tmpTrans = 0;
            var translate = 0;
            currentItem = document.querySelector(".s-current");
            tmpBox = document.querySelector(".s-tmp-box");
            tmpBox.style.opacity = 0;
            currentItem.style.webkitTransition = "";
            tmpBox.style.webkitTransition = "";

            if (hasClass(e.target, "img-nav")) {
                var nb = Array.prototype.slice.call(_this.children);
                nb.forEach(function(item) {
                    item.className = "img-nav";
                })
                addClass(e.target, "active");
                var toIndex = Number(e.target.dataset.index);
                var nowIndex = Number(currentItem.dataset.sIndex);
                tmpBox.dataset.sIndex = toIndex;
                if (toIndex == nowIndex) {
                    return;
                } else if (toIndex < nowIndex) { //right
                    var nWaH = self.newImgWaH(boxW, boxH, tempImgs[toIndex].width, tempImgs[toIndex].height);
                    translate = pageWidth;
                    self.transform.call(tmpBox, -pageWidth);
                    tmpBox.children[0].src = tempImgs[toIndex].url;
                    tmpBox.children[0].style.width = nWaH.width + "px";
                    tmpBox.children[0].style.height = nWaH.height + "px";
                    tmpBox.dataset.isborder = 0;
                    tmpBox.style.opacity = 1;
                    tmpBox.dataset.isCurr = 1;

                } else { //left
                    var nWaH = self.newImgWaH(boxW, boxH, tempImgs[toIndex].width, tempImgs[toIndex].height);
                    translate = -pageWidth;
                    self.transform.call(tmpBox, pageWidth);
                    tmpBox.children[0].src = tempImgs[toIndex].url;
                    tmpBox.children[0].style.width = nWaH.width + "px";
                    tmpBox.children[0].style.height = nWaH.height + "px";
                    tmpBox.dataset.isborder = 0;
                    tmpBox.style.opacity = 1;
                    tmpBox.dataset.isCurr = 1;

                }

                setTimeout(function() {
                    currentItem.style.webkitTransition = tmpBox.style.webkitTransition = "0.3s ease -webkit-transform";
                    self.transform.call(currentItem, translate);
                    self.transform.call(tmpBox, tmpTrans);
                    oImgNums.innerText = (toIndex + 1) + "/" + _this.children.length;
                    if (tmpBox.dataset.isCurr == 1 && tmpBox.dataset.isborder == 0) {
                        replaceClass(tmpBox, "s-current", "s-tmp-box");
                        replaceClass(currentItem, "s-tmp-box", "s-current");
                    }
                }, 100);
            }
        })
    },
    _render: function(index, len, who) {
        var self = this;
        var navStr = "";
        var sArr = who == "me" ? myImgArr : otherImgArr;
        console.log(sArr, who);
        var boxW = document.documentElement.clientWidth - 30 || document.body.clientWidth - 30;
        var boxH = document.querySelector(".show-img").clientHeight;
        var navW = ((boxW - 10) / len) > navBox.clientHeight ? navBox.clientHeight - 10 : ((boxW - 10) / len);
        for (var k = 0; k < len; k++) {
            navStr += '<div class="img-nav" data-originUrl=' + sArr[k].originUrl + ' style="width:' + navW + 'px;height:' + navW + 'px;background-image:url(' + sArr[k].originUrl + ')" data-index=' + k + '></div>';
        }
        navBox.innerHTML = navStr;
        var navArr = Array.prototype.slice.call(navBox.children);
        navArr.forEach(function(item) {
            item.className = "img-nav";
            navArr[index].className = "img-nav active";
        })
        var oCurr = document.querySelector(".s-current");
        oCurr.dataset.sIndex = index;
        var imgOpitons = sArr[index];
        var oCurrImg = oCurr.children[0];
        var nWaH = self.newImgWaH(boxW, boxH, imgOpitons.width, imgOpitons.height);
        oCurrImg.src = imgOpitons.url;
        oCurrImg.style.width = nWaH.width + "px";
        oCurrImg.style.height = nWaH.height + "px";

        self.init(oSliderBox, index);
    },
    showMask: function(i, len, who) {
        oMaskBox.dataset.show = 1;
        oMaskBox.dataset.who = who;
        oMaskBox.style.display = "block";
        document.body.className = "lock";
        oImgNums.innerText = (Number(i) + 1) + "/" + len;
        // var achild = _this.children;
        // for (var j = 0; j < achild.length; j++) {
        //     var temp = achild[j].children[0];
        //     this.imgArr.push({
        //         "index": temp.dataset.i,
        //         "url": temp.dataset.echoBackground,
        //         "isload": temp.dataset.isload,
        //         "width": temp.dataset.w || 30,
        //         "height": temp.dataset.h || 30,
        //         "loadurl": "http://a.xnimg.cn/wap/mobile/2017activity/real-estate/img/loading.gif"
        //     })
        // }
        this._render(i, len, who);
    },
    // 隐藏mask
    hideMask: function() {
        oMaskBox.style.display = 'none';
        document.body.className = "";
        this.imgArr = [];
        var o = document.querySelector(".s-tmp-box");
        var m = document.querySelector(".s-current");
        o.style.webkitTransform = m.style.webkitTransform = "";
        o.style.webkitTransition = m.style.webkitTransform = "";
        o.dataset.isCurr = m.dataset.isCurr = "";
        o.dataset.isborder = m.dataset.isborder = "";
        o.style.opacity = 0;
        oMaskBox.dataset.show = 0;
        oMaskBox.dataset.who = "";
    },
}

window.addEventListener("DOMContentLoaded", function() {

    //点击下载
    document.addEventListener("click", function(e) {
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
            slider.showMask(index, slider.mySliderNum(), "me");
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
            slider.showMask(index, slider.othSliderNum(), "other");
        }
        if (e.target.className == "more-mask") {
            e.stopPropagation();
            alert("请前往APP store下载");
        }
    })

    oMaskBox.addEventListener("click", function(e) {
        if (e.target.nodeName != 'IMG' && !hasClass(e.target, "img-nav")) {
            slider.hideMask();
        }
    })
})