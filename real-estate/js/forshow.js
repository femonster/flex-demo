var tempImgs = [
    'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/2.jpg',
    'http://img.zcool.cn/community/019c04577f1e570000018c1bad9d13.jpg@900w_1l_2o_100sh.jpg',
    'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/3.jpg',
    'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/4.jpg',
    'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/5.jpg',
    'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/6.jpg',
    'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/7.jpg',
    'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/8.jpg',
    'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/9.jpg',
    'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/10.jpg',
    'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/11.jpg'
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
                str += '<div class="item-box" data-bg=' + tempImgs[i] + '><div class="img-item" data-i=' + (i + 1) + ' data-echo-background=' + tempImgs[i] + ' data-isload=0></div></div>';

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
            for (var i = 0; i < param2 - more; i++) {
                str2 += '<div class="item-box" data-bg=' + tempImgs[i] + ' data-isload="0"><div class="img-item" data-i=' + (i + 1) + ' data-echo-background=' + tempImgs[i] + '></div></div>';

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

// echo.init({
//     callback: function(res) {
//         res.style.opacity = 1;
//     }
// });

forshow();