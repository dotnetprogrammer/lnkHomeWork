(function($){
	$.fn.extend({
		icarus:function(options){
			var defaults={mouseWheelSpeen:null,verticalSlideSpeed:null,fadeSlideSpeed:null,classSlideSpeed:null};
			var options=$.extend(defaults,options);
			var o=options;
			var gnb=$(".gnb .menu_wrap .menu li .main span");
			var gnbSub=$(".gnb .menu_wrap .menu li .sub li");
			var navigation=$("#navigation .menu li");
			var contents=$("#contents");
			var contentsWrapper=$(contents).find(".wrapper");
			var contentsWrapperPage=$(contentsWrapper).find(".page");
			var contentsWrapperhome=$(contentsWrapper).find(".home");
			var contentsWrapperstory=$(contentsWrapper).find(".story");
			var contentsWrapperclass=$(contentsWrapper).find(".class");
			var contentsWrappersystem=$(contentsWrapper).find(".system");
			var contentsWrapperworlde=$(contentsWrapper).find(".world");
			var contentsWrapperPageScreen=$(contentsWrapperPage).find(".screen");
			var contentsWrapperPageScreenBackground=$(contentsWrapperPageScreen).find(".background");
			function getInternetExplorerVersion(){
				var rv=-1;if(navigator.appName=="Microsoft Internet Explorer"){
					var ua=navigator.userAgent;
					var re=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
					if(re.exec(ua)!=null)rv=parseFloat(RegExp.$1)
				} else if(navigator.appName=="Netscape"){
					var ua=navigator.userAgent;
					var re=new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");
					if(re.exec(ua)!=null)rv=parseFloat(RegExp.$1)
				}
				return rv
			}
			var IE8=getInternetExplorerVersion();
			if(IE8==8){
				var IE8Style="";
					IE8Style+='<style type="text/css">';
					IE8Style+='p { font-family:"\ub3cb\uc6c0",dotum,"\uad74\ub9bc",gulim,arial,verdana,helvetica,sans-serif !important; letter-spacing:-2px !important; }';
					IE8Style+=".preloadImages { zoom:1; background:transparent; }";
					IE8Style+="</style>";$("body").prepend(IE8Style)
				}
				$(window).on("resize",function(){
					var windowWidth=$(window).width();
					var windowHeight=$(window).height();
					$(contents).css({"width":windowWidth,"height":windowHeight-100});
					$(contentsWrapper).css({"width":windowWidth,"height":windowHeight-100});
					$(contentsWrapperPage).css({"width":windowWidth,"height":windowHeight-100});
					$(contentsWrapperPageScreen).css({"width":windowWidth,"height":windowHeight-100});
					var contentsHeight=parseInt($(contents).height());
					var contentsWrapperTop=parseInt($(contentsWrapper).css("top"));
					var contentsWrapperTop=Math.abs(contentsWrapperTop);
					var activeIndex=$(contentsWrapper).find(".active").index();
					if(contentsWrapperTop!=0){
						var contentsWrapperTopResize=contentsHeight*activeIndex;
						var contentsWrapperTopResize=-contentsWrapperTopResize;
						$(contentsWrapper).css({"top":contentsWrapperTopResize})
					}
					var contentsWidth=$(contents).width();
					var contentsHeight=$(contents).height();
					$(contentsWrapperPageScreenBackground).css({"width":contentsWidth,"height":contentsHeight});
					var iw=$(contentsWrapperPageScreenBackground).find("img").width();
					var ih=$(contentsWrapperPageScreenBackground).find("img").height();
					if(contentsWidth>contentsHeight)
						if(iw>ih){
							var ratio=iw/ih;
							$(contentsWrapperPageScreenBackground).find("img").css("width",contentsWidth);
							$(contentsWrapperPageScreenBackground).find("img").css("height",Math.round(contentsWidth*(1/ratio)));
							var newIh=Math.round(contentsWidth*(1/ratio));
							if(newIh<contentsHeight){
								var ratio=ih/iw;$(contentsWrapperPageScreenBackground).find("img").css("width",Math.round(contentsHeight*(1/ratio)));
								$(contentsWrapperPageScreenBackground).find("img").css("height",contentsHeight)
							}
						} else {
								var ratio=ih/iw;$(contentsWrapperPageScreenBackground).find("img").css("width",Math.round(contentsHeight*(1/ratio)));
								$(contentsWrapperPageScreenBackground).find("img").css("width",contentsWidth)
							} else {var ratio=ih/iw;$(contentsWrapperPageScreenBackground).find("img").css("width",Math.round(contentsHeight*(1/ratio)));
								$(contentsWrapperPageScreenBackground).find("img").css("height",contentsHeight)
							}
							$(".story .screen .image").css({"width":windowWidth,"height":windowHeight-100});
							$(".story .screen .image li").css({"width":windowWidth,"height":windowHeight-100});
							var systemListIndex=$(".system .screen .list .item").length;
							$(".system .screen .list").css({"width":windowWidth*systemListIndex,"height":windowHeight-100});
							$(".system .screen .list .item").css({"width":windowWidth*systemListIndex,"height":windowHeight-100});
							$(".system .screen .list .item .inner .fellow_view").css({"width":windowWidth,"height":windowHeight-100});
							$(".system .screen .list .item .inner .fellow_view li").css({"width":windowWidth,"height":windowHeight-100});
							$(".system .screen .list .item .inner .customize").css({"width":windowWidth,"height":windowHeight-100});
							$(".world .screen .image").css({"width":windowWidth,"height":windowHeight-100});$(".world .screen .image li").css({"width":windowWidth,"height":windowHeight-100});
							$(".movie").css({"width":windowWidth,"height":windowHeight-100});
							$(".movie .p_bg").css({"width":windowWidth,"height":windowHeight-100});
							$(".movie .inner").css({"width":windowWidth,"height":windowHeight-100})}).trigger("resize");
							$("#header .gnb .logo a").on("click",function(){
								if($(contentsWrapper).is(":animated")==false){
									index=0;if(index!=$(contentsWrapper).find(".active").index()){
										$(".gnb .menu_wrap .menu li").eq(index).find(".effect").fadeIn(400).parent("li").addClass("on").siblings("li").find(".effect").fadeOut(400).parent("li").removeClass("on");
										$(".gnb .menu_wrap .menu li").find(".sub").fadeOut(400);$(navigation).eq(index).find("span").fadeIn(400).parent("li").addClass("on").siblings("li").find("span").fadeOut(400).parent("li").removeClass("on");
										verticalSlide()
									}
								}
							});
							$(gnb).on("click",function(){
								if($(contentsWrapper).is(":animated")==false){
									index=$(this).parent(".main").parent("li").index();
									if(index!=$(contentsWrapper).find(".active").index()){
										if($(this).parent(".main").parent("li").find("ul").hasClass("sub"))$(this).parent(".main").next(".effect").fadeIn(400).next(".sub").fadeIn(400).parent("li").addClass("on").siblings("li").removeClass("on").find(".effect").fadeOut(400).next(".sub").fadeOut(400);
										else{
											$(this).parent(".main").next(".effect").fadeIn(400).parent("li").addClass("on").siblings("li").find(".effect").fadeOut(400).parent("li").removeClass("on");
											$(".gnb .menu_wrap .menu li").find(".sub").fadeOut(400)
										}$(navigation).eq(index).find("span").fadeIn(400).parent("li").addClass("on").siblings("li").find("span").fadeOut(400).parent("li").removeClass("on");
											verticalSlide()
									}
								}
							});
							$(navigation).on("click",function(){
								if($(contentsWrapper).is(":animated")==false){
									index=$(this).index();
									if(index!=$(contentsWrapper).find(".active").index()){
										$(this).find("span").fadeIn(400).parent("li").addClass("on").siblings("li").find("span").fadeOut(400).parent("li").removeClass("on");
										if($(gnb).parent(".main").parent("li").eq(index).find("ul").hasClass("sub"))$(gnb).parent(".main").parent("li").eq(index).find(".effect").fadeIn(400).next(".sub").fadeIn(400).parent("li").addClass("on").siblings("li").removeClass("on").find(".effect").fadeOut(400).next(".sub").fadeOut(400);
										else{
											$(gnb).parent(".main").parent("li").eq(index).find(".effect").fadeIn(400).parent("li").addClass("on").siblings("li").find(".effect").fadeOut(400).parent("li").removeClass("on");
											$(".gnb .menu_wrap .menu li").find(".sub").fadeOut(400).parent("li")
										}
										verticalSlide()
									}
								}
							});
							$(navigation).on("mouseenter",function(){
								$(this).find("span").fadeIn(200)
							}).on("mouseleave",function(){
								if($(this).hasClass("on")==false)$(this).find("span").fadeOut(200)
							});
							function verticalSlide(){
								var contentsWrapperPageHeight=parseInt($(contentsWrapperPage).height());
								var contentsWrapperPageHeight=contentsWrapperPageHeight*index;var contentsWrapperTop=parseInt($(contentsWrapper).css("top"));
								var contentsWrapperTop=Math.abs(contentsWrapperTop);var move=contentsWrapperPageHeight-contentsWrapperTop;var move=-move;
								var idx1=index+1;
								var idx2=$(contentsWrapper).find(".active").index()+1;
								if(idx1>idx2)var idx3=idx1-idx2;
								else if(idx1<idx2)var idx3=idx2-idx1;
								var verticalSlideSpeed=o.verticalSlideSpeed;
								var verticalSlideSpeed=verticalSlideSpeed*idx3;
								if(contentsWrapperPageHeight==0){
									if($(contentsWrapper).is(":animated")==false){
										activeLeave();
										$(contentsWrapper).stop(true,true).animate({"top":"+="+move},verticalSlideSpeed,"easeInOutExpo",function(){active();activeStart()})
									}
								}else if(contentsWrapperTop>move)if($(contentsWrapper).is(":animated")==false){
									activeLeave();
									$(contentsWrapper).stop(true,true).animate({"top":"+="+move},verticalSlideSpeed,"easeInOutExpo",function(){active();activeStart()})
								}
							}
							function active(){
								var index=$("#navigation .menu").find(".on").index();
								$(contentsWrapper).find(".page").eq(index).addClass("active").siblings(".page").removeClass("active")
							}
							$(gnbSub).on("click",function(){
								var mainMenu=$(this).parent(".sub").parent("li");var mainMenuIndex=$(this).parent(".sub").parent("li").index()+1;
								var subMenuIndex=$(this).index()+1;
								if($(contentsWrapper).is(":animated")==false){
									var now=$(this);
									if($(mainMenu).hasClass("class")){
										var subMenuIndex=subMenuIndex-1;
										var index=$(".class .screen .image .on").index();
										var onObj=1018*index;
										var clickObj=1018*subMenuIndex;
										var move=onObj-clickObj;
										var move1=-move;
										var move2=move;
										var classSlideSpeed=Math.abs((subMenuIndex-index)*o.classSlideSpeed);
										function moveScreen1(){
											if(subMenuIndex>index){
												if($(".class .screen .image").is(":animated")==false){
													$(now).addClass("block").siblings("li").removeClass("block");
													$(".class .screen .text .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"}).find("p").fadeOut(o.fadeSlideSpeed);
													$(".class .screen .image").find("li").eq(subMenuIndex).addClass("on").siblings("li").removeClass("on");
													$(".class .screen .image").find(".on").stop(true,true).fadeTo(o.fadeSlideSpeed,1);
													$(".class .screen .image").stop(true,true).animate({"left":"-="+move1+"px"},classSlideSpeed,"easeInOutExpo",function(){$(this).find(".on").siblings("li").stop(true,true).fadeTo(o.fadeSlideSpeed,0.1);
													$(".class .screen .text li").eq(subMenuIndex).stop(true,true).addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"}).find("p").fadeIn(o.fadeSlideSpeed)})}
										}else if(subMenuIndex<index){if($(".class .screen .image").is(":animated")==false){$(now).addClass("block").siblings("li").removeClass("block");$(".class .screen .text .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"}).find("p").fadeOut(o.fadeSlideSpeed);$(".class .screen .image").find("li").eq(subMenuIndex).addClass("on").siblings("li").removeClass("on");
$(".class .screen .image").find(".on").stop(true,true).fadeTo(o.fadeSlideSpeed,1);$(".class .screen .image").stop(true,true).animate({"left":"+="+move2+"px"},classSlideSpeed,"easeInOutExpo",function(){$(this).find(".on").siblings("li").stop(true,true).fadeTo(o.fadeSlideSpeed,0.1);$(".class .screen .text li").eq(subMenuIndex).stop(true,true).addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"}).find("p").fadeIn(o.fadeSlideSpeed)})}}else if(subMenuIndex==index)return false}
if($(".class .screen .image .on .movie").css("display")=="none")moveScreen1();else{activeLeave();moveScreen1()}}else if($(mainMenu).hasClass("system"))if($(".system .screen .movie.on").css("display")=="none"){if($(".system .screen .list .view").is(":animated")==false){$(now).addClass("block").siblings("li").removeClass("block");var subMenuIndex=subMenuIndex-1;var index=$(".system .screen .list .view").index();if(subMenuIndex!=index){$(".system .screen .list .view").stop(true,true).removeClass("view").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"});
$(".system .screen .list .item").eq(subMenuIndex).addClass("view").fadeIn(o.fadeSlideSpeed).css({"z-index":"30","display":"list-item"});$(".system .screen .list .item .inner .fellow_view .on object").remove();$(".system .screen .list .item .inner .customize object").remove();var index=$(".system .screen .list .view").index();var last=$(".system .screen .list .item").length-1;if(index==0){var idx=$(".system .screen .list .item .inner .fellow_tab .on").index();if(IE8==8||(navigator.userAgent.indexOf("iPhone")!=
-1||(navigator.userAgent.indexOf("iPad")!=-1||(navigator.userAgent.indexOf("Blackberry")!=-1||navigator.userAgent.indexOf("Android")!=-1))))return true;else $(".system .screen .list .item .inner .fellow_view .on").html('<object class="object" type="application/x-shockwave-flash" data="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_'+idx+'.swf" width="100%" height="100%"><param name="movie" value="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_'+idx+'.swf" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /></object>')}else if(index==
last)if(IE8==8||(navigator.userAgent.indexOf("iPhone")!=-1||(navigator.userAgent.indexOf("iPad")!=-1||(navigator.userAgent.indexOf("Blackberry")!=-1||navigator.userAgent.indexOf("Android")!=-1))))return false;else $(".system .screen .list .item .inner .customize").html('<object class="object" type="application/x-shockwave-flash" data="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_3.swf" width="100%" height="100%"><param name="movie" value="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_3.swf" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /></object>')}}}else{function popUpClose(){$(contentsWrapperPageScreen).find(".movie").each(function(){if($(this).css("display")!=
"none"){$(this).fadeOut(400);var movieId=$(this).find(".inner iframe").attr("id");$(this).find(".inner iframe").remove();$(this).find(".inner .close").before('<div class="ytplayer" id="'+movieId+'"></div>')}});$(".system .screen .popup_list .on").removeClass("on");$(".system .screen .popup_list").hide()}if($(".system .screen .list .view").is(":animated")==false){$(now).addClass("block").siblings("li").removeClass("block");var subMenuIndex=subMenuIndex-1;var index=$(".system .screen .list .view").index();
if(subMenuIndex!=index){popUpClose();$(".system .screen .list .view").stop(true,true).removeClass("view").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"});$(".system .screen .list .item").eq(subMenuIndex).addClass("view").fadeIn(o.fadeSlideSpeed).css({"z-index":"30","display":"list-item"});$(".system .screen .list .item .inner .fellow_view .on object").remove();$(".system .screen .list .item .inner .customize object").remove();var index=$(".system .screen .list .view").index();var last=$(".system .screen .list .item").length-
1;if(index==0){var idx=$(".system .screen .list .item .inner .fellow_tab .on").index();if(IE8==8||(navigator.userAgent.indexOf("iPhone")!=-1||(navigator.userAgent.indexOf("iPad")!=-1||(navigator.userAgent.indexOf("Blackberry")!=-1||navigator.userAgent.indexOf("Android")!=-1))))return true;else $(".system .screen .list .item .inner .fellow_view .on").html('<object class="object" type="application/x-shockwave-flash" data="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_'+idx+'.swf" width="100%" height="100%"><param name="movie" value="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_'+
idx+'.swf" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /></object>')}else if(index==last)if(IE8==8||(navigator.userAgent.indexOf("iPhone")!=-1||(navigator.userAgent.indexOf("iPad")!=-1||(navigator.userAgent.indexOf("Blackberry")!=-1||navigator.userAgent.indexOf("Android")!=-1))))return false;else $(".system .screen .list .item .inner .customize").html('<object class="object" type="application/x-shockwave-flash" data="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_3.swf" width="100%" height="100%"><param name="movie" value="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_3.swf" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /></object>')}}}else if($(mainMenu).hasClass("world"))if($(".world .screen .movie").css("display")==
"none"){if($(".world .screen .image .on").is(":animated")==false){$(now).addClass("block").siblings("li").removeClass("block");var subMenuIndex=subMenuIndex-1;var index=$(".world .screen .image .on").index();if(subMenuIndex!=index){$(".world .screen .image .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"});$(".world .screen .image li").eq(subMenuIndex).addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"});var idx=$(".world .screen .image .on").index();
$(".world .screen .worldMap .inner").attr("class","").addClass("inner").addClass("map_0"+(idx+1)+"");$(".world .screen .text .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"});$(".world .screen .text li").eq(idx).addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"})}}}else{activeLeave();if($(".world .screen .image .on").is(":animated")==false){$(now).addClass("block").siblings("li").removeClass("block");var subMenuIndex=subMenuIndex-
1;var index=$(".world .screen .image .on").index();if(subMenuIndex!=index){$(".world .screen .image .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"});$(".world .screen .image li").eq(subMenuIndex).addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"});var idx=$(".world .screen .image .on").index();$(".world .screen .worldMap .inner").attr("class","").addClass("inner").addClass("map_0"+(idx+1)+"");$(".world .screen .text .on").stop(true,
true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"});$(".world .screen .text li").eq(idx).addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"})}}}}});if($("#wheel").css("display")=="none")return false;else setTimeout(function(){$("#wheel").fadeOut(400)},1E3);setTimeout(function(){if($(contentsWrapper).is(":animated")==false)$(".home .screen .play").trigger("click");$(".home .screen .play").show()},1E3);$(".home .screen .play").on("mouseenter",function(){$(this).addClass("on")}).on("mouseleave",
function(){$(this).removeClass("on")});homeAnimationStart();$(".story .screen .tab li").on("click",function(){var index=$(this).index();if($(contentsWrapper).is(":animated")==false)if($(".story .screen .image .on").is(":animated")==false)if(index!=$(".story .screen .tab .on").index()){$(".story .screen .tab li").eq(index).addClass("on").siblings("li").removeClass("on");$(".story .screen .text .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"});$(".story .screen .text li").eq(index).stop(true,
true).addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"});$(".story .screen .image .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"});$(".story .screen .image li").eq(index).addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"})}});$(".story .screen .text li").eq(0).addClass("on").css({"z-index":"2","display":"list-item"}).siblings("li").removeClass("on").css({"z-index":"1","display":"none"});$(".story .screen .image li").eq(0).addClass("on").css({"z-index":"2",
"display":"list-item"}).siblings("li").removeClass("on").css({"z-index":"1","display":"none"});$(".class .screen .text li").eq(0).addClass("on").css({"z-index":"2","display":"list-item"}).siblings("li").removeClass("on").css({"z-index":"1","display":"none"});$(".class .screen .text li .button").on("mouseenter",function(){$(this).addClass("arr_on")}).on("mouseleave",function(){$(this).removeClass("arr_on")});$(".class .screen .image").find("li").eq(0).stop(true,true).fadeTo(0,1).siblings("li").stop(true,
true).fadeTo(0,0.1);$(".system .screen .list .item").eq(0).addClass("view").css({"z-index":"30","display":"list-item"}).siblings(".item").removeClass("view").css({"z-index":"1","display":"none"});$(".system .screen .list .item .inner .fellow_tab li").on("mouseenter",function(){$(this).addClass("on").siblings("li").removeClass("on")}).on("mouseleave",function(){var index=$(".system .screen .list .item .inner .fellow_view .on").index();$(".system .screen .list .item .inner .fellow_tab li").eq(index).addClass("on").siblings("li").removeClass("on")});
$(".system .screen .list .item .inner .fellow_tab li").on("click",function(){var index=$(this).index();$(this).addClass("on").siblings("li").removeClass("on");if(IE8==8||(navigator.userAgent.indexOf("iPhone")!=-1||(navigator.userAgent.indexOf("iPad")!=-1||(navigator.userAgent.indexOf("Blackberry")!=-1||navigator.userAgent.indexOf("Android")!=-1)))){$(".system .screen .list .item .inner .fellow_view li").eq(index).addClass("on").fadeIn(400).css({"z-index":"2","display":"list-item"}).siblings("li").removeClass("on").css({"z-index":"1",
"display":"none"});$(".system .screen .list .item .inner .fellow_view .on .background").fadeIn(400).find("img").fadeIn(400).parent(".background").parent("li").siblings("li").find(".background").fadeOut(400).find("img").fadeOut(400)}else $(".system .screen .list .item .inner .fellow_view li").eq(index).addClass("on").fadeIn(400).css({"z-index":"2","display":"list-item"}).html('<object class="object" type="application/x-shockwave-flash" data="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_'+
index+'.swf" width="100%" height="100%"><param name="movie" value="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_'+index+'.swf" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /></object>').siblings("li").removeClass("on").css({"z-index":"1","display":"none"}).find("object").remove()});$(".system .screen .list .item .inner .fellow_view li").eq(0).addClass("on").css({"z-index":"2","display":"list-item"}).siblings("li").removeClass("on").css({"z-index":"1",
"display":"none"});$(".system .screen .list .item .inner .text_tab li").on("click",function(){if($(this).hasClass("on"))return false;else{var index=$(this).index();$(this).addClass("on").siblings("li").removeClass("on");$(this).parent(".text_tab").next(".text_view").find(".on").removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1","display":"none"});$(this).parent(".text_tab").next(".text_view").find("li").siblings("li").eq(index).addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2",
"display":"list-item"})}});$(".system .screen .list .item .inner .text_view li .button").on("mouseenter",function(){$(this).addClass("arr_on")}).on("mouseleave",function(){$(this).removeClass("arr_on")});$(".system .screen .list .item").each(function(){$(this).find(".inner .text_view li").eq(0).addClass("on").css({"z-index":"2","display":"list-item"}).siblings("li").removeClass("on").css({"z-index":"1","display":"none"})});if(IE8==8||(navigator.userAgent.indexOf("iPhone")!=-1||(navigator.userAgent.indexOf("iPad")!=
-1||(navigator.userAgent.indexOf("Blackberry")!=-1||navigator.userAgent.indexOf("Android")!=-1)))){$(".system .screen .list .item .inner .fellow_view li").eq(0).find(".background").css("display","block");$(".system .screen .list .item .inner .customize .background").css("display","block")}$(".system .screen .list .item .inner .customization").on("mouseenter",function(){$(this).addClass("arr_on")}).on("mouseleave",function(){$(this).removeClass("arr_on")});$(".world .screen .worldMap .inner .map").on("click",
function(){var index=$(this).index();if($(contentsWrapper).is(":animated")==false)if($(".world .screen .image .on").is(":animated")==false)if(index!=$(".world .screen .worldMap .inner .on").index()){$(".world .screen .worldMap .inner").attr("class","").addClass("inner").addClass("map_0"+(index+1)+"");$(".world .screen .worldMap .inner .map").eq(index).addClass("on").siblings(".map").removeClass("on");$(".world .screen .text .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"});
$(".world .screen .text li").eq(index).stop(true,true).addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"});$(".world .screen .image .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"});$(".world .screen .image li").eq(index).addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"});$(".gnb .menu_wrap .menu .on .sub li").eq(index).addClass("block").siblings("li").removeClass("block")}});$(".world .screen .text li").eq(0).addClass("on").css({"z-index":"2",
"display":"list-item"}).siblings("li").removeClass("on").css({"z-index":"1","display":"none"});$(".world .screen .text li .thumbBox").each(function(){$(this).find(".thumb").eq(0).addClass("view").css({"z-index":"-1","display":"list-item"}).siblings(".thumb").removeClass("view").css({"z-index":"-1","display":"none"})});$(".world .screen .text li .thumbBox span").on("mouseenter",function(){$(this).addClass("over")}).on("mouseleave",function(){$(this).removeClass("over")});$(".world .screen .text li .thumbBox span").on("click",
function(){var img=$(this).parent(".thumbBox").find(".view");var imgIndex=$(this).parent(".thumbBox").find(".view").index();var last=$(this).parent(".thumbBox").find(".thumb").length+1;if($(this).parent(".thumbBox").find(".thumb").is(":animated")==false)if($(this).hasClass("prev")){var imgIndex=imgIndex-2;if(imgIndex>=1){$(img).stop(true,true).removeClass("view").fadeOut(o.fadeSlideSpeed).css({"z-index":"-1"}).prev(".thumb").addClass("view").fadeIn(o.fadeSlideSpeed).css({"z-index":"-1","display":"list-item"});
$(".world .screen .text .on .thumbBox_list .view").removeClass("view").prev("span").addClass("view");$(".world .screen .image .on .background .view").removeClass("view").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"}).prev("img").addClass("view").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"})}if(imgIndex==0){$(img).stop(true,true).removeClass("view").fadeOut(o.fadeSlideSpeed).css({"z-index":"-1"});$(this).parent(".thumbBox").find(".thumb").eq(last-2).addClass("view").fadeIn(o.fadeSlideSpeed).css({"z-index":"-1",
"display":"list-item"});$(".world .screen .text .on .thumbBox_list .view").removeClass("view");$(".world .screen .text .on .thumbBox_list span").eq(last-2).addClass("view");$(".world .screen .image .on .background .view").removeClass("view").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"});$(".world .screen .image .on .background img").eq(last-2).addClass("view").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"})}}else if($(this).hasClass("next")){if(imgIndex<=last){$(img).stop(true,
true).removeClass("view").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"}).next(".thumb").addClass("view").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"});$(".world .screen .text .on .thumbBox_list .view").removeClass("view").next("span").addClass("view");$(".world .screen .image .on .background .view").removeClass("view").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"}).next("img").addClass("view").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"})}if(imgIndex==last){$(img).stop(true,
true).removeClass("view").fadeOut(o.fadeSlideSpeed).css({"z-index":"-1"});$(this).parent(".thumbBox").find(".thumb").eq(0).addClass("view").fadeIn(o.fadeSlideSpeed).css({"z-index":"-1","display":"list-item"});$(".world .screen .text .on .thumbBox_list .view").removeClass("view");$(".world .screen .text .on .thumbBox_list span").eq(0).addClass("view");$(".world .screen .image .on .background .view").removeClass("view").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"});$(".world .screen .image .on .background img").eq(0).addClass("view").fadeIn(o.fadeSlideSpeed).css({"z-index":"2",
"display":"list-item"})}}});$(".world .screen .text li .thumbBox .thumb").each(function(){var idx=$(this).index()-1;$("<span>"+idx+"</span>").appendTo($(this).parent(".thumbBox").next(".thumbBox_list"));$(this).parent(".thumbBox").next(".thumbBox_list").find("span").eq(0).addClass("view")});$(".world .screen .text li .thumbBox_list span").on("click",function(){var img=$(".world .screen .text .on .thumbBox .view");var now=$(".world .screen .text .on .thumbBox_list .view").index();var idx=$(this).index();
if($(this).parent(".thumbBox_list").prev(".thumbBox").find(".thumb").is(":animated")==false)if(now!=idx){$(this).addClass("view").siblings("span").removeClass("view");$(img).stop(true,true).removeClass("view").fadeOut(o.fadeSlideSpeed).css({"z-index":"-1"});$(img).parent(".thumbBox").find(".thumb").eq(idx).stop(true,true).addClass("view").fadeIn(o.fadeSlideSpeed).css({"z-index":"-1","display":"list-item"});$(this).addClass("view").siblings("span").removeClass("view");$(".world .screen .image .on .background .view").removeClass("view").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"});
$(".world .screen .image .on .background img").eq(idx).addClass("view").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"})}});$(".world .screen .image li").eq(0).addClass("on").css({"z-index":"2","display":"list-item"}).siblings("li").removeClass("on").css({"z-index":"1","display":"none"});$(".world .screen .image li").each(function(){$(this).find(".background img").eq(0).addClass("view").css({"z-index":"2","display":"list-item"}).siblings("img").removeClass("view").css({"z-index":"1",
"display":"none"})});$(".world .screen .worldMovie").on("mouseenter",function(){$(this).addClass("on")}).on("mouseleave",function(){$(this).removeClass("on")});$(".movie .p_bg").fadeTo("0",0.8);$(".play").on("click",function(){var videoId=$(this).next(".movie").find(".inner .ytplayer").attr("id");onYouTubePlayerAPIReady(videoId);$(this).next(".movie").fadeIn(200).find("iframe").delay(400).fadeIn(800)});$(".class .screen .text li .button").on("click",function(){var index=$(this).parent("li").index();
var videoId=$(".class .screen .image li").eq(index).find(".movie").find(".inner .ytplayer").attr("id");onYouTubePlayerAPIReady(videoId);$(".class .screen .image").addClass("popup").find("li").eq(index).find(".movie").fadeIn(200).find("iframe").delay(400).fadeIn(800)});$(".system .screen .button").on("click",function(){var id=$(this).attr("id");var regex=/[^0-9]/g;var id=id.replace(regex,"");var id=id-1;var videoId=$(".system .screen .popup_list .movie").eq(id).find(".inner .ytplayer").attr("id");
if(videoId!="")onYouTubePlayerAPIReady(videoId);$(".system .screen .popup_list").show();$(".system .screen .popup_list .movie").eq(id).addClass("on").fadeIn(200).find("iframe").delay(400).fadeIn(800)});$(".movie .inner .close").on("click",function(){$(this).parent(".inner").parent(".movie").fadeOut(400);var id=$(this).prev("iframe").attr("id");$(this).prev("iframe").remove();$(this).before('<div class="ytplayer" id="'+id+'"></div>');$(".class .screen .image").removeClass("popup");$(".system .screen .popup_list .on").removeClass("on");
$(".system .screen .popup_list").hide()});var tag=document.createElement("script");tag.src="https://www.youtube.com/player_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);var player;function onYouTubePlayerAPIReady(videoId){if(IE8!=8)player=new YT.Player(videoId,{width:"100%",height:"100%",playerVars:{"hd":1,"vq":"highres","autoplay":1,"controls":1,"autohide":1,"wmode":"opaque","showinfo":"0","rel":"0","modestbranding":"1"},
videoId:videoId});else{var iframe='<iframe width="100%" height="100%" title="YouTube video player" id="'+videoId+'" src="https://www.youtube.com/embed/'+videoId+'?hd=1&vq=highres&theme=dark&showinfo=0&controls=1&autohide=1&rel=0&modestbranding=1&wmode=opaque" frameborder="0" allowfullscreen="1"></iframe>';$("#"+videoId).replaceWith(iframe)}}$(contents).mousewheel(function(event,deltaY){contentsWrapperPageHeight=parseInt($(contentsWrapperPage).height());if(event.deltaY>0)mouseWheelUp();else if(event.deltaY<
0)mouseWheelDown();return false});function mouseWheelUp(){if($(contentsWrapper).find(".active").hasClass("home"))return false;else if($(contentsWrapper).find(".active").hasClass("story")){if($(contentsWrapper).is(":animated")==false){var index=$(".story .screen .image .on").index();if(index==0){if($(".story .screen .image .on").is(":animated")==false)verticalSlideUp()}else if($(".story .screen .image .on").is(":animated")==false){$(".story .screen .tab li").eq(index-1).addClass("on").siblings("li").removeClass("on");
$(".story .screen .text .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"}).prev("li").addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"});$(".story .screen .image .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"}).prev("li").addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"})}}}else if($(contentsWrapper).find(".active").hasClass("class")){if($(contentsWrapper).is(":animated")==
false){var index=$(".class .screen .image .on").index();if(index==0){if($(".class .screen .image").is(":animated")==false)verticalSlideUp()}else if($(".class .screen .image .on .movie").css("display")=="none")if($(".class .screen .image").is(":animated")==false){$(".gnb .menu_wrap .menu .on").find(".block").prev("li").addClass("block").siblings("li").removeClass("block");$(".class .screen .text .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"}).find("p").fadeOut(o.fadeSlideSpeed).parent("li").prev("li").addClass("on");
$(".class .screen .image").find(".on").prev("li").addClass("on").siblings("li").removeClass("on");$(".class .screen .image").find(".on").stop(true,true).fadeTo(o.fadeSlideSpeed,1);$(".class .screen .image").stop(true,true).animate({"left":"+=1018px"},o.classSlideSpeed,"easeInOutExpo",function(){$(this).find(".on").next("li").stop(true,true).fadeTo(o.fadeSlideSpeed,0.1);$(".class .screen .text .on").stop(true,true).fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"}).find("p").fadeIn(o.fadeSlideSpeed)})}}}else if($(contentsWrapper).find(".active").hasClass("system")){if($(contentsWrapper).is(":animated")==
false){var index=$(".system .screen .list .view").index();if(index==0){if($(".system .screen .list .view").is(":animated")==false){verticalSlideUp();$(".system .screen .list .view .inner .fellow_view .on object").remove()}}else if($(".system .screen .popup_list").css("display")=="none")if($(".system .screen .list .view").is(":animated")==false){$(".gnb .menu_wrap .menu .on").find(".block").prev("li").addClass("block").siblings("li").removeClass("block");$(".system .screen .list .view").stop(true,
true).removeClass("view").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"}).prev(".item").addClass("view").fadeIn(o.fadeSlideSpeed).css({"z-index":"30","display":"list-item"});$(".system .screen .list .item .inner .customize object").remove();var idx=$(".system .screen .list .item .inner .fellow_tab .on").index();if(index==1)if(IE8==8||(navigator.userAgent.indexOf("iPhone")!=-1||(navigator.userAgent.indexOf("iPad")!=-1||(navigator.userAgent.indexOf("Blackberry")!=-1||navigator.userAgent.indexOf("Android")!=
-1))))return false;else $(".system .screen .list .item .inner .fellow_view .on").html('<object class="object" type="application/x-shockwave-flash" data="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_'+idx+'.swf" width="100%" height="100%"><param name="movie" value="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_'+idx+'.swf" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /></object>')}}}else if($(contentsWrapper).find(".active").hasClass("world"))if($(contentsWrapper).is(":animated")==
false){var index=$(".world .screen .image .on").index();if(index==0){if($(".world .screen .image .on").is(":animated")==false)verticalSlideUp()}else if($(".world .screen .movie").css("display")=="none")if($(".world .screen .image .on").is(":animated")==false){$(".gnb .menu_wrap .menu .on").find(".block").prev("li").addClass("block").siblings("li").removeClass("block");$(".world .screen .worldMap .inner .map").eq(index-1).addClass("on").siblings(".map").removeClass("on");$(".world .screen .text .on").stop(true,
true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"}).prev("li").addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"});$(".world .screen .image .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"}).prev("li").addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"});var idx=$(".world .screen .image .on").index();$(".world .screen .worldMap .inner").attr("class","").addClass("inner").addClass("map_0"+
(idx+1)+"")}}}function mouseWheelDown(){if($(contentsWrapper).find(".active").hasClass("home")){if($(contentsWrapper).is(":animated")==false)verticalSlideDown()}else if($(contentsWrapper).find(".active").hasClass("story")){if($(contentsWrapper).is(":animated")==false){var index=$(".story .screen .image .on").index()+1;var last=$(".story .screen .image li").length;if(index!=last){if($(".story .screen .image .on").is(":animated")==false){$(".story .screen .tab li").eq(index).addClass("on").siblings("li").removeClass("on");
$(".story .screen .text .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"}).next("li").addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"});$(".story .screen .image .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"}).next("li").addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"})}}else if(index==last)if($(".story .screen .image .on").is(":animated")==false)verticalSlideDown()}}else if($(contentsWrapper).find(".active").hasClass("class")){if($(contentsWrapper).is(":animated")==
false){var index=$(".class .screen .image .on").index()+1;var last=$(".class .screen .image li").length;if(index!=last){if($(".class .screen .image .on .movie").css("display")=="none")if($(".class .screen .image").is(":animated")==false){$(".gnb .menu_wrap .menu .on").find(".block").next("li").addClass("block").siblings("li").removeClass("block");$(".class .screen .text .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"}).find("p").fadeOut(o.fadeSlideSpeed).parent("li").next("li").addClass("on");
$(".class .screen .image").find(".on").next("li").addClass("on").siblings("li").removeClass("on");$(".class .screen .image").find(".on").stop(true,true).fadeTo(o.fadeSlideSpeed,1);$(".class .screen .image").stop(true,true).animate({"left":"-=1018px"},o.classSlideSpeed,"easeInOutExpo",function(){$(this).find(".on").prev("li").stop(true,true).fadeTo(o.fadeSlideSpeed,0.1);$(".class .screen .text .on").stop(true,true).fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"}).find("p").fadeIn(o.fadeSlideSpeed)})}}else if(index==
last)if($(".class .screen .image").is(":animated")==false)verticalSlideDown()}}else if($(contentsWrapper).find(".active").hasClass("system")){if($(contentsWrapper).is(":animated")==false){var index=$(".system .screen .list .view").index()+1;var last=$(".system .screen .list .item").length;if(index!=last){if($(".system .screen .popup_list").css("display")=="none")if($(".system .screen .list .view").is(":animated")==false){$(".gnb .menu_wrap .menu .on").find(".block").next("li").addClass("block").siblings("li").removeClass("block");
$(".system .screen .list .view .inner .fellow_view .on object").remove();$(".system .screen .list .view").stop(true,true).removeClass("view").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"}).next(".item").addClass("view").fadeIn(o.fadeSlideSpeed).css({"z-index":"30","display":"list-item"});var index=$(".system .screen .list .view").index()+1;if(index==last)if(IE8==8||(navigator.userAgent.indexOf("iPhone")!=-1||(navigator.userAgent.indexOf("iPad")!=-1||(navigator.userAgent.indexOf("Blackberry")!=-1||
navigator.userAgent.indexOf("Android")!=-1))))return false;else $(".system .screen .list .item .inner .customize").html('<object class="object" type="application/x-shockwave-flash" data="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_3.swf" width="100%" height="100%"><param name="movie" value="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_3.swf" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /></object>')}}else if(index==
last)if($(".system .screen .list .view").is(":animated")==false){verticalSlideDown();$(".system .screen .list .item .inner .customize object").remove()}}}else if($(contentsWrapper).find(".active").hasClass("world"))if($(contentsWrapper).is(":animated")==false){var index=$(".world .screen .image .on").index();var last=$(".world .screen .image li").length-1;if(index==last){if($(".world .screen .image .on").is(":animated")==false)return false}else if($(".world .screen .movie").css("display")=="none")if($(".world .screen .image .on").is(":animated")==
false){$(".gnb .menu_wrap .menu .on").find(".block").next("li").addClass("block").siblings("li").removeClass("block");$(".world .screen .worldMap .inner .map").eq(index+1).addClass("on").siblings(".map").removeClass("on");$(".world .screen .text .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"}).next("li").addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2","display":"list-item"});$(".world .screen .image .on").stop(true,true).removeClass("on").fadeOut(o.fadeSlideSpeed).css({"z-index":"1"}).next("li").addClass("on").fadeIn(o.fadeSlideSpeed).css({"z-index":"2",
"display":"list-item"});var idx=$(".world .screen .image .on").index();$(".world .screen .worldMap .inner").attr("class","").addClass("inner").addClass("map_0"+(idx+1)+"")}}}function verticalSlideUp(){$(contentsWrapper).stop(true,true).animate({"top":"+="+contentsWrapperPageHeight},o.mouseWheelSpeen,"easeInOutExpo",function(){activeLeave();activePrev();activeStart()})}function verticalSlideDown(){$(contentsWrapper).stop(true,true).animate({"top":"-="+contentsWrapperPageHeight},o.mouseWheelSpeen,"easeInOutExpo",
function(){activeLeave();activeNext();activeStart()})}function activeStart(){if($(contentsWrapper).find(".active").hasClass("home"))homeAnimationStart();if($(contentsWrapper).find(".active").hasClass("system"))if(IE8==8||(navigator.userAgent.indexOf("iPhone")!=-1||(navigator.userAgent.indexOf("iPad")!=-1||(navigator.userAgent.indexOf("Blackberry")!=-1||navigator.userAgent.indexOf("Android")!=-1))))return true;else{var num=$(".system .screen .list .item .inner .fellow_tab .on").index();$(".system .screen .list .view .inner .fellow_view li").eq(0).html('<object class="object" type="application/x-shockwave-flash" data="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_'+
num+'.swf" width="100%" height="100%"><param name="movie" value="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_'+num+'.swf" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /></object>');$(".system .screen .list .view .inner .customize").html('<object class="object" type="application/x-shockwave-flash" data="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_3.swf" width="100%" height="100%"><param name="movie" value="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/swf/system_3.swf" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /></object>')}}
function activeLeave(){if($(contentsWrapper).find(".active").hasClass("home"))homeAnimationStop();if($(contentsWrapper).find(".active").hasClass("system"))if(IE8==8||(navigator.userAgent.indexOf("iPhone")!=-1||(navigator.userAgent.indexOf("iPad")!=-1||(navigator.userAgent.indexOf("Blackberry")!=-1||navigator.userAgent.indexOf("Android")!=-1))))return true;else{$(".system .screen .list .view .inner .fellow_view li").eq(0).addClass("on").css({"z-index":"2","display":"list-item"}).siblings("li").removeClass("on").css({"z-index":"1",
"display":"none"});$(".system .screen .list .view .inner .fellow_view li").find("object").remove();$(".system .screen .list .view .inner .customize").find("object").remove()}popUpClose();function popUpClose(){$(contentsWrapperPageScreen).find(".movie").each(function(){if($(this).css("display")!="none"){$(this).fadeOut(400);var movieId=$(this).find(".inner iframe").attr("id");$(this).find(".inner iframe").remove();$(this).find(".inner .close").before('<div class="ytplayer" id="'+movieId+'"></div>')}});
$(".class .screen .image").removeClass("popup");$(".system .screen .popup_list").hide()}}function activePrev(){$(".gnb .menu_wrap .menu .on").removeClass("on").prev("li").addClass("on");if($(".gnb .menu_wrap .menu .on").find("ul").hasClass("sub"))$(".gnb .menu_wrap .menu .on").find(".effect").fadeIn(400).next(".sub").fadeIn(400).parent("li").siblings("li").find(".effect").fadeOut(400).next(".sub").fadeOut(400);else{$(".gnb .menu_wrap .menu .on").find(".effect").fadeIn(400).parent("li").siblings("li").find(".effect").fadeOut(400);
$(".gnb .menu_wrap .menu li").find(".sub").fadeOut(400)}var index=$(".gnb .menu_wrap .menu .on").index();$(navigation).eq(index).find("span").fadeIn(400).parent("li").addClass("on").siblings("li").find("span").fadeOut(400).parent("li").removeClass("on");$(contentsWrapper).find(".active").removeClass("active").prev(".page").addClass("active")}function activeNext(){$(".gnb .menu_wrap .menu .on").removeClass("on").next("li").addClass("on");if($(".gnb .menu_wrap .menu .on").find("ul").hasClass("sub"))$(".gnb .menu_wrap .menu .on").find(".effect").fadeIn(400).next(".sub").fadeIn(400).parent("li").siblings("li").find(".effect").fadeOut(400).next(".sub").fadeOut(400);
else{$(".gnb .menu_wrap .menu .on").find(".effect").fadeIn(400).parent("li").siblings("li").find(".effect").fadeOut(400);$(".gnb .menu_wrap .menu li").find(".sub").fadeOut(400)}var index=$(".gnb .menu_wrap .menu .on").index();$(navigation).eq(index).find("span").fadeIn(400).parent("li").addClass("on").siblings("li").find("span").fadeOut(400).parent("li").removeClass("on");$(contentsWrapper).find(".active").removeClass("active").next(".page").addClass("active")}function homeAnimationStart(){$(function repeat_01(){$(".home .screen .background .smoke_01").stop(true,
true).animate({"left":"100%"},8E4,"linear",function(){$(this).css("left","-100%")},repeat_01)});$(function repeat_02(){$(".home .screen .background .smoke_02").stop(true,true).animate({"left":"100%"},8E4,"linear",function(){$(this).css("left","100%")},repeat_02)})}function homeAnimationStop(){$(".home .screen .background .smoke_01").stop(true,true).css("left","0");$(".home .screen .background .smoke_02").stop(true,true).css("left","-100%")}}})})(jQuery);
$(document).ready(function(){var arrImg=new Array(1,2,3);var ranNum=Math.floor(Math.random()*arrImg.length);$(".home .screen .background").append('<img src="http://wemade-image.gscdn.com/icarus/web/2013_obt/brand/contents/01_home/bg_page_01_0'+(ranNum+1)+'.png" alt="" title="" class="random_img" />');$(".random_img").fadeIn(800);var rotation=function(){$("#loading #loading_img").rotate({angle:0,animateTo:360,callback:rotation,easing:function(x,t,b,c,d){return c*(t/d)+b}})};rotation();var imgNumber=
$("img").size();var imgComplete=0;$("img").each(function(){var tmpImg=new Image;$(tmpImg).one("load",function(){imgComplete++});tmpImg.src=$(this).attr("src")});var interval=setInterval(function(){percent=imgNumber/100;loaded=imgComplete/percent;loaded=Math.round(loaded);$("#loading .percent").text(loaded+"%");if(loaded==100){clearInterval(interval);$("#loading").fadeOut(400);$("#loading #loading_img").stopRotate();$("#contents").icarus({mouseWheelSpeen:400,verticalSlideSpeed:400,fadeSlideSpeed:400,
classSlideSpeed:400})}},100)});