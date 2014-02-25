$(function(){
    /*시작 페이지 설정*/
    var Option = {
        startNum:0,
        time:3000
    }
    
    /*팝업데이타 작성*/
    var popData = [];
    
    popData[0] = {
        title:"shooting RPG 거울전쟁 신성부활",
        text:"불사의 부대 악령군을 일으킨 카라드 하트세어와 그의 충직한 하인 사울리안. 저주 받은 피를 물려받은 고독한 대마술사 쿨구레루 데스모네. 은의 여인 벨리프 쇼링을 중심으로 뭉친 해방부대. 3개의 세력으로 나뉘어 전란이 끊이지 않는 거울전쟁 시리즈의 최신작.",
        url:"http://www.mirrorwar.co.kr"
    }
    
    popData[1] = {
        title:"MMORPG 붉은보석",
        text:"'붉은 보석'은 2003년 5월 서비스를 시작하여 현재까지 인기리에 서비스되고 있는 온라인 롤플레잉 게임으로, 특히 일본에서 선풍적인 반응을 일으키며 한국을 대표하는 온라인 게임으로 사랑받고 있습니다.",
        url:"http://www.redgem.co.kr"
    }
    
    popData[2] = {
        title:"MMOTPG 붉은보석 II 홍염의 모험가들",
        text:"2014년 공개 서비스를 목표로 개발중인 '붉은보석2'는 전작 '붉은보석'의 세계관을 잇는 FULL 3D MMORPG 입니다. 소유주에게 무한한 권능을 준다는 새롭고도 신비한 보석들에 대한 소문으로 들뜬 프란델 대륙, 게이머는 이 시대에 한 명의 모험가로 첫 발걸음을 내딛게 됩니다.",
        url:"#"
    }
    
    /*현제 페이지 변수*/
    var thisNum = Option.startNum;
    
    /*팝업 관련 오브젝트 생성*/
    var gameInfoAddList = "<li style='background:url(\"./img/game_info02_bg.jpg\") top left no-repeat;'><a href='#'><img src='./img/game_info02_title.gif' alt='MMORPG 붉은보석' title='MMORPG 붉은보석' /></a></li>";
    gameInfoAddList += "<li style='background:url(\"./img/game_info03_bg.jpg\") top left no-repeat;'><a href='#'><img src='./img/game_info03_title.gif' alt='MMORPG 붉은보석2' title='MMORPG 붉은보석2' /></a></li>";
    
    var gameInfoBtnText = "<ul class='game_info_btn'>";
    gameInfoBtnText += "<li class='btn_prev'><a href='#'><img src='./img/game_info_btn_prev.gif' alt='이전' title='이전' /></a></li>";
    gameInfoBtnText += "<li class='btn_next'><a href='#'><img src='./img/game_info_btn_next.gif' alt='다음' title='다음' /></a></li>";
    gameInfoBtnText += "<li class='btn_open'><a href='#'><img src='./img/game_info_btn_open.gif' alt='Open' title='Open' /></a></li>";
    gameInfoBtnText += "</ul>";
    
    var gameInfoPop = "<article class='game_info_pop'>";
    gameInfoPop += "<h2><img src='./img/game_info_pop0" + (Option.startNum + 1) + "_title.jpg' alt='" + popData[Option.startNum].title + "' title='" + popData[Option.startNum].title + "' /></h2>";
    gameInfoPop += "<p><img src='./img/game_info_pop0" + (Option.startNum + 1) + "_txt.jpg' alt='" + popData[Option.startNum].text + "' title='" + popData[Option.startNum].text + "' /></p>";
    gameInfoPop += "<a href='" + popData[Option.startNum].url + "' class='btn_go_site' target='_blank'><img src='./img/game_info_pop_btn_go_site.png' alt='사이트 바로가기' title='사이트 바로가기' /></a>";
    gameInfoPop += "<ul>";
    gameInfoPop += "<li class='btn_prev'><a href='#'><img src='./img/game_info_pop_btn_prev.png' alt='이전' title='이전' /></a></li>";
    gameInfoPop += "<li><a href='#'><img src='./img/game_info_pop_btn_game01_on.jpg' alt='거울전쟁' title='거울전쟁' /></a></li>";
    gameInfoPop += "<li><a href='#'><img src='./img/game_info_pop_btn_game02_off.jpg' alt='붉은보석' title='붉은보석' /></a></li>";
    gameInfoPop += "<li class='last'><a href='#'><img src='./img/game_info_pop_btn_game03_off.jpg' alt='붉은보석2' title='붉은보석2' /></a></li>";
    gameInfoPop += "<li class='btn_next'><a href='#'><img src='./img/game_info_pop_btn_next.png' alt='다음' title='다음' /></a></li>";
    gameInfoPop += "</ul>";
    gameInfoPop += "<a href='#' class='btn_close'><img src='./img/game_info_pop_btn_close.png' alt='close' title='close' /></a>";
    gameInfoPop += "</article>";
    
    $(".game_info>ul").append(gameInfoAddList);
    $(".game_info>ul>li").hide().eq(Option.startNum).show();
    $(".game_info").append(gameInfoBtnText);
    $("body").prepend(gameInfoPop);
    
    /*팝업 갯수*/
    var infoNum = $(".game_info>ul").first().children().length;
    /*Top img 교체 함수*/
    function setGameInfoTop(num){
        $(".game_info>ul:eq(0)>li").hide().eq(num).show();
    }
    
    /*TOP 이전-다음 버튼 클릭*/
    $(".game_info_btn>.btn_prev").click(function(){
        thisNum--;
        if(thisNum >= 0){
            setGameInfoTop(thisNum);
        }else{
            setGameInfoTop(infoNum-1);
            thisNum = infoNum-1;
        }
        return false;
    });
    
    $(".game_info_btn>.btn_next").click(function(){
        thisNum++;
        if(thisNum < infoNum){
             setGameInfoTop(thisNum);
        }else{
            setGameInfoTop(0);
            thisNum = 0;
        }
        return false;
    });
    
    /*팝업객체 셋팅*/
    function setGameInfoPop(num){
        $(".game_info_pop").css("background","#000 url(./img/game_info_pop0" + (num + 1) + "_bg.jpg) top center no-repeat");
        $(".game_info_pop>h2>img")
            .attr("src","./img/game_info_pop0" + (num + 1) + "_title.jpg")
            .attr("alt",popData[num].title)
            .attr("title",popData[num].title);
            
        $(".game_info_pop>p>img")
            .attr("src","./img/game_info_pop0" + (num + 1) + "_txt.jpg")
            .attr("alt",popData[num].text)
            .attr("title",popData[num].text);
            
        $(".game_info_pop>.btn_go_site").attr("href",popData[num].url);
        
        for(i=1;i<infoNum+1;i++){
            var img = $(".game_info_pop>ul>li>a>img").eq(i);
            swapImg(img,"_on","_off");
        }
        
        var activeImg = $(".game_info_pop>ul>li>a>img").eq(num + 1);
        swapImg(activeImg,"_off","_on");
    }
    
    /*TOP OPEN버튼 클릭*/
    var isPopOpen = false;
   
    $(".game_info>ul:eq(0)>li>a,.btn_open").click(function(){
        isPopOpen = true;
        setGameInfoPop(thisNum);
        $(".game_info_pop").show();
        $("#animate_box").hide();
        return false;
    });
    
    /*팝업 이전-다음 버튼 클릭*/
    $(".game_info_pop>ul>.btn_prev").click(function(){
        thisNum--;
        if(thisNum >= 0){
            setGameInfoPop(thisNum);
        }else{
            setGameInfoPop(infoNum - 1);
            thisNum = infoNum-1;
        }
        return false;
    });
    
    $(".game_info_pop>ul>.btn_next").click(function(){
        thisNum++;
        if(thisNum < infoNum){
            setGameInfoPop(thisNum);
        }else{
            setGameInfoPop(0);
            thisNum = 0;
        }
        return false;
    });
    
    $(".game_info_pop>ul>li").click(function(){
        var index = $(this).index();
        if(index <= 0 || index > infoNum) return false;
        if((index-1) == thisNum) return false;
        thisNum = index-1;
        setGameInfoPop(index-1);
        return false;
    });
    
    /*팝업 선택 이미지 on-off*/
    $(".game_info_pop>ul>li>a>img[src*='btn_game']").hover(function(){
        if($(this).parent().parent().index() == thisNum + 1) return;
        var img = $(this);
        swapImg(img,"_off","_on");
    },function(){
        if($(this).parent().parent().index() == thisNum + 1) return;
        var img = $(this);
        swapImg(img,"_on","_off");
    });
    
    /*팝업 닫기 버튼 클릭*/
    $(".game_info_pop>.btn_close").click(function(){
        isPopOpen = false
        interval = setInterval(intervalFn,Option.time);
        
        setGameInfoTop(thisNum);
        
        $(".game_info_pop").hide();
        $("#animate_box").show();
        
        return false;
    });
    
    /*애니메이션 함수*/
    
    var intervalFn = function(){
        thisNum++;
        if(thisNum < infoNum){
            setGameInfoTop(thisNum);
        }else{
            setGameInfoTop(0);
            thisNum = 0;
        }
        setGameInfoTop(thisNum);
    }
   
    var interval = setInterval(intervalFn,Option.time);
    
    
    /*마우스 오버 임시 멈춤*/
    $(".game_info").hover(function(){
        clearInterval(interval);
    },function(){
        if(!isPopOpen){
            interval = setInterval(intervalFn,Option.time);
        }
    });
});
