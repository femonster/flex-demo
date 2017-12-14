var tempImgs = [
    'http://upload-images.jianshu.io/upload_images/9472808-e5198d54b4613b57.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/9472808-309a14d9429de532.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/9472808-9ac32abd840be7c5.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/9472808-e8076ee468834ff8.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/9472808-64165b9c86278f7d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3812307-d1849b94d6ce0ae3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3459828-1e13da93bf8f89f3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3459828-afd8c23598b7f691.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3459828-edfb38a3caca178e.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3888445-cb101354c9f627bf.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',

]

var otherTmps = [
    'http://upload-images.jianshu.io/upload_images/58338-535902052160c8f3.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/7740871-c2c80bad1edb2dfd.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/8335295-ad8a0e30d6d53277.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3459828-d680839c1315cfbb.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/58338-c2bcd87742406b13.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/9531009-8bb163d6d1ca0ffe.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3888445-e94b9c270d90e0b3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3888445-b19e5de2f6e8ad3b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3888445-cb101354c9f627bf.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3888445-1de0c2b804291de4.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700'

]
// var tempImgs = [
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/1.jpg',
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/2.jpg',
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/3.jpg',
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/4.jpg',
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/5.jpg',
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/6.jpg',
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/7.jpg',
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/8.jpg',
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/9.jpg',
// ]

// var otherTmps = [
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/10.jpg',
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/11.jpg',
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/12.jpg',
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/13.jpg',
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/14.jpg',
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/15.jpg',
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/16.jpg',
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/17.jpg',
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/18.jpg',
//     'http://a.xnimg.cn/wap/mobile/2017activity/real-estate/branch/loading/branch/real-estate-has-nav/img/home/19.jpg'
// ]

function mySliderNum() {
    var tmp = getQueryString("m") ? Number(getQueryString("m")) : 0;
    if (tmp > 9) {
        return 9;
    } else {
        return tmp;
    }
}

function othSliderNum() {
    var tmp = getQueryString("o") ? Number(getQueryString("o")) : 0;
    if (tmp > 9) {
        return 9;
    } else {
        return tmp;
    }
}

function forshow() {
    var str = '';
    var str2 = "";
    if (getQueryString("m")) {
        var params1 = getQueryString("m");
        var myBox = document.querySelector(".my-img-com");
        var more = 0;
        if (params1 == 0) {
            myBox.style.display = "none";
        } else {
            switch (params1) {
                case "1":
                    addClass(myBox, "one-img");
                    break;
                case "2":
                case "4":
                    addClass(myBox, "two-img");
                    break;
                case "3":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    addClass(myBox, "three-img");
                    break;
                default:
                    addClass(myBox, "three-img");
                    addClass(myBox, "more-img");
                    more = params1 - 9;
            }
            p1all = params1 - more;
            for (var i = 0; i < params1 - more; i++) {
                str += '<div class="item-box"  data-bg=' + tempImgs[i] + '><div class="img-item" data-who="me" data-all=' + (params1 - more) + ' data-sort=' + i + ' data-i=' + i + ' data-echo-background=' + tempImgs[i] + ' data-isload="0"></div></div>';

            }
            myBox.innerHTML = str;

            if (hasClass(myBox, "more-img")) {
                myBox.lastChild.children[0].innerHTML = '<div class="more-mask">+' + more + '</div>';
            }
        }

    }

    if (getQueryString("o")) {
        var other = document.querySelector(".other-article");
        var otherbox = document.querySelector(".other-img-com");
        var param2 = getQueryString("o");
        var more = 0;
        other.style.display = "block";
        if (param2 == 0) {
            myBox.style.display = "none";
        } else {
            switch (param2) {
                case "1":
                    addClass(otherbox, "one-img");
                    break;
                case "2":
                case "4":
                    addClass(otherbox, "two-img");
                    break;
                case "3":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    addClass(otherbox, "three-img");
                    break;
                default:
                    addClass(otherbox, "three-img");
                    addClass(otherbox, "more-img");
                    more = param2 - 9;
            }
            // var myall = mySliderNum();
            for (var i = 0; i < param2 - more; i++) {
                str2 += '<div class="item-box" data-bg=' + otherTmps[i] + '><div class="img-item" data-who="other" data-sort="' + i + '" data-i=' + i + ' data-echo-background=' + otherTmps[i] + ' data-isload="0"></div></div>';

            }
            otherbox.innerHTML = str2;
            if (hasClass(otherbox, "more-img")) {
                otherbox.lastChild.children[0].innerHTML = '<div class="more-mask">+' + more + '</div>';
            }
        }
    }

    if (getQueryString("n")) {
        var p = getQueryString("n");
        var noCom = document.querySelector(".no-comment");
        var liCom = document.querySelector(".list-num");
        var ulCom = document.querySelector(".comments-ul");
        if (p == "0") {
            noCom.style.display = "block";
            liCom.style.display = "none";
            ulCom.style.display = "none";
        } else if (p == "1") {
            noCom.style.display = "none";
            liCom.style.display = "block";
            ulCom.style.display = "block";
        }
    }
}

forshow();