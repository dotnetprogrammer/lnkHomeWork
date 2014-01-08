$(function(){
	var stop=true;
	var yutVal = 0;
	var rollingCount = 0;
	$(".play").click(function(e){
		lunch();
		$(this).attr("disabled","disabled");
		yutVal = Math.floor(Math.random()*4); //테스트용 임시 난수 생성
		moveVal = Math.floor(Math.random()*19); //테스트용 임시 난수 생성
		moveIndi(moveVal); //moveVal에 생성된 결과값을 태워서 보내면 됨.
		e.preventDefault();
	});
	
	function rolling(idx,cnt){
		var animals = $(".animal ul li");
		animals.eq(idx).children("em").addClass("on");
		animals.eq(idx).children("em").parent("li").siblings().children("em").removeClass("on");

		if(rollingCount < 4) {
		  window.setTimeout(function(){
			  rollingCount++;
				rolling(idx+1>=cnt?0:idx+1,cnt);
			},480);
			} else {
			  window.setTimeout(function(){
			  rollStop(yutVal);
			},800);
			  rollingCount = 0;
			}
	}
	function lunch(){
		var cnt = $(".animal ul li").length;
		$(".animal ul li em").removeClass("on");
		$(".animal ul li em").removeClass("get");
		$(".playResult img").remove();
		rolling(0,cnt);
	}
	function rollStop(num){
			$(".animal ul li em").removeAttr("class");
		$(".animal ul li:eq("+num+") em").addClass("get");
		$(".play").removeAttr("disabled");
		writeTxt(num);
	}
	function writeTxt(num){
		switch(num){
			case 0:
				$(".playResult").html("<img src=\"./images/txt_char_"+num+".png\" alt=\"도\" />");
				break;
			case 1:
				$(".playResult").html("<img src=\"./images/txt_char_"+num+".png\" alt=\"개\" />");
				break;
			case 2:
				$(".playResult").html("<img src=\"./images/txt_char_"+num+".png\" alt=\"걸\" />");
				break;
			case 3:
				$(".playResult").html("<img src=\"./images/txt_char_"+num+".png\" alt=\"윷\" />");
				break;
			case 4:
				$(".playResult").html("<img src=\"./images/txt_char_"+num+".png\" alt=\"모\" />");
				break;
		}
	}
	function moveIndi(num){
		window.setTimeout(function(){
			$(".indicator em").css("opacity","0");
			$(".indicator").removeAttr("class").addClass("indicator indicator_"+num).children("em").animate({opacity:1},1000, function(){
				$(".playBrd .pos_"+num+" em").addClass("on");
			});
		},3300);
	}
});