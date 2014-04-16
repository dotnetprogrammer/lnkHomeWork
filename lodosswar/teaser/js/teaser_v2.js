//$(function(){
// 기본 초기화 데이터 세팅
var base = (function(){
	return {
		wHeight : $(window).height(),
		wWidth : $(window).width(),
		notiPanel : $("#noticePanel"),
		blank : $("a[href='#']"),
		notiBtn : $("#notice"),
		maskLayer : $("#maskLayer"),
		logo : $(".logo"),
		scrollBtn : $(".scroll"),
		main : $("#main"),
		hero : $("#hero"),
		cnt : 0,
		boxNum : $(".box").length,
		section : $(".section"),
		contentLng : $(".section section").length,
		defTxt1 : "제목을 쓰는 곳입니다.",
		defTxt2 : "메일을 쓰는 곳입니다.",
		charImg1 : $("#heros .img1"),
		charImg2 : $("#heros .img2"),
		charImg3 : $("#heros .img3"),
		charImg4 : $("#heros .img4"),
		charImg5 : $("#heros .img5"),
		charImg6 : $("#heros .img6"),
		chapter1 : $("#heros .chapter_1"),
		btnsAll : $("#talk, #notice, #nav"),
		charClsBtn : $("#blurContent .charWrap .charCls"),
		charNavBtns : $("#blurContent #prev, #blurContent #next"),
		charLength : $(".charHolder .charWrap").length,
		charCnt : 0,
        isRaiseWheelEvent : false,
        isBodyWheelEvent : true,
        isBlurContentWheelEvent : false
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
	$("body").on('mousewheel', function(event, delta) {
		if(base.isBodyWheelEvent){
			if(delta < 0){
				if(base.cnt < base.boxNum-1){
					base.cnt++;
				}
			}else{
				if(base.cnt > 0){
					base.cnt--;
				}
			}	
			var target = $("#nav").find("li:eq("+base.cnt+")");
			control.aclick(base.cnt,target);
			return true;
		} else {
			return false;
		}
	});
	$("#blurContent").on("mousewheel", function(event, delta){
		base.isBodyWheelEvent = false;
		if(delta < 0){
			if(base.charCnt < base.charLength-1){
				base.charCnt++;
			} else {
				if(base.charCnt > 0){
					base.charCnt--;
				}
			}
			control.viewMapContent(base.charCnt);
			console.log(base.charCnt);
		}
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
		base.isBodyWheelEvent = true;
	});
	$("#blurContent .charNav").click(function(){
		var id = $(this).attr("id");
		var currentChar = idStr;
		control.charMovBtns(id, currentChar);
	});
	$("area").click(function(e){
		e.preventDefault();
		var myNum = $(this).attr("class");
		var start = myNum.indexOf("_");
		classStr = myNum.substring(start+1);
		control.viewMapContent(parseInt(classStr));
	});
}());

// 함수 모음
var control = (function(){
	var initMove = function(){
		base.logo.animate({bottom:414}, 800, "easeOutExpo", function(){
			viewScrollBtn();
		});
	};
	var viewNotiBox = function(){
		var getLeft = base.notiPanel.css("left");
		if (getLeft == "-342px") {
			base.notiPanel.animate({left:0}, 500, "easeOutExpo");
		} else {
			base.notiPanel.animate({left:-342}, 500, "easeOutExpo");
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
	var aclick = function (num, target) {
	    if (base.isRaiseWheelEvent == true) {
			return false;
		}
		base.isRaiseWheelEvent = true;
		contHeight = $(".box").height();
		cnt = num;
		base.section.animate({"top":(contHeight*cnt)*(-1)+"px"}, 800, "easeOutExpo", function(){
			$("#nav li").removeClass("on");
			target.addClass("on");
			if(cnt==1){
				sect2Animate();
			} else if(cnt!=1) {
				initAnimate();
				backBlurContent();
			}
			base.isRaiseWheelEvent = false;
		});

		
	};
	var frmClear = function(){
		$("#frmFieldWrap").show().animate({bottom:"11%"}, 600, "easeOutExpo");
		$(".title input").val(base.defTxt1);
		$(".mail input").val(base.defTxt2);
		$(".context textarea").val("");
		maskLayerOpen();
	};
	var frmCls = function(){
		$("#frmFieldWrap").animate({bottom:"-720px"}, 600, "easeOutExpo", function(){
			$("#frmFieldWrap").hide();
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
			return false;
			field1.focus();
		} else if(field2.val()=="" || field2.val()==base.defTxt2){
			alert("회신받을 이메일을 입력해주세요.");
			return false;
			field2.focus();
		} else if (!mailData.test(field2.val())){
			alert("올바른 이메일 형식이 아닙니다.");
			return false;
			field2.focus();
		} else if(field3.val()==""){
			alert("문의하실 내용을 입력해주세요.");
			return false;
			field3.focus();
		} else {
			alert("미즈노 료 선생님에게 문의가 접수되었습니다.");
			frmCls();
		}
	};
	var sect2Animate = function(){
		base.charImg1.animate({"bottom":"649px","left":"558px"}, 1200, "easeOutExpo");
		base.charImg2.animate({"bottom":"594px","left":"726px"}, 1200, "easeOutExpo");
		base.charImg3.animate({"bottom":"483px","left":"615px"}, 1200, "easeOutExpo");
		base.charImg4.animate({"bottom":"372px","left":"504px"}, 1200, "easeOutExpo");
		base.charImg5.animate({"bottom":"316px","left":"670px"}, 1200, "easeOutExpo");
		base.charImg6.animate({"bottom":"205px","left":"559px"}, 1200, "easeOutExpo");
		base.chapter1.animate({"bottom":"494px"}, 6000, "easeOutExpo");
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
	var viewBlurContent = function(num){
		base.isBlurContentWheelEvent = true;
		$("#blurContent").animate({"left":"-0.1%"}, 3500, "easeOutExpo");
		switch(num){
			case "1" :
				$("#blurContent #char_1").css({"visibility":"visible"});
				$(".charHolder").animate({"left":initCharWrapWidth*0}, 1300);
				$("#blurContent #char_1 .desc").animate({"left":"80px"}, 3000, "easeOutExpo");
				$("#blurContent #char_1 .charImg").animate({"right":"0"}, 4000, "easeOutExpo", function(){
					viewFuncBtns();
				});
				$("#blurContent #char_1 .page").animate({"right":"25px"}, 4300, "easeOutExpo");
				break;
			case "2" :
				//$("#blurContent").animate({"left":"-0.1%"}, 3000, "easeOutExpo");
				$("#blurContent #char_2").css({"visibility":"visible"});
				$(".charHolder").animate({"left":initCharWrapWidth}, 1300);
				$("#blurContent #char_2 .desc").animate({"left":"80px"}, 3000, "easeOutExpo");
				$("#blurContent #char_2 .charImg").animate({"right":"46px"}, 4500, "easeOutExpo", function(){
					viewFuncBtns();
				});
				$("#blurContent #char_2 .page").animate({"right":"25px"}, 5000, "easeOutExpo");
				break;
			case "3" :
				//$("#blurContent").animate({"left":"-0.1%"}, 2500, "easeOutExpo");
				$("#blurContent #char_3").css({"visibility":"visible"});
				$(".charHolder").animate({"left":initCharWrapWidth*2}, 1000);
				$("#blurContent #char_3 .desc").animate({"left":"80px"}, 3000, "easeOutExpo");
				$("#blurContent #char_3 .charImg").animate({"right":"-59px"}, 4500, "easeOutExpo", function(){
					viewFuncBtns();
				});
				$("#blurContent #char_3 .page").animate({"right":"25px"}, 5000, "easeOutExpo");
				break;
			case "4" :
				//$("#blurContent").animate({"left":"-0.1%"}, 2000, "easeOutExpo");
				$("#blurContent #char_4").css({"visibility":"visible"});
				$(".charHolder").animate({"left":initCharWrapWidth*3}, 700);
				$("#blurContent #char_4 .desc").animate({"left":"80px"}, 3000, "easeOutExpo");
				$("#blurContent #char_4 .charImg").animate({"right":"-181px"}, 4500, "easeOutExpo", function(){
					viewFuncBtns();
				});
				$("#blurContent #char_4 .page").animate({"right":"25px"}, 5000, "easeOutExpo");
				break;
			case "5" :
				//$("#blurContent").animate({"left":"-0.1%"}, 1500, "easeOutExpo");
				$("#blurContent #char_5").css({"visibility":"visible"});
				$(".charHolder").animate({"left":initCharWrapWidth*4}, 400);
				$("#blurContent #char_5 .desc").animate({"left":"80px"}, 3000, "easeOutExpo");
				$("#blurContent #char_5 .charImg").animate({"right":"-51px"}, 4500, "easeOutExpo", function(){
					viewFuncBtns();
				});
				$("#blurContent #char_5 .page").animate({"right":"25px"}, 5000, "easeOutExpo");
				break;
			case "6" :
				//$("#blurContent").animate({"left":"-0.1%"}, 1000, "easeOutExpo");
				$("#blurContent #char_6").css({"visibility":"visible"});
				$(".charHolder").animate({"left":initCharWrapWidth*5}, 100);
				$("#blurContent #char_6 .desc").animate({"left":"80px"}, 3000, "easeOutExpo");
				$("#blurContent #char_6 .charImg").animate({"right":"52px"}, 4500, "easeOutExpo", function(){
					viewFuncBtns();
				});
				$("#blurContent #char_6 .page").animate({"right":"25px"}, 5000, "easeOutExpo");			
				break;
		}
	};
	var viewMapContent = function(num){
		if (base.isRaiseWheelEvent == true) {
			return false;
		}
		base.isRaiseWheelEvent = true;
		$("#blurContent #char_"+num).css({"visibility":"visible"});
		$(".charHolder").animate({"left":initCharWrapWidth*(num-1)}, 2300);
		$("#blurContent #char_"+num+" .desc").animate({"left":"80px"}, 3000, "easeOutExpo");
		$("#blurContent #char_"+num+" .page").animate({"right":"25px"}, 4300, "easeOutExpo");
		switch(num){
			case 1: $("#blurContent #char_"+num+" .charImg").animate({"right":"0"}, 4000, "easeOutExpo"); break;
			case 2: $("#blurContent #char_"+num+" .charImg").animate({"right":"46px"}, 4000, "easeOutExpo"); break;
			case 3: $("#blurContent #char_"+num+" .charImg").animate({"right":"-59px"}, 4000, "easeOutExpo"); break;
			case 4: $("#blurContent #char_"+num+" .charImg").animate({"right":"-181px"}, 4000, "easeOutExpo"); break;
			case 5: $("#blurContent #char_"+num+" .charImg").animate({"right":"-51px"}, 4000, "easeOutExpo"); break;
			case 6: $("#blurContent #char_"+num+" .charImg").animate({"right":"52px"}, 4000, "easeOutExpo"); break;
		}
		base.isRaiseWheelEvent = false;
	};
	var backBlurContent = function(){
		$("#blurContent").css("left","100%");
	};
	var clsCharLayer = function(){
		$("#blurContent .charWrap .page").animate({"right":"-100%"}, 1000, "easeInExpo");
		$("#blurContent .charWrap .charImg").animate({"right":"-100%"}, 1500, "easeInExpo");
		$("#blurContent .charWrap .desc").animate({"left":"120%"}, 1750, "easeInExpo");
		$("#blurContent").animate({"left":"100%"}, 2000, "easeInExpo", function(){
			base.charClsBtn.css({"opacity":"0"});
			base.charNavBtns.css({"opacity":"0"});
			$(".charHolder").css({"left":"0"});
			$("#blurContent .charWrap").css({"visibility":"hidden"});
		});
	};
	var viewFuncBtns = function(){
		base.charClsBtn.animate({"opacity":"1"}, 1000);
		base.charNavBtns.animate({"opacity":"1"}, 1500);
	};
	var charMovBtns = function(id, currentChar){
		/*switch(id){
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
		}*/
	};
	/*var charMoveLeft = function(num, current){
		$("#blurContent #char_"+current+" .page").animate({"left":"-100%"}, 1500, "easeInExpo");
		$("#blurContent #char_"+current+" .charImg").animate({"left":"-100%"}, 1800, "easeInExpo");
		$("#blurContent #char_"+current+" .desc").animate({"left":"-150%"}, 2000, "easeInExpo", function(){
			$("#blurContent #char_"+num).css({"visibility":"visible"});
			$(".charHolder").animate({"left":initCharWrapWidth*(num-1)}, 1300);
			$("#blurContent #char_"+num+" .desc").animate({"left":"80px"}, 3000, "easeOutExpo");
			$("#blurContent #char_"+num+" .charImg").animate({"right":"0"}, 4000, "easeOutExpo", function(){
				viewFuncBtns();
			});
			$("#blurContent #char_"+num+" .page").animate({"right":"25px"}, 4300, "easeOutExpo");
			$("#blurContent #char_"+current).css({"visibility":"hidden"});
		});
	};
	var charMoveRight = function(num, current){
		$("#blurContent #char_"+current+" .page").animate({"right":"-100%"}, 1500, "easeInExpo");
		$("#blurContent #char_"+current+" .charImg").animate({"right":"-100%"}, 1800, "easeInExpo");
		$("#blurContent #char_"+current+" .desc").animate({"left":"150%"}, 2000, "easeInExpo", function(){
			$("#blurContent #char_"+num).css({"visibility":"visible"});
			$(".charHolder").animate({"left":initCharWrapWidth*(num+1)}, 1300);
			$("#blurContent #char_"+num+" .desc").animate({"left":"80px"}, 3000, "easeOutExpo");
			$("#blurContent #char_"+num+" .charImg").animate({"right":"0"}, 4000, "easeOutExpo", function(){
				viewFuncBtns();
			});
			$("#blurContent #char_"+num+" .page").animate({"right":"25px"}, 4300, "easeOutExpo");
			$("#blurContent #char_"+current).css({"visibility":"hidden"});
		});
	};*/
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
		viewMapContent : viewMapContent,
		charMovBtns : charMovBtns,
		//charMoveRight : charMoveRight,
		//charMoveLeft : charMoveLeft,
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