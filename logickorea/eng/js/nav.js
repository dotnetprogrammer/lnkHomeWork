$(function(){
    /*현재 페이지 정보를 읽습니다.*/
    var isSub = $("h1>a>img[src*='sub']").length;
    var oneDepthNum  = $("nav>ul>li[class*='_on']").index();
    var oneDepthLength  = $("nav>ul>li").length;
    var twoDepthNum = $("nav>ul>li>ul>li>a>img[src*='_on']").parent().parent().index();
    var twoDepthLength  = $("nav>ul>li>ul>li").length;
    var threeDepthNum  = 1;
    pageNum && (threeDepthNum = pageNum);
    
    var twoDepthHeightMin = "15px";
    var twoDepthHeightMax = "42px";
    
    /*3depth*/
    //3depth를 추가 합니다.
    var threeDepthTitle = [];
    threeDepthTitle[0] = ["Vision", "Overview"];
    threeDepthTitle[1] = ["C.I Concept", "Basic System"];

    $("nav>ul>li:eq(0)>ul>li").eq(1).append("<ul class='threeDepth threeDepth01'><li><a href='#'>" + threeDepthTitle[0][0] + "</a></li><li><a href='#'>" + threeDepthTitle[0][1] + "</a></li></ul>");
    $("nav>ul>li:eq(0)>ul>li").eq(3).append("<ul class='threeDepth threeDepth02'><li><a href='#'>" + threeDepthTitle[1][0] + "</a></li><li><a href='#'>" + threeDepthTitle[1][1] + "</a></li></ul>");
    
    var threeDepthLength = $(".threeDepth>li>a").length;

    for ( i = 0; i < threeDepthLength; i++) {
        var thisIndex = $(".threeDepth>li").eq(i).index();
        var href = $(".threeDepth>li").eq(i).parent().prev().attr("href");
        $(".threeDepth>li>a").eq(i).attr("href", href + "?pageNum=" + (thisIndex + 1));
    }

    /*왼쪽메뉴*/
    function initMenu(isOne,isTwo,isThree){
        //1차메뉴를 초기화 합니다.
        if(isOne){
            $("nav>ul>li").removeAttr("class");
            for(i=0;i<oneDepthLength;i++){
                var img = $("nav>ul>li").eq(i).children().eq(0).children();
                swapImg(img,"_on","_off");
            }
        }
        if(isTwo){
            //2차 메뉴를 초기화 합니다.
            for(i=0;i<twoDepthLength;i++){
                var img = $("nav>ul>li>ul>li").eq(i).children().eq(0).children();
                swapImg(img,"_on","_off");
            }
        }
        if(isThree){
            $(".threeDepth").hide();
            $(".threeDepth>.active").removeClass("active");
        }
    }
    
    function setOneDepthMenu(num){
        initMenu(true,false,false);
        //num번째 1차메뉴를 활성화 합니다.
        if(num >=0 ){
            $("nav>ul>li").eq(num).addClass("nav0" + (num + 1) + "_on");
            var img = $("nav>ul>li").eq(num).children().eq(0).children();
            swapImg(img,"_off","_on");
        }
    };
    
    function setTwoDepthMenu(num1,num2){
        initMenu(false,true,true);
        //num2번째 2차메뉴를 활성화 합니다.
        var img = $("nav>ul>li").eq(num1).children().eq(1).children().eq(num2).children().eq(0).children();
        swapImg(img,"_off","_on");
        
        var is3Depth = $("nav>ul>li").eq(num1).children().eq(1).children().eq(num2).children().eq(1).length;
        if(is3Depth){
            setThreeDepthMenu(num1,num2,-1);
        }
    }
    
    function setThreeDepthMenu(num1,num2,num3){
        //num3 3차 메뉴를 활성화 합니다.
        if((num1 == 0) &&  (num2 == 1)){
            $("nav>ul>li").eq(num1).children().eq(1).children().eq(1).height(twoDepthHeightMax);
        }else{
            $("nav>ul>li").eq(num1).children().eq(1).children().eq(1).height(twoDepthHeightMin);
        }
        initMenu(false,false,true);
        $("nav>ul>li").eq(num1).children().eq(1).children().eq(num2).children().eq(1).show();
        if(num3 >= 0){
            $("nav>ul>li").eq(num1).children().eq(1).children().eq(num2).children().eq(1).children().eq(num3).addClass("active");
        }
    }
    
    if (isSub) {
    	//전체 메뉴
    	$("nav").hover(function(){
    		
    	},function(){
    		setOneDepthMenu(oneDepthNum);
            setTwoDepthMenu(oneDepthNum,twoDepthNum);
            setThreeDepthMenu(oneDepthNum,twoDepthNum,threeDepthNum-1);
    	});
    	
        //1차메뉴
        $("nav>ul>li").hover(function(){
            setOneDepthMenu($(this).index());
        },function(){
        	
        });
        
        //2차메뉴
        $("nav>ul>li>ul>li").hover(function(){
            setTwoDepthMenu($(this).parent().parent().index(),$(this).index());
        },function(){
            
        });
    };
    
    /*3차메뉴 컨텐츠*/
    var is3depth = $("#page_02").length;
    if (is3depth) {
        function set3depth(num) {
            $("#page_01").hide();
            $("#page_02").hide();

            //해당 컨텐츠 오픈
            $("#page_0" + num).show();
            $("#page_0" + num).find("h4").hide();

            //타이틀 변경
            var src = $("#con_right>h3>img").attr("src");
            var srcLenght = src.length;
            var srcKey = src.indexOf('title0');
            var subNum = src.substring(srcKey + 6, srcKey + 7);

            $("#con_right>h3>img").attr("src", "./img/sub_title0" + subNum + "_0" + num + ".gif");

            //현재 위치 변경
            var threeDepthTitleNum;
            if (subNum == 2)
                threeDepthTitleNum = 0;
            if (subNum == 4)
                threeDepthTitleNum = 1;

            var subWhere = $(".current>strong").text();
            $(".current>strong").before("<a href='" + noParamUrl + "?pageNum=1'>" + subWhere + "</a> &#62 ").html(threeDepthTitle[threeDepthTitleNum][num - 1]);

            //3차 메뉴 활성화
            setThreeDepthMenu(oneDepthNum,twoDepthNum,threeDepthNum-1);
        }
        
        set3depth(threeDepthNum);
    }
    $("#con_left > nav > ul > li:nth-child(2) li:nth-child(10)").addClass("m_not");
});