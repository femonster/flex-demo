var tempImgs = [
    'http://upload-images.jianshu.io/upload_images/3888445-cb101354c9f627bf.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/9472808-e5198d54b4613b57.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/9472808-309a14d9429de532.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/9472808-9ac32abd840be7c5.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/9472808-e8076ee468834ff8.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/9472808-64165b9c86278f7d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3812307-d1849b94d6ce0ae3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3888445-8e46cccb893cf8bd.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3888445-1de0c2b804291de4.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
]

var zScroll = {
    //currentPosition: 0, //记录当前页面位置	
    boxWidth: window.innerWidth,
    navBox: document.querySelector(".img-nav-box"),
    init: function(el) {
        document.addEventListener("DOMContentLoaded", function() {
            zScroll.bindTouchEvent(el);
            // zScroll.setNav(el);
        });
    },
    transform: function(translate) {
        this.style.webkitTransform = "translate3d(" + translate + "px,0,0)";
    },
    setNav: function(el) {
        var boxW = this.boxWidth;
        var navStr = "";
        for (var i = 0; i < tempImgs.length; i++) {
            navStr += '<div class="img-nav" style="width:' + 45 + 'px;height:' + 45 + 'px;background-image:url(' + tempImgs[i] + ')" data-index=' + i + '></div>';
        }
        this.navBox.innerHTML = navStr;
    },
    bindTouchEvent: function(el) {
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
        var maxLen = tempImgs.length - 1; //图片最大值
        el.addEventListener("touchstart", function(e) {
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
                        self.transform.call(tmpBox, deltaX - pageWidth);
                        tmpChildImg.src = tempImgs[tmpImgIndex];
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
                        self.transform.call(tmpBox, pageWidth + deltaX);
                        tmpChildImg.src = tempImgs[tmpImgIndex];
                        tmpBox.dataset.isborder = 0;
                        tmpBox.style.opacity = 1;
                    } else {
                        tmpBox.style.opacity = 0;
                        tmpBox.dataset.isborder = 1;
                    }

                }
            }
            console.log("tmpImgIndex", tmpImgIndex);
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
                    console.log("end", "tmpIndex", tmpImgIndex);
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
                var nb = Array.prototype.slice.call(self.navBox.children);
                nb.forEach(function(item, index) {
                    item.className = "img-nav";
                    addClass(nb[tmpImgIndex], "active");
                })

            }
        });

        this.navBox.addEventListener("click", function(e) {
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
                console.log("to:", toIndex, "now:", nowIndex);
                if (toIndex == nowIndex) {
                    return;
                } else if (toIndex < nowIndex) { //right
                    translate = pageWidth;
                    self.transform.call(tmpBox, -pageWidth);
                    tmpBox.children[0].src = tempImgs[toIndex];
                    tmpBox.dataset.isborder = 0;
                    tmpBox.style.opacity = 1;
                    tmpBox.dataset.isCurr = 1;

                } else { //left
                    translate = -pageWidth;
                    self.transform.call(tmpBox, pageWidth);
                    tmpBox.children[0].src = tempImgs[toIndex];
                    tmpBox.dataset.isborder = 0;
                    tmpBox.style.opacity = 1;
                    tmpBox.dataset.isCurr = 1;

                }

                setTimeout(function() {
                    currentItem.style.webkitTransition = tmpBox.style.webkitTransition = "0.3s ease -webkit-transform";
                    self.transform.call(currentItem, translate);
                    self.transform.call(tmpBox, tmpTrans);
                    if (tmpBox.dataset.isCurr == 1 && tmpBox.dataset.isborder == 0) {
                        replaceClass(tmpBox, "s-current", "s-tmp-box");
                        replaceClass(currentItem, "s-tmp-box", "s-current");
                    }
                }, 100);
            }
        })
    }
}

zScroll.init(document.querySelector(".slider-box"));