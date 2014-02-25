/*파라미터를 읽어옵니다.*/
var param = new Array();
var url = document.location.href;
var params = url.substring(url.indexOf('?') + 1, url.length);
params = params.split("&");
var size = params.length;
var key, value;
for ( i = 0; i < size; i++) {
    key = params[i].split("=")[0];
    value = params[i].split("=")[1];
    param[key] = value;
}
var pageNum = param["pageNum"];
pageNum = parseInt(pageNum);

var noParamUrl = url.substring(0, url.indexOf('?'));

/*공통함수*/
function swapImg(object, berfoSRC, afterSRC) {
	var src = $(object).attr("src").replace(berfoSRC, afterSRC);
	$(object).attr("src", src);
};
$(function() {
	/*no-js 제거*/
	$(".no-js").removeClass("no-js");
	
	/*@media all and (max-width:1160px)*/
	$(window).resize(function() {
		var winWidth = $(window).width();
		if (winWidth <= 1160) {
			$("body").addClass("max-width-1160");
		} else {
			$("body").removeClass("max-width-1160");
		};
	}).resize();

	/*패밀리 사이트*/
	//메뉴 숨기기
	$(".familysite>ul").addClass("hide");

	//메뉴 활성화/비활성화
	$("body,.familysite").click(function() {
		var className = $(this).attr("class");

		if (className == "familysite") {
			$(".familysite>ul").toggleClass("hide");
			return false;
		} else {
			$(".familysite>ul").addClass("hide");
		}
	});

	//클릭시 새창에 열기
	/* // 전체버전
	$(".familysite>ul>li>a").click(function() {
		var URL = $(this).attr("href");
		window.open(URL);
	});
	*/

	//붉보2만 alert 버전
	$(".familysite>ul>li").click(function() {
		var familySiteIndex = $(this).index();
		if(familySiteIndex == 1){
			alert("COMING SOON~");
		}else{
			var URL = $(this).children().attr("href");
			window.open(URL);	
		}
	});



	/*사이트맵*/
	//사이트맵 불러오기
	var isSub = $("h1>a>img[src*='sub']").length;
	var root = "../";
	if (!isSub) {
		root = "./";
	}

	var siteMapURL = root + "/other/sitemap.html";

	$.ajax({
		url : siteMapURL,
		data : "",
		type : "get",
		timeout : 500,
		success : function(res) {
			//html을 가져와서 .sitemap_list생성
			var sitemapHTML = $(res).find(".sitemap_list");
			$("header").after("<article class='sitemap'><p><a href='#'><img src='" + root + "img/sitemap_close.gif' alt='close' /></a></p></article>");
			$(".sitemap").prepend(sitemapHTML);

			var oneDepthLength = $(".sitemap").children().eq(0).children().length;
			for ( i = 0; i < oneDepthLength; i++) {

				//1차메뉴 이미지 객체 생성
				var text = $(".sitemap").children().eq(0).children().eq(i).children().eq(0).html();
				$(".sitemap").children().eq(0).children().eq(i).children().eq(0).html("<img src='" + root + "img/sitemap0" + (i + 1) + ".gif' alt='" + text + "' title='" + text + "' />");

				//1차메뉴 경로 수정
				var url = $(".sitemap").children().eq(0).children().eq(i).children().eq(0).attr("href");
				if (url.substring(0, 3) == "../") {
					var replaceURL = url.replace("../", root);
					$(".sitemap").children().eq(0).children().eq(i).children().eq(0).attr("href", replaceURL);
				};

				var twoDepthLength = $(".sitemap").children().eq(0).children().eq(i).children().eq(1).children().length;
				for ( j = 0; j < twoDepthLength; j++) {
					//2차메뉴 이미지 객체 생성
					var text = $(".sitemap").children().eq(0).children().eq(i).children().eq(1).children().eq(j).children().html();
					$(".sitemap").children().eq(0).children().eq(i).children().eq(1).children().eq(j).children().html("<img src='" + root + "img/sitemap0" + (i + 1) + "_0" + (j + 1) + ".gif' alt='" + text + "' title='" + text + "' />");

					//1차메뉴 경로 수정
					var url = $(".sitemap").children().eq(0).children().eq(i).children().eq(1).children().eq(j).children().eq(0).attr("href");
					if (url.substring(0, 3) == "../") {
						var replaceURL = url.replace("../", root);
						$(".sitemap").children().eq(0).children().eq(i).children().eq(1).children().eq(j).children().eq(0).attr("href", replaceURL);
					};
				}
			}

			//사이트맵 on/off
			$(".top_btn>ul>li:last").click(function() {
				$(".sitemap").show();
				return false;
			});

			$(".sitemap").children().eq(1).children().click(function() {
				$(".sitemap").hide();
			});

		},
		error : function() {

		}
	});

	/*메인 보도자료 UI*/
	var hasMainPress = $(".main_press").length;
	if (hasMainPress) {
		$(".main_press tr").last().addClass("line_not");
	}

	/*탭*/
	var hasJsTab = $(".js_tab").length;
	if (hasJsTab) {
		$(".js_tab").children().hide();
		$(".js_tab").children().eq(0).show();

		$(".js_tab_bar").children().click(function() {
			var tabNum = $(this).index();

			$(".js_tab").children().hide();
			$(".js_tab").children().eq(tabNum).show();

			return false;
		});
	}

	/*FAQ*/
	var hasJsFAQ = $(".js_faq").length;
	if (hasJsFAQ) {
		$(".js_faq_a").hide();
		$(".js_faq_f").click(function() {
			var isShow = $(this).next().css("display");
			$(".js_faq_a").hide();
			if (isShow == "none") {
				$(this).next().show();
			}
		});
	};
});
