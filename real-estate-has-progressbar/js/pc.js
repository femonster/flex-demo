var sharePageObj = {
	othersArr: ['https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/2.jpg', 'http://img.zcool.cn/community/019c04577f1e570000018c1bad9d13.jpg@900w_1l_2o_100sh.jpg', 'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/3.jpg', 'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/4.jpg', 'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/5.jpg', 'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/6.jpg', 'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/7.jpg', 'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/8.jpg', 'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/9.jpg', 'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/10.jpg', 'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/11.jpg'],
	mainArr: ['https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/1.jpg', 'http://e.hiphotos.baidu.com/image/pic/item/eaf81a4c510fd9f9931060152f2dd42a2834a442.jpg', 'https://raw.githubusercontent.com/muyake/muyake.github.io/master/img/2.jpg'],
	scanImg: [],
	popupInfo: {
		isUp: false,
		url: '',
	},
	scanIndex: 0,
	//设置右侧输入框位置
	setMaxHeight: function() {
		var articleH = $('.article-b').height();
		var rightBH = $('.right-b h3').height() + $('.right-b .comment-b').height();
		if ($('.comment-b').css('margin-bottom') == '50px') {
			if (articleH > rightBH) {
				$('.right-b')[0].style.height = articleH + 'px';
			} else {
				$('.article-b')[0].style.height = rightBH + 'px';
			}
		} else {
			$('.right-b')[0].style.height = '';
			var inputWidth = $('.com-input').outerWidth() + 30;
			$('.com-icon').css('left', inputWidth + 'px');
		}
	},
	//设置动态设置单元格高度，及更多的lineheight值
	setItemHeight: function(liList) {
		var itemImg = liList;
		if (itemImg.length > 1) {
			var width = itemImg.eq(1).width();
			itemImg.each(function(i) {
				itemImg.eq(i).css('height', width);
			});
			var more = liList.children('.more');
			if (more) {
				more.css('line-height', width + 'px');
			}
		}
	},
	//设置浏览图片的状态
	setImg: function() {
		this.popupInfo.isUp = true;
		this.popupInfo.url = this.scanImg[this.scanIndex].sourceurl;
		// this.circle.setAttribute('stroke-dasharray', 0 + " " + 0);		

		var imageSelector = $('.imgList img');
		if (this.scanImg[this.scanIndex].finishLoad == 'over') {
			this.svg.style.display = 'none';
			this.svg.style.border = 'none';
			imageSelector.animate({
				opacity: 1,
				left: '0px',
			}, 800);
			var scanItem = this.scanImg[this.scanIndex];
			imageSelector.attr('src', scanItem.url);
			imageSelector.data({
				'width': scanItem.width,
				'height': scanItem.height,
				'isload': 'loaded',
				'url': scanItem.url,
			});
		} else {
			var total = this.scanImg[this.scanIndex].total;
			var loaded = this.scanImg[this.scanIndex].loaded;
			if (total != 0 && !!loaded && !!total) {
				var num = loaded / total;
				this.setProgress(num);
			} else {
				this.setProgress(0);
			}
			imageSelector.stop();

			imageSelector.css({
				opacity: 0,
				left: '0px',
				right: '0px',
			});
			this.svg.style.display = 'block';
			this.svg.style.border = 'none';
			console.log('block:block');
		}
	},
	//初始化浏览照片
	initScan: function() {
		var raSelector = $('.rightArrow');
		var laSelector = $('.leftArrow');
		raSelector.attr('isdisable', 'false');
		raSelector.css({
			'cursor': 'pointer',
			'backgroundImage': 'url(./img/feedWebR1-2x.png)'
		});

		laSelector.attr('isdisable', 'false');
		laSelector.css({
			'cursor': 'pointer',
			'backgroundImage': 'url(./img/feedWebL1-2x.png)'
		});
		if ((this.scanImg.length - 1) == this.scanIndex) {
			raSelector.attr('isdisable', 'true');
			raSelector.css({
				'cursor': 'default',
				'backgroundImage': 'url(./img/feedWebR2-2x.png)'
			});
		}
		if (0 == this.scanIndex) {
			laSelector.attr('isdisable', 'true');
			laSelector.css({
				'cursor': 'default',
				'backgroundImage': 'url(./img/feedWebL2-2x.png)'
			});
		}
		this.setImg();
		$('.popup').removeClass('isHiden');
		this.setimgWH();
	},
	//绑定按钮事件
	bindEvent: function() {
		var self = this;
		$('.leftR').on('click', function() {
			$('.popup').addClass('isHiden');
		});
		$('.leftArrow').on('click', function() {
			if ($(this).attr('isdisable') == 'true') {
				return;
			}
			if (self.scanIndex > 0) {
				self.scanIndex--;
				// $('.imgList img').hide();
				$('.imgList img').stop();
				$('.imgList img').css({
					opacity: 0.8,
					left: '-100px'
				});
				self.setImg();
				self.setimgWH();
			}
			if (self.scanIndex == 0) {
				$(this).attr('isdisable', 'true');
				$(this).css({
					'cursor': 'default',
					'backgroundImage': 'url(./img/feedWebL2-2x.png)',
				})
			}
			if (self.scanImg.length >= 2) {
				$('.rightArrow').attr('isdisable', 'false');
				$('.rightArrow').css({
					'cursor': 'pointer',
					'backgroundImage': 'url(./img/feedWebR1-2x.png)'
				})
			}
		});
		$('.rightArrow').on('click', function() {
			if ($(this).attr('isdisable') == 'true') {
				return;
			}
			if (self.scanIndex <= self.scanImg.length - 2) {
				self.scanIndex++;
				$('.imgList img').stop();
				$('.imgList img').css({
					opacity: 0.8,
					left: '100px'
				})
				self.setImg();
				self.setimgWH();
			}
			if (self.scanIndex == self.scanImg.length - 1) {
				$(this).attr('isdisable', 'true');
				$(this).css({
					'cursor': 'default',
					'backgroundImage': 'url(./img/feedWebR2-2x.png)'
				});
			}
			if (self.scanImg.length >= 2) {
				$('.leftArrow').attr('isdisable', 'false');
				$('.leftArrow').css({
					'cursor': 'pointer',
					'backgroundImage': 'url(./img/feedWebL1-2x.png)'
				});
			}
		});
		$('.img-b').on('click', 'li', function() {
			var othersArr = [];
			if ($(this).children('.more').length > 0) {
				return;
			}
			var siblings = $(this).closest('.img-b').children('li');
			siblings.each(function(index) {
				// var imgurl = siblings.eq(index).data('url');//不能用
				var imgurl = siblings.eq(index).attr('data-url');
				var width = siblings.eq(index).data('width');
				var height = siblings.eq(index).data('height');
				var finishLoad = siblings.eq(index).data('loaded');
				var sourceurl = siblings.eq(index).data('source');
				othersArr.push({
					url: imgurl,
					width: width,
					height: height,
					finishLoad: finishLoad,
					sourceurl: sourceurl,
				});
			});
			self.scanImg = othersArr;
			self.scanIndex = $(this).index();
			self.initScan();
		});
		$('body').on('click', '.loadapp', function() {
			alert('跳转');
		});
		$(window).resize(function() {
			self.setItemHeight($('.others-comment .img-b li'));
			self.setItemHeight($('.my-comment .img-b li'));
			self.setMaxHeight();
			if (!$('.popup').hasClass('isHiden')) {
				self.setimgWH();
			}
		});
	},
	//渲染图片列表框
	init: function(selector, arr) {
		var str = '';
		var length = arr.length;
		if (arr.length == 0) {
			selector.hide();
		}
		arr.forEach(function(item, index) {
			if (index < 8) {
				str += '<li data-source=' + item + '  data-url=' + item + '><div class="liimg-b"></div></li>';
			} else if (index == 9) {
				if (length > 9) {
					var num = length - 9;
					str += '<li data-source=' + item + ' data-url=' + item + '><div class="liimg-b"></div><div class="more loadapp">+' + num + '</div></li>';
				} else {
					str += '<li data-source=' + item + ' data-url=' + item + '><div class="liimg-b"></div></li>';
				}
			}
		});
		var classnum = 'one';
		var length = arr.length;
		if (length == 2 || length == 4) {
			classnum = 'two';
		}
		if (length >= 3) {
			classnum = 'three';
		}
		selector.append(str);
		selector.addClass(classnum);
	},
	//下载图片完成函数
	loadFinish: function(sourceurl, url, width, height) {
		this.scanImg.forEach(function(item, index) {
			if (item.sourceurl == sourceurl) {
				item.width = width;
				item.height = height;
				item.url = url;
				item.finishLoad = 'over';
			}
		});
		// var imgurl = $('.imgList img').data('url');
		var imgurl = this.popupInfo.url;
		var imgSelector = $('.imgList img');
		if (imgurl == sourceurl && this.popupInfo.isUp == true) {
			imgSelector.attr('src', url);
			imgSelector.data({
				'width': width,
				'height': height,
				'isload': 'loaded',
				'url': this.scanImg[this.scanIndex].url
			})
			this.setimgWH();

			// imgSelector.show();
			imgSelector.css({
				opacity: 1,
				left: '0px',
				right: '0px'
			});
			var self = this;
			setTimeout(function() {
				self.svg.style.block = 'none';
				// self.svg.style.border = '2px solid red';				
			}, 1000);

		}
	},

	//下载图片
	onloadurl: function(ulSelector) {
		var liList = ulSelector.children('li');
		var self = this;
		liList.each(function(i) {
			var liSelector = liList.eq(i);
			var imgUrl = liSelector.data('url');
			var sourceurl = liSelector.data('source');

			loadObj.loadImage(imgUrl, function(bitImgUrl, width, height) {
				liSelector.children('.liimg-b').css({
					opacity: '1',
					backgroundImage: 'url(' + bitImgUrl + ')'
				})
				liSelector.attr({
					'data-width': width,
					'data-height': height,
					'data-id': 'img' + i,
					'data-loaded': 'over',
					'data-url': bitImgUrl
				})
				self.loadFinish(sourceurl, bitImgUrl, width, height);
			}, function(sourceurl, loaded, total) {
				self.scanImg.forEach(function(item, index) {
					if (item.sourceurl == sourceurl) {
						item.loaded = loaded;
						item.total = total;
					}
				});
				if (sourceurl == self.popupInfo.url && self.popupInfo.isUp == true) {
					var num = loaded / total;
					self.setProgress(num);
				}
			});

		})
	},
	//设置浏览图片的高度和宽度
	setimgWH: function() {
		if ($('.imgList img').data('isload') == 'loading') {
			var imgw = $('.imgList img').data('width');
			var imgh = $('.imgList img').data('height');
			$('.imgList img').width(imgw);
			$('.imgList img').height(imgh);

		} else {
			var cw = $('.imgList').width();
			var ch = $('.imgList').height();
			var imgw = $('.imgList img').data('width');
			var imgh = $('.imgList img').data('height');
			var rate1 = 0;
			var rate2 = 0;
			if (ch > 0) {
				rate1 = cw / ch;
			}
			if (imgh > 0) {
				rate2 = imgw / imgh
			};
			if (rate1 > rate2) {
				$('.imgList img').height(ch);
				$('.imgList img').width(ch * rate2);
			} else {
				$('.imgList img').width(cw);
				$('.imgList img').height(cw / rate2);
			}
		}
	},
	setProgress: function(num) {
		var percent = num;
		perimeter = Math.PI * 2 * 43;
		this.circle.setAttribute('stroke-dasharray', perimeter * percent + " " + perimeter * (1 - percent));

	},
	pageInit: function() {
		this.circle = document.querySelectorAll("circle")[1];
		this.svg = document.querySelectorAll("svg")[0];
		this.init($('.others-comment .img-b'), this.othersArr);
		this.init($('.my-comment .img-b'), this.mainArr);
		this.bindEvent();
		this.onloadurl($('.others-comment .img-b'));
		this.onloadurl($('.my-comment .img-b'));
		$(window).resize();
	}
}
var loadObj = {
	loadImage: function(uri, callback, progressCallb) {
		if (typeof callback != 'function') {
			callback = function(uri) {
				console.log(uri);
			}
		}
		var xhr = new XMLHttpRequest();
		xhr.open('GET', uri, true);
		xhr.responseType = 'blob';
		// xhr.timeout = 10000;
		xhr.onload = function() {
			var url = window.URL.createObjectURL(xhr.response);
			var img = new Image();
			img.onload = function() {
				callback(url, img.width, img.height);
			}
			img.src = url;

		}
		xhr.onprogress = function(event) {　
			if (event.lengthComputable) {
				progressCallb(uri, event.loaded, event.total);　　　
			}　　
		};
		xhr.onreadystatechange = function(e) {};
		xhr.onloadstart = function(e) {
			console.log('onloadstart');
		};
		xhr.onabort = function() {
			console.log('传输取消。');
		};
		xhr.onerror = function() {
			console.log('传输错误。');
		};
		xhr.onloadend = function() {
			console.log('传输结束。');
		};
		xhr.ontimeout = function(event) {
			console.log('请求超时！');
		};
		xhr.send();
	}
}
$(function() {
	sharePageObj.pageInit();
})