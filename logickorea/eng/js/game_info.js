$(function(){
    /*시작 페이지 설정*/
    var Option = {
        startNum:0,
        time:3000
    }
    
    /*팝업데이타 작성*/
    var popData = [];
    
    popData[0] = {
        title:"Shooting RPG Mirror War - Reincarnation of Holiness",
        text:"MIrror War depicts the epic conflict amongst the three factions. The demonic legions led by Carad Hartsare and his loyal servant Saulian. The cursed lone grand mage, Culgulheru Desmone. The liberation force unified under the banner of Lady Silver, Beliv Shoring. Their incessant struggle for power continues.",
        url:"http://www.mirrorwar.co.kr"
    }
    
    popData[1] = {
        title:"MMORPG REDSTONE",
        text:"Redstone is an amazing 2D fantasy styled MMORPG that entices the users by offering them much more than a compelling storyline. Since its launch in May 2003, ‘Redstone’ has continued its success in both Korea and Japan.",
        url:"http://www.redgem.co.kr"
    }
    
    popData[2] = {
        title:"MMORPG Red Stone 2 - Adventurers of Prominence",
        text:"Redstone 2 is the latest MMORPG that inherits the world and saga of Redstone. Enhanced with the all new 3D graphics engine, Redstone 2 is expected to launch in 2014. The adventure begins in the continent of Frandal where tales are spreading about the mysterious gems that would gift its holder with unlimited power. The players will embark on an awe-inspiring journey to seek the answers they need.",
        url:"#"
    }
    
    /*현제 페이지 변수*/
    var thisNum = Option.startNum;
    
    /*팝업 관련 오브젝트 생성*/
    var gameInfoAddList = "<li style='background:url(\"./img/game_info02_bg.jpg\") top left no-repeat;'><a href='#'><img src='./img/game_info02_title.gif' alt='Red Stone' title='Red Stone' /></a></li>";
    gameInfoAddList += "<li style='background:url(\"./img/game_info03_bg.jpg\") top left no-repeat;'><a href='#'><img src='./img/game_info03_title.gif' alt='Red Stone2' title='Red Stone2' /></a></li>";
    
    var gameInfoBtnText = "<ul class='game_info_btn'>";
    gameInfoBtnText += "<li class='btn_prev'><a href='#'><img src='./img/game_info_btn_prev.gif' alt='prev' title='prev' /></a></li>";
    gameInfoBtnText += "<li class='btn_next'><a href='#'><img src='./img/game_info_btn_next.gif' alt='next' title='next' /></a></li>";
    gameInfoBtnText += "<li class='btn_open'><a href='#'><img src='./img/game_info_btn_open.gif' alt='Open' title='Open' /></a></li>";
    gameInfoBtnText += "</ul>";
    
    var gameInfoPop = "<article class='game_info_pop'>";
    gameInfoPop += "<h2><img src='./img/game_info_pop0" + (Option.startNum + 1) + "_title.jpg' alt='" + popData[Option.startNum].title + "' title='" + popData[Option.startNum].title + "' /></h2>";
    gameInfoPop += "<p><img src='./img/game_info_pop0" + (Option.startNum + 1) + "_txt.jpg' alt='" + popData[Option.startNum].text + "' title='" + popData[Option.startNum].text + "' /></p>";
    gameInfoPop += "<a href='" + popData[Option.startNum].url + "' class='btn_go_site' target='_blank'><img src='./img/game_info_pop_btn_go_site.png' alt='Go to web site' title='Go to web site' /></a>";
    gameInfoPop += "<ul>";
    gameInfoPop += "<li class='btn_prev'><a href='#'><img src='./img/game_info_pop_btn_prev.png' alt='prev' title='prev' /></a></li>";
    gameInfoPop += "<li><a href='#'><img src='./img/game_info_pop_btn_game01_on.jpg' alt='Mirror War' title='Mirror War' /></a></li>";
    gameInfoPop += "<li><a href='#'><img src='./img/game_info_pop_btn_game02_off.jpg' alt='Red Stone' title='Red Stone' /></a></li>";
    gameInfoPop += "<li class='last'><a href='#'><img src='./img/game_info_pop_btn_game03_off.jpg' alt='Red Stone2' title='Red Stone2' /></a></li>";
    gameInfoPop += "<li class='btn_next'><a href='#'><img src='./img/game_info_pop_btn_next.png' alt='next' title='next' /></a></li>";
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
