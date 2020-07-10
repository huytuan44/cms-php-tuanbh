/*   Project: Popup Lightbox 
 *   Author: Asif Mughal
 *   URL: www.codehim.com
 *   License: MIT License
 *   Copyright (c) 2019 - Asif Mughal
 */
/* File: jquery.popup.lightbox.js */
(function ($) {
	$.fn.popupLightbox = function (options) {
		
		var setting = $.extend({
			inAnimation: "ZoomIn",

		}, options);

		return this.each(function () {
			
			var target = $(this);

			var popupWindowLayout = $div();

			var popupWindow = $section();

			var closeBtn = $button();

			var nextBtn = $button();

			var prevBtn = $button();

			var imgStat = $div();

			var imgFig = $figure();

			var capBar = $figcaption();

			var imgs = $(target).find("img");
			var totalImgs = imgs.length;

			var imgNum = 0;
			var current, thisCaption;

			
			$(nextBtn).addClass("btn-next")
				.appendTo(popupWindow);

			$(prevBtn).addClass("btn-prev")
				.appendTo(popupWindow);

			$(closeBtn).addClass("btn-close")
				.appendTo(popupWindow)
				.html("\&times;");

			$(imgStat).addClass("lightbox-status")
				.appendTo(popupWindow);


			$(imgFig).addClass("img-show")
				.appendTo(popupWindow);

			$(popupWindow).addClass("lightbox animated faster " + setting.inAnimation).appendTo(popupWindowLayout);
			
			$(popupWindowLayout).addClass("popup-layout-image").appendTo("body");
			//set up unique number for each image 

			for (var i = 0; i < imgs.length; i++) {

				$(imgs).eq(i).attr({
					'data-num': i,
					'id': '#img' + i,
				});


			}

			$changeSection(setting.width, setting.height)


			$(capBar).addClass("img-caption animated fadeInUp");


			$(imgs).click(function () {
				var thisImg = $(this).clone();
				var thisNum = $(this).attr("data-num") * 1;
				var $caption = $(this).attr('alt');
				$changeSection(thisImg[0].width, thisImg[0].height);
				$(".popup-layout-image").css('display', 'block');
				if ($(this).prop('alt') == false) {
					$caption = "This image has no caption";
				}


				imgNum = thisNum;

				if (thisNum + 1 == totalImgs) {
					$(nextBtn).hide();
					$(prevBtn).show();
				} else if (thisNum == 0) {
					$(prevBtn).hide();
					$(nextBtn).show();
				} else {
					$(nextBtn).show();
					$(prevBtn).show();
				}

				$(imgStat).html(thisNum + 1 + " / " + totalImgs);

				$(imgFig).html(thisImg)
					.parent().fadeIn();

				$(capBar).html($caption).appendTo(imgFig);

			});


			//Next image 

			$(nextBtn).click(function () {

				var y = totalImgs - 1;


				if (imgNum < y) {
					imgNum += 1;
				}

				if (imgNum + 1 == totalImgs) {
					$(nextBtn).hide();
				}

				$(prevBtn).fadeIn();


				$(imgFig).find("img").animate({
					'left': '-100%',
					'opacity': 0,
				}, 200, function () {
					$changeSection($(imgs).eq(imgNum)[0].naturalWidth, $(imgs).eq(imgNum)[0].naturalHeight);
					$(imgFig).html($(imgs).eq(imgNum).clone());

					current = $(imgFig).find("img");

					thisCaption = $(current).attr("alt");

					if ($(current).prop('alt') == false) {
						thisCaption = "This image has no caption";
					}

					$(capBar).html(thisCaption).appendTo(imgFig);

					$(imgStat).html(imgNum + 1 + " / " + totalImgs);

				});


			});

			//Previous image 

			$(prevBtn).click(function () {


				if (imgNum > 0) {

					imgNum -= 1;
				}
				$(nextBtn).fadeIn();


				$(imgFig).find("img").animate({
					'right': '-100%',
					'opacity': 0,
				}, 200, function () {
					$changeSection($(imgs).eq(imgNum)[0].naturalWidth, $(imgs).eq(imgNum)[0].naturalHeight);
					$(imgFig).html($(imgs).eq(imgNum).clone());

					current = $(imgFig).find("img");

					thisCaption = $(current).attr("alt");
					$(capBar).html(thisCaption).appendTo(imgFig);


					$(imgStat).html(imgNum + 1 + " / " + totalImgs);

				});

				if (imgNum == 0) {
					$(prevBtn).hide();
				}


			});


			function $div() {
				return document.createElement("div");
			}

			function $button() {
				return document.createElement("button");

			}

			function $section() {

				return document.createElement("section");

			}

			function $figure() {
				return document.createElement("figure");
			}

			function $figcaption() {
				return document.createElement("figcaption");

			}

			function $changeSection(width, height) {
				let screenWidth = window.screen.width - 120;
				let screenHeight = window.screen.height - 120;
				if (height > screenHeight) {
					width = width*screenHeight/height;
					height = screenHeight;
				}
				if (width > screenWidth) {
					height = height*screenWidth/width;
					width = screenWidth;
				}
				if ($(window).width() > 620) {


					$(popupWindow).css({
						'width': width,
						'height': height,
						'position': 'fixed',
						'top': '50%',
						'marginTop': -(height / 2),
						'left': '50%',
						'marginLeft': -(width / 2),
						'zIndex': '999',
						'overflow': 'hidden',
	
					});
	
				} else {
					$(popupWindow).css({
						'width': '100%',
						'height': '100%',
						'top': 0,
						'left': 0,
	
	
					});
	
	
				}
			}

			$(".btn-close").click(function () {
				$(this).parent().fadeOut();
				$(".popup-layout-image").css('display', 'none');
				imgNum = 0;
			});


		});
	};

})(jQuery);
