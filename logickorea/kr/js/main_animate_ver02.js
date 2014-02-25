$(window).load(function(){
    /*IE7 이하인 경우*/
    var isIe7 = $(".lt-ie8").length;
    
    var Option = {
        startPage : 0,
        speed : 300,
        time : 5000
    }

    $("body").css("background", "none");
    $("#wrapper").wrap("<div id='animate_box' />").css({
        "background" : "none"
    });

    var animateObject = "<div class='top_bg'></div>";
    animateObject += "<ul class='animate_img_list'>";
    animateObject += "<li class='animate_img01'>";
    animateObject += "<div class='obj01'></div>";
    animateObject += "</li>";
    animateObject += "<li class='animate_img02'>";
    animateObject += "<div class='obj01'></div>";
    animateObject += "<div class='obj02'></div>";
    animateObject += "<div class='obj03'></div>";
    animateObject += "<div class='obj04'></div>";
    animateObject += "</li>";
    animateObject += "<li class='animate_img03'>";
    animateObject += "<div class='obj_group01'>";
    animateObject += "<div class='obj02'></div>";
    animateObject += "<div class='obj01'></div>";
    animateObject += "</div>";
    animateObject += "<div class='obj_group02'>";
    animateObject += "<div class='obj01'></div>";
    animateObject += "<div class='obj02'></div>";
    animateObject += "</div>";
    animateObject += "</li>";
    animateObject += "<li class='animate_img04'>";
    animateObject += "<div class='obj01'></div>";
    animateObject += "<div class='obj02'></div>";
    animateObject += "<div class='obj03'></div>";
    animateObject += "</li>";
    animateObject += "</ul>";
    animateObject += "<ul class='controller'>";
    animateObject += "<li><img src='./img/main_animate_controll_off.gif' alt='off' title='off' /></li>";
    animateObject += "<li><img src='./img/main_animate_controll_off.gif' alt='off' title='off' /></li>";
    animateObject += "<li><img src='./img/main_animate_controll_off.gif' alt='off' title='off' /></li>";
    animateObject += "<li><img src='./img/main_animate_controll_off.gif' alt='off' title='off' /></li>";
    animateObject += "</ul>";
    animateObject += "<ul class='btn_palay_pause'>";
    animateObject += "<li class='btn_play'><img src='./img/btn_play.png' alt='play' title='play' /></li>";
    animateObject += "<li class='btn_pause'><img src='./img/btn_pause.png' alt='pause' title='pause' /></li>";
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
            if(isIe7) doc.scrollTop[i] -= (i*2)
        };
        /*resize시 상단 높이 재 설정*/
        if (animeNum) {
            animateImg(animeNum, false);
        }
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

    /*palay_pause*/
    var isPlayCtrl = true;
    $(".btn_palay_pause>.btn_play").click(function() {
        isPlayCtrl = true;
        addMotion();
        return false;
    });
    $(".btn_palay_pause>.btn_pause").click(function() {
        isPlayCtrl = false;
        removeMotion();
        return false;
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

        if (is3DepthIn) {
            $(".threeDepth").hide();
            if (is3Depth) {
                $(this).parent().parent().children().eq(1).show();
            }
            if ((thisIndex == 1) && (thisParentIndex == 0)) {
                $("nav>ul>li").eq(thisParentIndex).children().eq(1).children().eq(1).height(twoDepthHeightMax);
            } else {
                $("nav>ul>li").eq(thisParentIndex).children().eq(1).children().eq(1).height(twoDepthHeightMin);
            }
        }
    }, function() {
        var img = $(this);
        swapImg(img, "_on", "_off");
    });

    /*setInterval*/
    $("nav,.controller,.btn_palay_pause").hover(function() {
        isPlay = false;
        return false;
    }, function() {
        if (isPlayCtrl)
            isPlay = true;
        return false;
    });

    var isPlay = true;
    var intervalFn = function() {
        if (!isPlay)
            return;
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

    /*추가 모션*/
    function Moving(obj, speed, revers) {
        if (!isPlayCtrl)
            return;
        if (!revers) {
            obj.animate({
                marginTop : "20px"
            }, speed, "", function() {
                $(this).animate({
                    marginTop : "0px"
                }, speed, "", function() {
                    Moving(obj, speed, revers);
                    return;
                });
            });
        } else {
            obj.animate({
                marginTop : "0px"
            }, speed, "", function() {
                $(this).animate({
                    marginTop : "20px"
                }, speed, "", function() {
                    Moving(obj, speed, revers);
                    return;
                });
            });
        }
    }
    
    //번개 모양 상하 흔들림
    function MovingLeft(obj, speed, revers) {
        if (!isPlayCtrl)
            return;
        if (!revers) {
            obj.animate({
                marginLeft : "20px"
            }, speed, "", function() {
                $(this).animate({
                    marginLeft : "0px"
                }, speed, "", function() {
                    MovingLeft(obj, speed, revers);
                    return;
                });
            });
        } else {
            obj.animate({
                marginLeft : "0px"
            }, speed, "", function() {
                $(this).animate({
                    marginLeft : "20px"
                }, speed, "", function() {
                    MovingLeft(obj, speed, revers);
                    return;
                });
            });
        }
    }

    function addMotion() {
        Moving($(".animate_img01>.obj01"), 1200, false);
        Moving($(".animate_img02>.obj01"), 1200, true);
        Moving($(".animate_img02>.obj02"), 1400, false);
        Moving($(".animate_img02>.obj03"), 1600, true);
        Moving($(".animate_img03>.obj_group01"), 1200, false);
        MovingLeft($(".animate_img03>.obj_group01>.obj01"), 300, false);
        MovingLeft($(".animate_img03>.obj_group02>.obj02"), 300, true);
        Moving($(".animate_img03>.obj_group02"), 1400, true);
        Moving($(".animate_img04>.obj01"), 1200, true);
        Moving($(".animate_img04>.obj02"), 1400, false);
        Moving($(".animate_img04>.obj03"), 1600, true);
    }
    
    function removeMotion(){
        $(".animate_img01>.obj01").stop();
        $(".animate_img02>.obj01").stop();
        $(".animate_img02>.obj02").stop();
        $(".animate_img02>.obj03").stop();
        $(".animate_img03>.obj_group01").stop();
        $(".animate_img03>.obj_group01>.obj01").stop();
        $(".animate_img03>.obj_group02>.obj02").stop();
        $(".animate_img03>.obj_group02").stop();
        $(".animate_img04>.obj01").stop();
        $(".animate_img04>.obj02").stop();
        $(".animate_img04>.obj03").stop();
    }

    addMotion();
});
