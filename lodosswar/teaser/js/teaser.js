//$(function(){
// 기본 초기화 데이터 세팅
var base = (function(){
	return {
		wHeight     : $(window).height(),
		wWidth      : $(window).width(),
		notiPanel   : $("#noticePanel"),
		blank       : $("a[href='#']"),
		notiBtn     : $("#notice"),
		maskLayer   : $("#maskLayer"),
		logo        : $(".logo"),
		scrollBtn   : $(".scroll"),
		main        : $("#main"),
		hero        : $("#hero"),
		cnt         : 0,
		boxNum      :  $(".box").length,
		section     : $(".section"),
		contentLng  : $(".section section").length,
		defTxt1     : "제목을 쓰는 곳입니다.",
		defTxt2     : "메일을 쓰는 곳입니다.",
		charImg1    : $("#heros .img1"),
		charImg2    : $("#heros .img2"),
		charImg3    : $("#heros .img3"),
		charImg4    : $("#heros .img4"),
		charImg5    : $("#heros .img5"),
		charImg6    : $("#heros .img6"),
		chapter1    : $("#heros .chapter_1"),
		btnsAll     : $("#talk, #notice, #nav"),
		charClsBtn  : $("#blurContent .charWrap .charCls"),
		charNavBtns : $("#blurContent #prev, #blurContent #next"),
		charLength  : $(".charHolder .charWrap").length,
		raiseAnimationEventCount: 0,
		currentPageIndex : 0
	}
}());

// 이벤트 발생 영역

var mEvent = (function(){
	base.blank.click(function(e){
		e.preventDefault();
	});

	base.notiBtn.click(function(){
		control.viewNotiBox();
	});

	$("body").on('mousewheel', function (event, delta) {
	    if (base.raiseAnimationEventCount > 0) {
	        return false;
	    }

	    if (delta < 0) {
	        if (base.cnt < base.boxNum - 1) {
	            base.cnt++;
	        } else {
	            return;
	        }
	    } else {
	        if (base.cnt > 0) {
	            base.cnt--;
	            
	        } else {
	            return;
	        }
	    }

	    var target = $("#nav").find("li:eq(" + base.cnt + ")");
	    control.aclick(base.cnt, target, delta);
	    

		
	});
	$("#nav").find("li").each(function(index){
		$(this).find("a").click(function(e){
			e.preventDefault();
			var target = $(this).parent("li");
			if(target.index()+1>base.contentLng){
				alert("not yet");
				//control.warnBox("not yet"); // 추후 작업 예정
				return false;
			}
			control.aclick(index,target);
		});
	});
	$("label input").click(function(){
		var inputData = $(this).val();
		var myParent = $(this).parent("label").index()+1;
		if(myParent==1){
			if(inputData==base.defTxt1){
				$(this).val("");
			} else {
				return false;
			}
		} else if(myParent==2){
			if(inputData==base.defTxt2){
				$(this).val("");
			} else {
				return false;
			}
		}
	});
	$("label input").blur(function(){
		var inputData = $(this).val();
		var myParent = $(this).parent("label").index()+1;
		if(myParent==1){
			if(inputData==""){
				$(this).val(base.defTxt1);
			} else {
				return false;
			}
		} else if(myParent==2){
			if(inputData==""){
				$(this).val(base.defTxt2);
			} else {
				return false;
			}
		}
	});
	$("#frmFieldWrap .cls").click(function(){
		control.frmCls();
	});
	// 문의하기 폼에 내용을 남긴 후 다시 문의하기를 사용할 때 기존 내용을 지우는 것.
	$("#talk").click(function(){
		control.frmClear();
	});
	// 최종 submit전 간단한 폼검증
	$(".frmField .confirm").click(function(){
		control.frmValidate();
	});
	$(".imgWrap a").click(function(){
		var idName = $(this).attr("id");
		var start = idName.indexOf("_");		
		idStr = idName.substring(start+1);
		control.viewBlurContent(idStr);
		return idStr;
	});
	$(".charWrap .charCls").click(function(){
		control.clsCharLayer();
	});
	$("#blurContent .charNav").click(function(){
		var id = $(this).attr("id");
		var currentChar = idStr;
		console.log(id, currentChar);
		control.charMovBtns(id, currentChar);
	});
	$("area").click(function (e) {

		e.preventDefault();
		var myNum = $(this).attr("class");
		var start = myNum.indexOf("_");
		classStr = myNum.substring(start + 1);	    
		control.viewBlurContent(classStr);
	});
}());

// 함수 모음
var control = (function(){
	var initMove = function(){
		base.logo.animate({bottom:414}, 800, "easeInOutQuart", function(){
			viewScrollBtn();
		});
	};
	var viewNotiBox = function(){
		var getLeft = base.notiPanel.css("left");
		if (getLeft == "-342px") {
			base.notiPanel.animate({left:0}, 500, "easeInOutQuart");
		} else {
			base.notiPanel.animate({left:-342}, 500, "easeInOutQuart");
		}
	};
	var maskLayerOpen = function(){
		base.maskLayer.animate({opacity:0.7}, 600, function(){
			base.maskLayer.css("z-index",10000);
		});
	};
	var maskLayerClose = function(){
		base.maskLayer.animate({opacity:0}, 600, function(){
			base.maskLayer.css("z-index",0);
		});
	};
	var viewScrollBtn = function(){
		base.scrollBtn.animate({opacity:1}, 1800);
	};
	var aclick = function (num, target, delta) {        
		contHeight = $(".box").height();
		cnt = num;

		base.raiseAnimationEventCount++;	
		base.section.animate({ "top": (contHeight * cnt) * (-1) + "px" }, 100, "easeInOutQuart", function () {
			$("#nav li").removeClass("on");
			target.addClass("on");
			if(cnt==1){
			    sect2Animate();
			} else if (cnt != 1) {
				initAnimate();
				backBlurContent();
			}
			base.raiseAnimationEventCount--;
		});

		
	};
	var frmClear = function () {
	    base.raiseAnimationEventCount++;
	    $("#frmFieldWrap").show().animate({ bottom: "11%" }, 600, "easeInOutQuart", function () { base.raiseAnimationEventCount--; });
		$(".title input").val(base.defTxt1);
		$(".mail input").val(base.defTxt2);
		$(".context textarea").val("");
		maskLayerOpen();
	};
	var frmCls = function () {
	    base.raiseAnimationEventCount++;
		$("#frmFieldWrap").animate({bottom:"-720px"}, 600, "easeInOutQuart", function(){
		    $("#frmFieldWrap").hide();
		    base.raiseAnimationEventCount--;
		});
		maskLayerClose();
	};
	var frmValidate = function(){
		var field1 = $(".frmField .title input");
		var field2 = $(".frmField .mail input");
		var field3 = $(".frmField .context textarea");
		var mailData = /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/; //RegExp
		if(field1.val()=="" || field1.val()==base.defTxt1){
			alert("제목을 입력해주세요");
			field1.focus();
			return false;
		} else if(field2.val()=="" || field2.val()==base.defTxt2){
			alert("회신받을 이메일을 입력해주세요.");
			field2.focus();
			return false;
		} else if (!mailData.test(field2.val())){
			alert("올바른 이메일 형식이 아닙니다.");
			field2.focus();
			return false;
		} else if(field3.val()==""){
			alert("문의하실 내용을 입력해주세요.");
			field3.focus();
			return false;
		} else {
			alert("미즈노 료 선생님에게 문의가 접수되었습니다.");
			frmCls();
		}
	};
	var sect2Animate = function () {
	    base.raiseAnimationEventCount++;
	    base.charImg1.animate({ "bottom": "649px", "left": "558px" }, 600, "easeInOutQuart", function () { base.raiseAnimationEventCount--; });
	    base.raiseAnimationEventCount++;
	    base.charImg2.animate({ "bottom": "594px", "left": "726px" }, 600, "easeInOutQuart", function () { base.raiseAnimationEventCount--; });
	    base.raiseAnimationEventCount++;
	    base.charImg3.animate({ "bottom": "483px", "left": "615px" }, 600, "easeInOutQuart", function () { base.raiseAnimationEventCount--; });
	    base.raiseAnimationEventCount++;
	    base.charImg4.animate({ "bottom": "372px", "left": "504px" }, 600, "easeInOutQuart", function () { base.raiseAnimationEventCount--; });
	    base.raiseAnimationEventCount++;
	    base.charImg5.animate({ "bottom": "316px", "left": "670px" }, 600, "easeInOutQuart", function () { base.raiseAnimationEventCount--; });
	    base.raiseAnimationEventCount++;
	    base.charImg6.animate({ "bottom": "205px", "left": "559px" }, 600, "easeInOutQuart", function () { base.raiseAnimationEventCount--; });
	    base.raiseAnimationEventCount++;
	    base.chapter1.animate({ "bottom": "494px" }, 1000, "easeInOutQuart", function () { base.raiseAnimationEventCount--; });
	};
	var initAnimate = function(){
		base.charImg1.css({"bottom":"2649px","left":"2558px"});
		base.charImg2.css({"bottom":"-2594px","left":"-2726px"});
		base.charImg3.css({"bottom":"-2483px","left":"-2615px"});
		base.charImg4.css({"bottom":"-2372px","left":"-2504px"});
		base.charImg5.css({"bottom":"2316px","left":"2670px"});
		base.charImg6.css({"bottom":"2205px","left":"2559px"});
		base.chapter1.css({"bottom":"444px"});
	};
	var viewBlurContent = function (num) {
	    //var currentChar = parseInt(num);
	    base.raiseAnimationEventCount++;
	    $("#blurContent").animate({ "left": "-0.1%" }, 500, "easeInOutQuart", function () { base.raiseAnimationEventCount--; });
		switch(num){
			case "1" :
			    $("#blurContent #char_1").css({ "visibility": "visible" });
			    base.raiseAnimationEventCount++;
			    $(".charHolder").animate({ "left": initCharWrapWidth * 0 }, 1000, function () { base.raiseAnimationEventCount--; });
			    base.raiseAnimationEventCount++;
			    $("#blurContent #char_1 .desc").animate({ "left": "80px" }, 1300, "easeInOutQuart", function () { base.raiseAnimationEventCount--; });
			    base.raiseAnimationEventCount++;
				$("#blurContent #char_1 .charImg").animate({"right":"0"}, 1500, "easeInOutQuart", function(){
				    viewFuncBtns();
				    base.raiseAnimationEventCount--;
				});
				base.raiseAnimationEventCount++;
				$("#blurContent #char_1 .page").animate({ "right": "25px" }, 1300, "easeInOutQuart", function () { base.raiseAnimationEventCount--; });
				break;
			case "2" :
				//$("#blurContent").animate({"left":"-0.1%"}, 3000, "easeInOutQuart");
				$("#blurContent #char_2").css({"visibility":"visible"});
				$(".charHolder").animate({"left":initCharWrapWidth}, 1000);
				$("#blurContent #char_2 .desc").animate({"left":"80px"}, 1300, "easeInOutQuart");
				$("#blurContent #char_2 .charImg").animate({"right":"46px"}, 1500, "easeInOutQuart", function(){
					viewFuncBtns();
				});
				$("#blurContent #char_2 .page").animate({"right":"25px"}, 1300, "easeInOutQuart");
				break;
			case "3" :
				//$("#blurContent").animate({"left":"-0.1%"}, 2500, "easeInOutQuart");
				$("#blurContent #char_3").css({"visibility":"visible"});
				$(".charHolder").animate({"left":initCharWrapWidth*2}, 1000);
				$("#blurContent #char_3 .desc").animate({"left":"80px"}, 1300, "easeInOutQuart");
				$("#blurContent #char_3 .charImg").animate({"right":"-59px"}, 1500, "easeInOutQuart", function(){
					viewFuncBtns();
				});
				$("#blurContent #char_3 .page").animate({"right":"25px"}, 1300, "easeInOutQuart");
				break;
			case "4" :
				//$("#blurContent").animate({"left":"-0.1%"}, 2000, "easeInOutQuart");
				$("#blurContent #char_4").css({"visibility":"visible"});
				$(".charHolder").animate({"left":initCharWrapWidth*3}, 1000);
				$("#blurContent #char_4 .desc").animate({"left":"80px"}, 1300, "easeInOutQuart");
				$("#blurContent #char_4 .charImg").animate({"right":"-181px"}, 1500, "easeInOutQuart", function(){
					viewFuncBtns();
				});
				$("#blurContent #char_4 .page").animate({"right":"25px"}, 1300, "easeInOutQuart");
				break;
			case "5" :
				//$("#blurContent").animate({"left":"-0.1%"}, 1500, "easeInOutQuart");
				$("#blurContent #char_5").css({"visibility":"visible"});
				$(".charHolder").animate({"left":initCharWrapWidth*4}, 1000);
				$("#blurContent #char_5 .desc").animate({"left":"80px"}, 1300, "easeInOutQuart");
				$("#blurContent #char_5 .charImg").animate({"right":"-51px"}, 1500, "easeInOutQuart", function(){
					viewFuncBtns();
				});
				$("#blurContent #char_5 .page").animate({"right":"25px"}, 1300, "easeInOutQuart");
				break;
			case "6" :
				//$("#blurContent").animate({"left":"-0.1%"}, 1000, "easeInOutQuart");
				$("#blurContent #char_6").css({"visibility":"visible"});
				$(".charHolder").animate({"left":initCharWrapWidth*5}, 1000);
				$("#blurContent #char_6 .desc").animate({"left":"80px"}, 1300, "easeInOutQuart");
				$("#blurContent #char_6 .charImg").animate({"right":"52px"}, 1500, "easeInOutQuart", function(){
					viewFuncBtns();
				});
				$("#blurContent #char_6 .page").animate({"right":"25px"}, 1300, "easeInOutQuart");			
				break;
		}
	};
	
	var backBlurContent = function(){
		$("#blurContent").css("left","100%");
	};
	var clsCharLayer = function(){
		$("#blurContent .charWrap .page").animate({"right":"-100%"}, 1000, "easeInExpo");
		$("#blurContent .charWrap .charImg").animate({"right":"-100%"}, 1500, "easeInExpo");
		$("#blurContent .charWrap .desc").animate({"left":"120%"}, 500, "easeInExpo");
		$("#blurContent").animate({"left":"100%"}, 700, "easeInExpo", function(){
			base.charClsBtn.css({"opacity":"0"});
			base.charNavBtns.css({"opacity":"0"});
			$(".charHolder").css({"left":"0"});
			$("#blurContent .charWrap").css({"visibility":"hidden"});
		});
	};
	var viewFuncBtns = function () {
	    base.raiseAnimationEventCount++;
	    base.charClsBtn.animate({ "opacity": "1" }, 100, function () { base.raiseAnimationEventCount--; });
	    base.raiseAnimationEventCount++;
	    base.charNavBtns.animate({ "opacity": "1" }, 100, function () { base.raiseAnimationEventCount--; });
	};
	var charMovBtns = function(id, currentChar){
		switch(id){
			case "prev":
				var current = currentChar;
				var pageNum = parseInt(--currentChar);
				var num = pageNum.toString();
				charMoveRight(pageNum, current);
				console.log(num, pageNum, current);
				break;
			case "next":
				var current = currentChar;
				var pageNum = parseInt(++currentChar);
				var num = pageNum.toString();
				charMoveLeft(pageNum, current);
				console.log(num, pageNum, current);
				break;
		}
	};
	var charMoveLeft = function(num, current){
		$("#blurContent #char_"+current+" .page").animate({"left":"-100%"}, 1500, "easeInExpo");
		$("#blurContent #char_"+current+" .charImg").animate({"left":"-100%"}, 1800, "easeInExpo");
		$("#blurContent #char_"+current+" .desc").animate({"left":"-150%"}, 2000, "easeInExpo", function(){
			$("#blurContent #char_"+num).css({"visibility":"visible"});
			$(".charHolder").animate({"left":initCharWrapWidth*(num-1)}, 1300);
			$("#blurContent #char_"+num+" .desc").animate({"left":"80px"}, 3000, "easeInOutQuart");
			$("#blurContent #char_"+num+" .charImg").animate({"right":"0"}, 4000, "easeInOutQuart", function(){
				viewFuncBtns();
			});
			$("#blurContent #char_"+num+" .page").animate({"right":"25px"}, 4300, "easeInOutQuart");
			$("#blurContent #char_"+current).css({"visibility":"hidden"});
		});
	};
	var charMoveRight = function(num, current){
		$("#blurContent #char_"+current+" .page").animate({"right":"-100%"}, 1500, "easeInExpo");
		$("#blurContent #char_"+current+" .charImg").animate({"right":"-100%"}, 1800, "easeInExpo");
		$("#blurContent #char_"+current+" .desc").animate({"left":"150%"}, 2000, "easeInExpo", function(){
			$("#blurContent #char_"+num).css({"visibility":"visible"});
			$(".charHolder").animate({"left":initCharWrapWidth*(num+1)}, 1300);
			$("#blurContent #char_"+num+" .desc").animate({"left":"80px"}, 3000, "easeInOutQuart");
			$("#blurContent #char_"+num+" .charImg").animate({"right":"0"}, 4000, "easeInOutQuart", function(){
				viewFuncBtns();
			});
			$("#blurContent #char_"+num+" .page").animate({"right":"25px"}, 4300, "easeInOutQuart");
			$("#blurContent #char_"+current).css({"visibility":"hidden"});
		});
	};
	return {
		viewNotiBox : viewNotiBox,
		initMove : initMove,
		maskLayerOpen : maskLayerOpen,
		maskLayerClose : maskLayerClose,
		viewScrollBtn : viewScrollBtn,
		aclick : aclick,
		frmClear : frmClear,
		frmCls : frmCls,
		frmValidate : frmValidate,
		sect2Animate : sect2Animate,
		viewBlurContent : viewBlurContent,
		backBlurContent : backBlurContent,
		clsCharLayer : clsCharLayer,		
		charMovBtns : charMovBtns,
		charMoveRight : charMoveRight,
		charMoveLeft : charMoveLeft,
		//currentChar : currentChar
	}
}());

//초기화 즉시실행기명함수
var init = (function(){
	$("section, #blurContent, .charWrap").css("height",base.wHeight);
	$(".charWrap").css("width",base.wWidth);
	charWrapWidth = $(".charWrap").css("width");
	initCharWrapWidth = parseInt(charWrapWidth)*(-1);
	$("#frmFieldWrap").hide();
	base.notiPanel.css("left",-342);
	base.scrollBtn.css("opacity",0);
	control.initMove();
	control.maskLayerClose();
	base.charImg1.css({"bottom":"2649px","left":"2558px"});
	base.charImg2.css({"bottom":"-2594px","left":"-2726px"});
	base.charImg3.css({"bottom":"-2483px","left":"-2615px"});
	base.charImg4.css({"bottom":"-2372px","left":"-2504px"});
	base.charImg5.css({"bottom":"2316px","left":"2670px"});
	base.charImg6.css({"bottom":"2205px","left":"2559px"});
	base.charClsBtn.css({"opacity":"0"});
	base.charNavBtns.css({"opacity":"0"});
	$(".charHolder").css({"left":"0"});
	$("#blurContent .charWrap").css({"visibility":"hidden"});
	return{
		initCharWrapWidth : initCharWrapWidth
	}
}());

$(window).resize(function(){
	var wHeight = $(window).height();
	var wWidth = $(window).width();
	$("section, #blurContent, .charWrap").css("height",wHeight);
	$(".charWrap").css("width",wWidth);
	//$(".charHolder").css("width",wWidth);
	//$(".charHolder").css("left",parseInt(wWidth)*(-1));
	//charWrapWidth = $(".charWrap").css("width");
	//initCharWrapWidth = parseInt(charWrapWidth)*(-1);
	if(wWidth <= 1024){
		$("body").addClass("narrow");
	} else {
		$("body").removeClass("narrow");
	}
});