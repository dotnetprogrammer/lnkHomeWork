$(function(){
    $("body").append("<div class='hidden_layer'><div class='pop'><h4>만든 사람들</h4><ul></ul></div></div>");

    var staffData = "%3Cli%20c%3E";
    staffData += "UX%20Design";
    staffData += "%3C/li%3E";
    staffData += "%3Cli%20c%3E";
    staffData += "%EC%96%91%EC%A2%85%EC%8B%9D";
    staffData += "%3C/li%3E";
    staffData += "%3Cli%20c%3E";
    staffData += "Visual%20Design";
    staffData += "%3C/li%3E";
    staffData += "%3Cli%20c%3E";
    staffData += "%EC%9C%A4%EB%AF%BC%EA%B8%B0,%EC%9D%B4%EC%9D%80%EA%B2%BD";
    staffData += "%3C/li%3E";
    staffData += "%3Cli%20c%3E";
    staffData += "UI%20Development";
    staffData += "%3C/li%3E";
    staffData += "%3Cli%20c%3E";
    staffData += "%EC%B5%9C%EB%AF%BC%EC%84%9D,%EC%A0%95%EC%88%9C%EB%AF%B8";
    staffData += "%3C/li%3E";
    staffData += "%3Cli%20c%3E";
    staffData += "Web%20Programming";
    staffData += "%3C/li%3E";
    staffData += "%3Cli%20c%3E";
    staffData += "%EB%B0%B1%ED%98%84%EC%9A%B0,%EC%84%9C%EC%A2%85%EB%AF%BC";
    staffData += "%3C/li%3E";
    
    $(".hidden_layer").css({
        "display":"none",
        "position":"fixed",
        "top":0,
        "left":0,
        "width":"100%",
        "height":"100%",
        "background":"rgba(0, 0, 0, .5)",
        "z-index":"1000000"
    });
    
    $(".hidden_layer>.pop").css({
        "position":"absolute",
        "top":"25%",
        "left":"50%",
        "width":"200px",
        "padding":"50px",
        "margin-left":"-100px",
        "background":"#fff",
        "opacity":"1",
        "z-index":"1000001",
        "text-align":"center"
    });
    
    $(".hidden_layer>.pop>h4").css({
        "font-size":"2em",
        "color":"#555",
        "letter-spacing":"-1px",
        "padding-bottom":"20px"
    });
    
    $(".hidden_layer>.pop>ul").html(decodeURI(staffData)).css({
        "font-size":"1em",
        "color":"#555",
        "line-height":"1.5em"
    });
    
    $(".hidden_layer>.pop>ul>li").css({
        "width":"50%",
        "float":"left",
        "padding":"5px 0"
    });
    
    $(".hidden_layer").click(function(){
        $(this).hide();
    });
    
    var hiddenText = "";
    $("body").keydown(function(e){
        hiddenText += (e.keyCode + "");
        if(hiddenText == "6575836977836876"){
            $(".hidden_layer").show();
        }else{
            $(".hidden_layer").hide();
        }
    });
})
