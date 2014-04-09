$(function(){
	//var tl = new TimelineMax();
	//tl.from($("#motion1"), 1, {delay:4, autoAlpha:0});
	//tl.from($("#motion2"), 1, {delay:1, autoAlpha:0});
	//tl.to([$("#motion1"),$("#motion2")], 1, {delay:3, autoAlpha:0});

	var $menu = $('.menu'),
		$detail = $('.detail'),
		$header = $('.header'),
		$box = $('.box'),
		$section = $('.section'),
		$container = $('.container');

	var contHeight = $box.height(),
		detailLeft = $(".detail").offset().left,
		menuWidth = $(".menu").width(),
		boxNum = $(".box").length;
		cnt = 0,
		moveStatus = false,
		menuState = false;


	init();
	videoWrapper();

	$("#wrap").on('mousewheel', function(event, delta) {
		if(menuState == false){
			if(moveStatus == false){
				if(delta < 0){
					if(cnt < boxNum-1){
						cnt++;
					}
				}else{
					if(cnt > 0){
						cnt--;
					}
				}
				target = $("#controller").find("li:eq("+cnt+") a");
				aclick(cnt,target);
			}
		}
	});
	
	$('#scrollBtn').bind('click', function(){
        if(cnt < boxNum-1){
            cnt++;
            target = $("#controller").find("li:eq("+cnt+") a");
            aclick(cnt,target);
        }
	});


	$("#controller").find("li").each(function(index){
		$(this).find("a").click(function(e){
			e.preventDefault();
			aclick(index,$(this));
		});
	});

	/*$('#scrollBtn').click(function(e){
		e.preventDefault();
		aclick(1,$("#controller").find("li:eq(1) a"));
	});
*/
	$(window).resize(function(){
		init();
		videoWrapper();
	});

	$('#mainListBtn').on('click',function(){
		if(menuState == false){
			menuOn();
		}else{
			menuOff();			
		}
	});

	$('#menuClose').click(menuOff);

	function init(){
		if(menuState == true){
			menuOff();
		}
		$box.css("height",$(window).height());
		contHeight = $box.height();
		detailLeft = $(".detail").offset().left;
		$section.css("top",(contHeight*cnt)*(-1)+"px");
        $("#description").css({"height":($(window).height()-$('.menutop').outerHeight()-$('.menubottom').outerHeight()-40)+"px"});
		if($(window).height() < 765){
            $(".detail_sub").addClass('short');
            $(".maincont").addClass('short');
		}else{
            $(".detail_sub").removeClass('short');
            $(".maincont").removeClass('short');
		}
	}
	
	$(".toplogo").fadeOut(0);
	function aclick(num,target){
		moveStatus = true;
		cnt = num;
		target.parent().addClass("on").siblings().removeClass("on");
		$section.animate({"top":(contHeight*cnt)*(-1)+"px"},"normal",function(){
			moveStatus = false;
			if(num==0){
				$(".toplogo").fadeOut(200);
				$("#scrollBtn").find("img").attr("src","images/main/btn_scroll.png");
			}else{
			    if(num==boxNum-1){
			        $("#scrollBtn").fadeOut(200);
			    }else{
			        $("#scrollBtn").fadeIn(200);
			    }
				$(".toplogo").fadeIn(200);
				$("#scrollBtn").find("img").attr("src","images/main/btn_scroll2.gif");
			}
		});
	}

	function videoWrapper() {
		if( $(window).width() / $(window).height() > 1.6 ){
			$('#example_video_1').css('height', $(window).width() / 1.6 + 'px');
			$('#example_video_1_html5_api').css('height', $(window).width() / 1.6 + 'px');
			$('#example_video_1_flash_api').css('height', $(window).width() / 1.6 + 'px');
		}else{
			$('#example_video_1_html5_api').css('height', '100%');
			$('#example_video_1_flash_api').css('height', '100%');
		}
	}

	function menuOn(){
		menuState = true;
		$menu.stop().animate({'margin-left' : 0}, 350);
		$detail.stop().animate({left : 0, 'margin-left' : detailLeft + 'px'}, 350);
		$header.stop().animate({left : menuWidth}, 350);
		$container.addClass('overFlow');
	}

	function menuOff(){
		menuState = false;
		$menu.stop().animate({'margin-left' : -menuWidth + 'px'}, 350, function(){
			$container.removeClass('overFlow');
		});
		$header.stop().animate({left : 0}, 350);
		$detail.stop().animate({left : 50+'%', 'margin' : '0 -525'+'px'}, 350);
	}

	//scroll
	$('#description').perfectScrollbar({
		wheelSpeed: 20,
		wheelPropagation: false
    });
});