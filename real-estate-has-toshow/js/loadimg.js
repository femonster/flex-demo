// small my img mock
var sMyImgs = [
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
    // small other img mock
var sOtherImgs = [
    'http://upload-images.jianshu.io/upload_images/58338-535902052160c8f3.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/7740871-c2c80bad1edb2dfd.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3459828-d680839c1315cfbb.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/58338-c2bcd87742406b13.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/9531009-8bb163d6d1ca0ffe.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3888445-e94b9c270d90e0b3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3888445-b19e5de2f6e8ad3b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3888445-cb101354c9f627bf.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700',
    'http://upload-images.jianshu.io/upload_images/3888445-1de0c2b804291de4.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/700'

]
var arr = [];
var arr2 = [];
var count = 0;
sOtherImgs.forEach(function(item, index) {
    arr.push({
        width: 0,
        height: 0,
        url: item,
        isLoad: 0,
        isShow: 0,
        index: index
    });
})

sOtherImgs.forEach(function(item, index) {
    // loadImg({
    //         url: item,
    //         onComplete: function(img) {
    //             document.querySelectorAll("#oul li")[index].appendChild(img);
    //             check(img)
    //         }
    //     })
    var img = new Image();
    img.onload = function() {
        check(this);
        loading(this);
    }
    img.src = item;
    document.querySelectorAll("#oul li")[index].appendChild(img);
});

function check(img) {
    arr.forEach(function(item) {
        if (item.url == img.src && item.isShow == 0) {
            item.width = img.width;
            item.height = img.height;
            item.isLoad = 1;
            item.isShow = 1;
        }
    })
    while (count < arr.length) {
        if (arr[count].isShow == 1) {
            console.log(count);
            document.querySelectorAll("#oul img")[count].style.opacity = 1;
            count++
        } else {
            break;
        }
    }
}





// img onload
function loadImg(op) {
    var img = new Image();
    var complete = false;
    var t = setTimeout(function() {
        if (!complete && op.onTimeout) op.onTimeout();
        complete = true;
    }, op.timeout || 10000);
    img.onload = function() {
        clearTimeout(t);
        if (!complete && op.onComplete) op.onComplete(this);
        complete = true;
    }
    img.onerror = function() {
        clearTimeout(t);
        if (!complete && op.onerror) op.onerror(this);
        complete = true;
    }
    img.src = op.url;
}

function loadList(sArr, op) {
    if (op.start < sArr.length) {
        console.log(op.start);
        sArr.forEach(function(item, index) {
            loadImg({
                url: sArr[index],
                onComplete: function(img) {
                    if (op.start == index) {
                        op.start++;
                        op.succfn && op.succfn(img);
                    } else {
                        loadList(sArr, op);
                    }
                },
                onerror: function(img) {
                    op.start++;
                    op.fail && op.fail(img);
                },
                onTimeout: function(img) {
                    op.start++;
                    op.timout && op.timeout(img);
                }
            })
        })
    }
}

// (function() {
//     // loadList(sMyImgs, {
//     //     start: 0,
//     //     succfn: function(img) {
//     //         img.width = img.height = 100;
//     //         document.body.appendChild(img);
//     //     }
//     // })

//     loadList(sOtherImgs, {
//         start: 0,
//         succfn: function(img) {
//             img.width = img.height = 100;
//             document.body.appendChild(img);
//         }
//     })
// })()