$(function(){
	/*nav*/
	var activeIndex = $("nav>ul>li[class*=active]").index();		
	var activeIndex2 = $(".left_nav>ul>li[class*=active]").index();
	var activeIndex3 = $(".left_nav>ul>.active>ul>li[class*=active]").index();
	
	if(activeIndex != "-1"){
		$("nav>ul>li").eq(activeIndex).children().eq(0).css({
			"color":"#ff7800",
			"text-decoration":"none"
		});
	};

	$(".left_nav>ul>li").eq(activeIndex2).children().eq(0).css({
		"background-image":"url('../img/sub/lnb_on.gif')",
		"text-decoration":"none"
	});

	$(".left_nav>ul>.active>ul>li").eq(activeIndex3).children().eq(0).css({
		"color":"#ff7800",
		"text-decoration":"underline"
	});
	
	$("nav>ul>li").hover(function(){
		var thisIndex = $(this).index();
		$("nav>ul>li").removeClass("active");
		$("nav>ul>li").eq(thisIndex).addClass("active");
	},function(){
		$("nav>ul>li").removeClass("active");		
		if(activeIndex != "-1"){
			$("nav>ul>li").eq(activeIndex).addClass("active");
		}
	});

	/*Depth2. 위치*/
	var navLength = $("header nav li").length;
	var navLength2 = $("header nav li ul li").length;
	var navWidth = $("header>section>nav>ul").width();
	var sampleNavHeight = 74;	//depth2. nav height
	var rightPadding = 40;		//depth2. right margin width
	var liWidth2 = 0;			//depth2. 총합 기본 값
	
	for(i=0; i<(navLength-navLength2); i++){
		var subNavLength = $("header nav ul li ul").eq(i).children().length;
		var subNavWidth = $("header nav ul li ul").eq(i).width();
		var subNavHeight = $("header nav ul li ul").eq(i).height();
		
		$("header nav ul li ul").eq(i).children().css({"padding-right":rightPadding});
		
		var liWidth = $("header nav ul li ul").eq(i).parent().width();
		
		liWidth2 += liWidth;
			
		if(subNavLength == "1"){			
			$("header nav ul li ul").eq(i).css({"margin-left":-((subNavWidth-liWidth)/3)});			
		}else if(subNavHeight>sampleNavHeight){									
			$("header nav ul li ul").eq(i).css({"margin-left":-(subNavWidth + ((rightPadding*subNavLength)/2))});
		}else{
			$("header nav ul li ul").eq(i).css({"margin-left":-(subNavWidth -(rightPadding*subNavLength)/2)});
		}	
	};
	
	var totalWidth = liWidth2 + ((navLength-navLength2)*rightPadding);
	var lastLiWidth = $("header nav ul li ul").filter(":last").width();
	var lastLiWidth2 = subNavLength * rightPadding;

	$("header nav ul li ul").eq(0).css("margin-left","0px");
	$("header nav ul li ul").filter(":last").css({
		"right":"0px",
		"margin-right":(976-totalWidth)+"px",
		"margin-left":"0px"
	});


	/*bg*/
	var loginPage = $("div[class*=login_box]").index();
	var pwPage = $("div[class*=pw_box]").index();
	if(loginPage == 1){
		$("body").removeClass("pw");
		$("body").addClass("login");
	}else if(pwPage == 1){
		$("body").removeClass("login");
		$("body").addClass("pw");
	}else{
		$("body").removeClass("login");
		$("body").removeClass("pw");
	};	
	
	/*readonly css*/
	$(".contents tr:last").css("border-bottom","1px solid #e6e5e5");
	$(".contents td[class*=nono]").children().attr("readonly","true");
	$(".contents td[class*=nono]").children().removeClass("datepicker");
	$(".contents td[class*=nono] option").not(":selected").attr("disabled","disabled");
	$(".contents td[class*=nono] select").css({
		"color":"#9c9c9c",
		"background":"#f4efeb"
	})
		
		
	/*datepicker*/
	$(".datepicker").datepicker({
		changeMonth: true, // 월을 바꿀수 있는 셀렉트 박스를 표시한다.
		changeYear: true, // 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
		minDate: '-100y', // 현재날짜로부터 100년이전까지 년을 표시한다.
		nextText: '다음 달', // next 아이콘의 툴팁.
		prevText: '이전 달', // prev 아이콘의 툴팁.
		numberOfMonths: [1,1], // 한번에 얼마나 많은 월을 표시할것인가. [2,3] 일 경우, 2(행) x 3(열) = 6개의 월을 표시한다.
		stepMonths: 3, // next, prev 버튼을 클릭했을때 얼마나 많은 월을 이동하여 표시하는가. 
		yearRange: 'c-100:c+10', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.
		showButtonPanel: true, // 캘린더 하단에 버튼 패널을 표시한다. 
		currentText: '오늘 날짜' , // 오늘 날짜로 이동하는 버튼 패널
		closeText: '닫기',  // 닫기 버튼 패널
		dateFormat: "yy-mm-dd", // 텍스트 필드에 입력되는 날짜 형식.
		showAnim: "slide", //애니메이션을 적용한다.
		showMonthAfterYear: true , // 월, 년순의 셀렉트 박스를 년,월 순으로 바꿔준다. 
		dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'], // 요일의 한글 형식.
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] // 월의 한글 형식.
	 });
	 $('.ui-datepicker ').css({ "margin-left" : "147px", "margin-top": "-25px"});
	 	
});
