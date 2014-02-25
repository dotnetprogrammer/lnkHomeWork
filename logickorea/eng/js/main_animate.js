$(function() {
    var Option = {
        startPage : 0,
        speed : 300,
        time : 7000
    }

    $("body").css("background", "none");
    $("#wrapper").wrap("<div id='animate_box' />").css({
        "background" : "none"
    });

    var animateObject = "<div class='top_bg'></div>";
    animateObject += "<ul class='animate_img_list'>";
    animateObject += "<li class='animate_img01'></li>";
    animateObject += "<li class='animate_img02'></li>";
    animateObject += "<li class='animate_img03'></li>";
    animateObject += "<li class='animate_img04'></li>";
    animateObject += "</ul>";
    animateObject += "<ul class='controller'>";
    animateObject += "<li><img src='./img/main_animate_controll_off.gif' alt='' /></li>";
    animateObject += "<li><img src='./img/main_animate_controll_off.gif' alt='' /></li>";
    animateObject += "<li><img src='./img/main_animate_controll_off.gif' alt='' /></li>";
    animateObject += "<li><img src='./img/main_animate_controll_off.gif' alt='' /></li>";
    animateObject += "</ul>";

    $("#animate_box").append(animateObject);

    /*객체 정보 얻기*/
    var doc = {
        width : $(window).width(),
        height : parseInt($(window).height()) - parseInt($(".top_bg").height()),
        topBgHeight : parseInt($(".top_bg").height()),
        imgListHeight : parseInt($("#animate_box").height()),
        scrollTop : []
    }
    
    var twoDepthHeightMin = "15px";
    var twoDepthHeightMax = "42px";

    /*리사이즈시 객체 정보 수정*/
    var imgLength = $(".controller>li").length;

    $(window).resize(function() {
        doc.width = $(window).width();
        doc.height = parseInt($(window).height()) - doc.topBgHeight;

        doc.imgListHeight = $(".animate_img_list").height();
        if (doc.imgListHeight < doc.height) {
            $("#animate_box").height(doc.height + doc.topBgHeight);
            $(".animate_img_list").height(doc.height);
            $(".animate_img_list>li").height(doc.height);

            doc.imgListHeight = doc.height;
        };

        for ( i = 0; i < imgLength; i++) {
            doc.scrollTop[i] = doc.topBgHeight - (i * doc.imgListHeight);
        };
    }).resize();

    /*setNav*/
    function setNav(index) {
        for ( i = 0; i < imgLength; i++) {
            $("nav>ul>li").eq(i).removeAttr("class");
            var navImg = $("nav>ul>li").eq(i).children().eq(0).children();
            swapImg(navImg, "_on", "_off");
        };
        $("nav>ul>li").eq(index).addClass("nav0" + (index + 1) + "_on");
        var navActiveImg = $("nav>ul>li").eq(index).children().eq(0).children();
        swapImg(navActiveImg, "_off", "_on");

        var subImg = $("nav>ul>li").eq(index).children().eq(1).children().eq(0).children().children();
        swapImg(subImg, "_off", "_on");
        
        $(".threeDepth").hide();
        $("nav>ul>li").eq(0).children().eq(1).children().eq(1).height(twoDepthHeightMin);
    }

    /*애니메이션*/
    var animeNum = Option.startPage;

    function animateImg(index, isAnime) {
        animeNum = index;

        var speed = 0;
        if (isAnime) {
            speed = Option.speed;
        }
        $("#animate_box>.animate_img_list").stop(true, true).animate({
            "top" : doc.scrollTop[index]
        }, isAnime);

        for ( i = 0; i < imgLength; i++) {
            var img = $(".controller>li>img").eq(i);
            swapImg(img, "_on", "_off");
        };

        var activeImg = $(".controller>li>img").eq(index);
        swapImg(activeImg, "_off", "_on");

        setNav(index);
    };

    /*컨트롤러*/
    $(".controller>li").click(function() {
        var index = $(this).index();
        animateImg(index, true);
        return false;
    });

    $(".controller>li>img").hover(function() {
        if ($(this).parent().index() == animeNum)
            return;
        var img = $(this);
        swapImg(img, "_off", "_on");
    }, function() {
        if ($(this).parent().index() == animeNum)
            return;
        var img = $(this);
        swapImg(img, "_on", "_off");
    });

    /*왼쪽메뉴*/
    $("nav>ul>li").hover(function() {
        var index = $(this).index();
        setNav(index);
    }, function() {
        setNav(animeNum);
    });

    //2차메뉴 On/Off
    $("nav>ul>li>ul>li>a>img").hover(function() {
        var firstImg = $(this).parent().parent().parent().children().eq(0).children().children();
        swapImg(firstImg, "_on", "_off");

        var img = $(this);
        swapImg(img, "_off", "_on");
        
        var is3DepthIn = $(".threeDepth").length;
        var is3Depth = $(this).parent().parent().children().eq(1).length;
        var thisIndex = $(this).parent().parent().index();
        var thisParentIndex = $(this).parent().parent().parent().parent().index();
        
        if(is3DepthIn){
            $(".threeDepth").hide();
            if(is3Depth){
                $(this).parent().parent().children().eq(1).show();
            }
            if((thisIndex == 1) &&  (thisParentIndex == 0)){
                $("nav>ul>li").eq(thisParentIndex).children().eq(1).children().eq(1).height(twoDepthHeightMax);
            }else{
                $("nav>ul>li").eq(thisParentIndex).children().eq(1).children().eq(1).height(twoDepthHeightMin);
            }
        }
    }, function() {
        var img = $(this);
        swapImg(img, "_on", "_off");
    });

    /*setInterval*/
    $("nav,.controller").hover(function() {
        clearInterval(interval);
    }, function() {
        interval = setInterval(intervalFn, Option.time);
    });

    var intervalFn = function() {
        animeNum++;
        if (animeNum < imgLength) {
            animateImg(animeNum, true);
        } else {
            animateImg(0, true);
        }
    }
    var interval = setInterval(intervalFn, Option.time);

    /*시작*/
    animateImg(Option.startPage, false);
    for ( i = 0; i < imgLength; i++) {
        var navSubActiveImg = $("nav>ul>li").eq(i).children().eq(1).children().eq(0).children().children();
        swapImg(navSubActiveImg, "_off", "_on");
    };

    $("body").mousedown(function() {
        return false;
    });
});
