var tempImgs = [
    "http://a.xnimg.cn/wap/mobile/2017activity/real-estate/img/1.jpg",
    "http://a.xnimg.cn/wap/mobile/2017activity/real-estate/img/2.jpg",
    "http://a.xnimg.cn/wap/mobile/2017activity/real-estate/img/timg.jpg",
    "http://a.xnimg.cn/wap/mobile/2017activity/real-estate/img/hyperlink-2x.png",
    "http://a.xnimg.cn/wap/mobile/2017activity/real-estate/img/listComment.png",
    "http://a.xnimg.cn/wap/mobile/2017activity/real-estate/img/listMore.png",
    "http://a.xnimg.cn/wap/mobile/2017activity/real-estate/img/navShare2.png",
    "http://a.xnimg.cn/wap/mobile/2017activity/real-estate/img/navShare2-2x.png",
    "http://a.xnimg.cn/wap/mobile/2017activity/real-estate/img/navArrowBack1.png"
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
                str += '<div class="img-item" data-i=' + (i + 1) + '></div>';
            }
            myBox.innerHTML = str;
            var miLen = myBox.children.length;
            // console.log(miLen, myBox.children);
            var count = 0;
            tempImgs.forEach(function(item, index) {
                if (index <= miLen - 1) {
                    var img = new Image();
                    img.src = item;
                    img.onload = function() {
                        myBox.children[count].dataset.width = img.width;
                        myBox.children[count].dataset.height = img.height;
                        myBox.children[count].dataset.url = img.src;
                        myBox.children[count].style.backgroundImage = "url(" + item + ")"
                        count++;
                    }
                }
            })

            if (hasClass(myBox, "more-img")) {
                myBox.lastChild.innerHTML = '<div class="more-mask">+' + more + '</div>';
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
                str2 += '<div class="img-item" data-i=' + (i + 1) + '></div>';
            }
            otherbox.innerHTML = str2;
            var oiLen = otherbox.children.length;
            // console.log(oiLen, otherbox.children);
            var count2 = 0;
            tempImgs.forEach(function(item, index) {
                if (index <= oiLen - 1) {
                    var img = new Image();
                    img.src = item;
                    img.onload = function() {
                        // console.log(count2);
                        otherbox.children[count2].dataset.width = img.width;
                        otherbox.children[count2].dataset.height = img.height;
                        otherbox.children[count2].dataset.url = img.src;
                        otherbox.children[count2].style.backgroundImage = "url(" + item + ")"
                        count2++;
                    }
                }

            })
            if (hasClass(otherbox, "more-img")) {
                otherbox.lastChild.innerHTML = '<div class="more-mask">+' + more + '</div>';
            }
            iLen2 = otherbox.children.length;

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