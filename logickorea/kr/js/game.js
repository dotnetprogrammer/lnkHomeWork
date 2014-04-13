$(function(){
	//스크린샷 갯수
	var gameScreenshotLength =  $(".game_screenshot>ul>li").length;
	
	//레이어 팝업 객체 생성
	var popScreenshot = "<div class='mask'>";
	popScreenshot += "</div>";
	popScreenshot += "<div class='popup'>";
	popScreenshot += "<a href='#' class='btn_prev'><img src='./img/screenshot_btn_prev.gif' alt='이전 이미지' title='이전 이미지' /></a>";
	popScreenshot += "<a href='#' class='btn_next'><img src='./img/screenshot_btn_next.gif' alt='다음 이미지' title='다음 이미지' /></a>";
	popScreenshot += "<img src='./img/screenshot_btn_close.gif' alt='이미지 팝업창 닫기' title='이미지 팝업창 닫기' class='btn_close' />";
	popScreenshot += "<img src='' alt='screenshot' title='screenshot' />";				
	popScreenshot += "</div>";
	
	$(".game_screenshot").append(popScreenshot);

	//레이어 팝업 띄우기
	var thisNum;		
	$(".game_screenshot>ul>li").click(function(){
		thisNum = $(this).index();
		$(".mask").show();
		$(".popup").show();
		$(".mask").css("opacity","0.8");
		
		var imgSrc = $(this).children().attr("href");
		$(".popup>img").last().attr("src",imgSrc);
				
		return false;
	});

	//btn_close
	$(".btn_close,.mask").click(function(){
		$(".mask").hide();
		$(".popup").hide();			
	});
	
	//btn_next
	$(".btn_next").click(function(){
		thisNum++;
		if(thisNum >= gameScreenshotLength){
			thisNum = 0;						
		}
		var srcLength = $(".popup>img").last().attr("src").length;
		var nextSrc01 = $(".popup>img").last().attr("src").substring(0,(srcLength - 5));
		var nextSrc02 = $(".popup>img").last().attr("src").substring((srcLength - 4),srcLength);
		$(".popup>img").last().attr("src",nextSrc01 + (thisNum + 1) + nextSrc02);	
	});
	
	//btn_prev
	$(".btn_prev").click(function(){
		thisNum--;
		if(thisNum < 0){
			thisNum = gameScreenshotLength - 1;			
		}
		var srcLength = $(".popup>img").last().attr("src").length;
		var nextSrc01 = $(".popup>img").last().attr("src").substring(0,(srcLength - 5));
		var nextSrc02 = $(".popup>img").last().attr("src").substring((srcLength - 4),srcLength);
		$(".popup>img").last().attr("src",nextSrc01 + (thisNum + 1) + nextSrc02);
	});
	
	//붉보2 클릭시 alert
	$(".game_go_bg02").click(function(){
		alert("COMING SOON~");
		return false;	
	});
	
	
})
