function loadImage(el, url, fn, progtessfn) {
    if (typeof fn != 'function') {
        fn = function(url) {
            console.log("===createObjectURL===", url);
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = 'blob';
    xhr.onload = function() {
        var ourl = window.URL.createObjectURL(xhr.response);
        fn(ourl, el);

    }
    xhr.onprogress = function(event) {
        if (event.lengthComputable) {
            progressfn(event.loaded, event.total);
        }
    }
    xhr.onreadystatechange = function() {}
    xhr.onloadstart = function(e) {
        console.log("===loadstart===");
    }
    xhr.onabort = function(e) {
        console.log("===传输取消===");
    }
    xhr.onerror = function(e) {
        console.log("===error===");
    }
    xhr.onloadend = function() {
        console.log("===loadend===");
    }
    xhr.ontimeout = function() {
        console.log("===请求超时===");
    }
    xhr.send();
}

function progressfn(load, total) {
    var percent = load / total,
        perimeter = Math.PI * 2 * 43,
        circle = document.querySelector(".changecircle");
    circle.setAttribute("stroke-dasharray", perimeter * percent + " " + perimeter * (1 - percent));
    // console.log("===正在加载===");
}

function loadFinish(url, el) {
    var img = new Image();
    var elem;
    img.onload = function() {
        console.log("===imgWidth===", this.width);
        el.dataset.w = this.width;
        el.dataset.h = this.height;
        el.dataset.isload = 1;
        el.style.backgroundImage = "url(" + url + ")";
        el.style.opacity = "1";
    }
    img.src = url;
}

function startLoad() {
    var nodes = document.querySelectorAll('[data-echo-background]');
    var length = nodes.length;
    var elem, i, bg;
    for (i = 0; i < length; i++) {
        elem = nodes[i];
        bg = elem.dataset.echoBackground;
        loadImage(elem, bg, loadFinish, progressfn);
    }
}

window.addEventListener("DOMContentLoaded", function() {
    startLoad()
})