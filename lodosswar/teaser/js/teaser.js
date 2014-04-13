//$(function(){
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
		defTxt2 : "메일을 쓰는 곳입니다."
	}
}());

var mEvent = (function(){
	base.blank.click(function(e){
		e.preventDefault();
	});
	base.notiBtn.click(function(){
		control.viewNotiBox();
	});
	$("body").on('mousewheel', function(event, delta) {		
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
		inputData = $(this).value();
		//var lableLength = $(".frmField label").length;
		var myParent = $(this).parent("label").index()+1;
		control.clearDefValue(myParent);
	});
	$("label input").blur(function(){
		var myParent = $(this).parent("label").attr("id");
	});
}());

var control = (function(){
	var initMove = function(){
		base.logo.animate({bottom:414}, 700, "easeOutCubic", function(){
			viewScrollBtn();
		});
	};
	var viewNotiBox = function(){
		var getLeft = base.notiPanel.css("left");
		if (getLeft == "-342px") {
			base.notiPanel.animate({left:0}, 500, "easeOutCubic");
		} else {
			base.notiPanel.animate({left:-342}, 500, "easeOutCubic");
		}
	};
	var maskLayerOpen = function(){
		base.maskLayer.animate({opacity:70}, 600, function(){
			base.maskLayer.css("z-index",99999);
		});
	};
	var maskLayerClose = function(){
		base.maskLayer.animate({opacity:0}, 600, function(){
			base.maskLayer.css("z-index",0);
		});
	};
	var viewScrollBtn = function(){
		base.scrollBtn.animate({opacity:1}, 1800);
		//console.log("callback ok");
	};
	var aclick = function(num, target) {
		contHeight = $(".box").height();
		cnt = num;
		base.section.animate({"top":(contHeight*cnt)*(-1)+"px"}, 700, function(){
			$("#nav li").removeClass("on");
			target.addClass("on");
		});
	var clearDefValue = function(idx){
		switch(idx){
			case 1:
			if(inputData == defTxt1){
				$(this).value();
			} else {
				return false;
			};
			case 2:
			if(inputData == defTxt2){
				$(this).value();
			} else {
				return false;
			};
		}
	};
	var setDefValue = function(id){
		
	};
	/*var warnBox = function(txt){
		maskLayerOpen();
	};*/
	};
	return {
		viewNotiBox : viewNotiBox,
		initMove : initMove,
		maskLayerOpen : maskLayerOpen,
		maskLayerClose : maskLayerClose,
		viewScrollBtn : viewScrollBtn,
		aclick : aclick,
		//setDefValue : setDefValue,
		clearDefValue : clearDefValue

	}
}());

var init = (function(){
	if(base.wWidth <= 1024){
		$("body").addClass("narrow");
	}
	$("section").css("height",base.wHeight);
	$(window).resize(function(){
		var wHeight = $(window).height();
		var wWidth = $(window).width();
		$("section").css("height",wHeight);
		if(wWidth <= 1024){
			$("body").addClass("narrow");
		} else {
			$("body").removeClass("narrow");
		}
	});
	base.notiPanel.css("left",-342);
	base.scrollBtn.css("opacity",0);
	control.initMove();
	control.maskLayerClose();
}());