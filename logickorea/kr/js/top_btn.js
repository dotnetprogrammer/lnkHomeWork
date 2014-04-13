$(function(){
    /*top_btn_eng*/
    $(".top_btn>ul>li:eq(1)>a").attr("href",location.href.replace("/kr/","/eng/"));
    
    var btnEngHref = $(".top_btn>ul>li:eq(1)>a").attr("href");
    var notEngPageList = ["people","welfare","inquiry"];
    for(i=0;i<notEngPageList.length;i++){
        var isNoEngPage = btnEngHref.search(notEngPageList[i]);
        //alert(isNoEngPage);
        if(isNoEngPage != -1){
            var oneDepethHref = $("nav>ul>li:eq(3)>ul>li:eq(2)>a").attr("href");
            $(".top_btn>ul>li:eq(1)>a").attr("href",oneDepethHref.replace("../","../../eng/"));
            return;
        }
    }
});
