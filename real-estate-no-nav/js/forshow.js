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

function forshow() {
    var str = '';
    var str2 = "";
    if (getQueryString("m")) {
        var params = getQueryString("m");
        var myBox = document.querySelector(".my-img-com");
        var more = 0;
        if (params == 0) {
            myBox.style.display = "none";
        } else {
            switch (params) {
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
                    more = params - 9;
            }
            for (var i = 0; i < params - more; i++) {
                //str += '<div class="img-item" data-i=' + (i + 1) + ' style="background-image:url(' + tempImgs[i] + ')"></div>';
                //str += '<div class="img-item" data-i=' + (i + 1) + '></div>';
                str += '<div class="item-box" data-bg=' + tempImgs[i] + '><div class="img-item" data-i=' + (i + 1) + ' data-echo-background=' + tempImgs[i] + '></div></div>';

            }
            myBox.innerHTML = str;

            if (hasClass(myBox, "more-img")) {
                console.log(myBox.lastChild.children);
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
            for (var i = 0; i < param2 - more; i++) {
                // str2 += '<div class="img-item" data-i=' + (i + 1) + '></div>';
                str2 += '<div class="item-box" data-bg=' + tempImgs[i] + '><div class="img-item" data-i=' + (i + 1) + ' data-echo-background=' + tempImgs[i] + '></div></div>';

            }
            otherbox.innerHTML = str2;
            if (hasClass(otherbox, "more-img")) {
                otherbox.lastChild.children[0].innerHTML = '<div class="more-mask">+' + more + '</div>';
            }
            // iLen2 = otherbox.children.length;

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

echo.init({
    callback: function(res) {
        res.style.opacity = 1;
    }
});

forshow();