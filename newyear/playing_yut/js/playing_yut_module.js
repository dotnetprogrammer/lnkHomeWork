$(function(){
	var data =(function(){
		return {
			funcNum : $(".headFunc a").length,
			stop : true,
			yutVal : 0,
			rollingCount : 0,
			moveVal : 0
		};
	}());
	var action =(function(){
		if(data.funcNum<2){
			$(".headFunc").css("padding-top","18px");
		}
		$(".play").click(function(e){
			control.lunch();
			$(this).attr("disabled","disabled");
			data.yutVal = Math.floor(Math.random()*4);
			data.moveVal += data.yutVal+1;
			control.moveIndi(data.moveVal);
			e.preventDefault();
		});
		$(".howTo a").on("click", function(e){
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				$("#layerWrap").hide();
				$("#layerWrap .viewRule").remove();
			} else {
				$(this).addClass("on");
				if ($(".view_2 a").hasClass("on")){
					$(".view_2 a").removeClass("on");
					clsLayer("viewItem");
				} else if ($(".view_1 a").hasClass("on")){
					$(".view_1 a").removeClass("on");
					$(".viewPlay").hide();
				} else if ($(".cancel a").hasClass("on")){
					//$(".cancel a").removeClass("on");
					$(".getItem").hide();
				}
				$("#layerWrap").show();
				control.makeLayer("rule");
			}
			e.preventDefault();
		});
		$(".view_1 a").click(function(e){
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				$("#layerWrap").hide();
				$("#layerWrap>div").hide();
			} else {
				$(this).addClass("on");
				if ($(".howTo a").hasClass("on")){
					$(".howTo a").removeClass("on");
					clsLayer("viewRule");
				} else if ($(".view_2 a").hasClass("on")){
					$(".view_2 a").removeClass("on");
					clsLayer("viewItem");
				} else if ($(".cancel a").hasClass("on")){
					//$(".cancel a").removeClass("on");
					$(".getItem").hide();
				} 
				$("#layerWrap").show();
				control.makeLayer("viewPlay");
			}
			e.preventDefault();
		});
		$(".view_2 a").click(function(e){
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				$("#layerWrap").hide();
				$("#layerWrap .viewItem").remove();
			} else {
				$(this).addClass("on");
				if ($(".howTo a").hasClass("on")){
					$(".howTo a").removeClass("on");
					clsLayer("viewRule");
				} else if ($(".view_1 a").hasClass("on")){
					$(".view_1 a").removeClass("on");
					$(".viewPlay").hide();
				} else if ($(".cancel a").hasClass("on")){
					//$(".cancel a").removeClass("on");
					$(".getItem").hide();
				} 
				$("#layerWrap").show();
				control.makeLayer("viewItem");
			}
			e.preventDefault();
		});
		$(".cancel").click(function(e){
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				$("#layerWrap").hide();
				$("#layerWrap>div").hide();
			} else {
				$(this).addClass("on");
				if ($(".howTo a").hasClass("on")){
					$(".howTo a").removeClass("on");
					clsLayer("viewRule");
				} else if ($(".view_1 a").hasClass("on")){
					$(".view_1 a").removeClass("on");
					$(".viewPlay").hide();
				} else if ($(".view_2 a").hasClass("on")){
					$(".view_2 a").removeClass("on");
					clsLayer("viewItem");
				} 
				$("#layerWrap").show();
				control.makeLayer("getItem");
			}
			e.preventDefault();
		});
		$("#layerWrap .cls").click(function(e){		
			$("#layerWrap").hide();
			control.clsLayer("viewRule");
			control.clsLayer("viewItem");
			$(".btns li a").removeClass("on");
			e.preventDefault();
		});
		$(".tabs li a").click(function(e){
			$(this).addClass("on");
			if($(this).parent("li").hasClass("tab_1")){
				$(".tab_2 a").removeClass("on");
				$(".getView").show();
				$(".spendView").hide();
			} else if ($(this).parent("li").hasClass("tab_2")){
				$(".tab_1 a").removeClass("on");
				$(".getView").hide();
				$(".spendView").show();
			}
			e.preventDefault();
		});
	}());
	var control = (function(){
		var rolling = function (idx,cnt){
			var animals = $(".animal ul li");
			animals.eq(idx).children("em").addClass("on");
			animals.eq(idx).children("em").parent("li").siblings().children("em").removeClass("on");

			if(data.rollingCount < 4) {
			  window.setTimeout(function(){
				data.rollingCount++;
					//rolling(idx+1>=cnt?0:idx+1, cnt);
					var temp = '';
					if( idx+1 >= cnt ){
						temp = 0;
					}else{
						temp = idx+1;
					}
					rolling( temp, cnt );
					
				},480);
			} else {
				window.setTimeout(function(){
				rollStop(data.yutVal);
					},800);
				data.rollingCount = 0;
			}
		};
		var lunch = function (){
			var cnt = $(".animal ul li").length;
			$(".animal ul li em").removeClass("on");
			$(".animal ul li em").removeClass("get");
			$(".playResult img").remove();
			rolling(0,cnt);
		};
		var rollStop = function (num){
			$(".animal ul li em").removeAttr("class");
			$(".animal ul li:eq("+num+") em").addClass("get");
			$(".play").removeAttr("disabled");
			writeTxt(num);
		};
		var writeTxt = function (num){
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
		};
		var moveIndi = function (num){
			window.setTimeout(function(){
				$(".indicator em").css("opacity","0");
				$(".indicator").removeAttr("class").addClass("indicator indicator_"+num).children("em").animate({opacity:1},1000, function(){
					$(".playBrd .pos_"+num+" em").addClass("on");
					if (num>20){
						alert("게임 끝");
						itemGetStatus();
					}
				});
			},3300);
		};
		var makeLayer = function (str){
			switch(str){
				case "rule" : makeRule();break;
				case "viewItem" : makeItem();break;
				case "viewPlay" : makePlayView();break;
				case "getItem" : makeGetItem();break;
			}
		};
		var makeRule = function (){
			var ruleLayer = "<div class=\"viewRule\">";
			ruleLayer += "<h4>윷놀이의 제왕 참여 방법</h4>";
			ruleLayer += "<dl><dt>이벤트 기간</dt><dd>1월 28일(화) 점검 후 ~ 2월 27일(목) 점검 전</dd></dl>";
			ruleLayer += "<dl><dt>참여방법</dt><dd>사냥터를 5회 클리어하면 복 주머니 3개를 드립니다. (복 주머니는 하루 최대 15회까지 받을 수 있습니다.)</dd><dd>획득한 복 주머니를 소모하여 윷을 던집니다. (모 또는 윷이 나올 경우 복 주머니 개수가 차감되지 않습니다.)</dd><dd>이동 완료 후 말이 멈춘 칸의 내용에 따라 골드 또는 아이템을 받을 수 있습니다. (골드 또는 아이템은 윷놀이를 그만하거나 1바퀴를 완주 할 때 지급합니다.)</dd><dd>윷놀이 완주 횟수(10회, 20회, 30회, 40회, 50회)에 따라 아티팩트를 드립니다.</dd></dl>";
			ruleLayer += "<dl><dt>주의사항</dt><dd>복 주머니 지급 횟수는 00시에 초기화 됩니다. </dd><dd>50회를 완주한 이후에는 윷놀이에 참여할 수 없습니다. </dd><dd>그만하기 버튼을 누를 경우 시작 지점부터 다시 진행합니다. </dd><dd>이벤트 기간 중 획득한 복 주머니는 누적됩니다. </dd><dd>강제로 브라우저가 종료된 경우 다시 접속하시면 이전에 획득했던 아이템을 받을 수 있습니다. </dd></dl>";
			$("#layerWrap").append(ruleLayer);
		};
		var makeItem = function (){
			var itemLayer = "<div class=\"viewItem\">";
			itemLayer += "<h4>보상아이템</h4>";
			itemLayer += "<div class=\"scrollArea\">";
			itemLayer += "<table><colgroup><col width=\"97\" /><col width=\"208\" /><col width=\"208\" /></colgroup><thead><tr><th>이미지</th><th>아이템명</th><th>효과</th></tr></thead><tbody><tr><td class=\"img\"><img src=\"./images/img_item_0.gif\" alt=\"티야의 선물\" /></td><td>티야의 선물</td><td>CP 425를 순간적으로 회복할 수 있다.</td></tr><tr><td class=\"img\"><img src=\"./images/img_item_1.gif\" alt=\"쿠이아의 선물\" /></td><td>쿠이아의 선물</td><td>HP 685를 순간적으로 회복할 수 있다.</td></tr><tr><td class=\"img\"><img src=\"./images/img_item_2.gif\" alt=\"투지의 비약\" /></td><td>투지의 비약</td><td>주공격 1단계 상승시켜 준다.</td></tr><tr><td class=\"img\"><img src=\"./images/img_item_3.gif\" alt=\"정제석\" /></td><td>정제석</td><td>고급장비 제작 시 사용된다.</td></tr><tr><td class=\"img\"><img src=\"./images/img_item_4.gif\" alt=\"말다의 열매 10개\" /></td><td>말다의 열매 10개</td><td>사냥터에서 사망했을 때 사용하면 부활할 수 있다.</td></tr><tr><td class=\"img\"><img src=\"./images/img_item_5.gif\" alt=\"판 대상단의 주머니 15일\" /></td><td>판 대상단의 주머니 15일</td><td>개인금고를 15일 동안 사용할 수 있다.</td></tr><tr><td class=\"img\"><img src=\"./images/img_item_6.gif\" alt=\"금색 복(오라) 무제한\" /></td><td>금색 복(오라) 무제한</td><td>아티팩트 오라</td></tr><tr><td class=\"img\"><img src=\"./images/img_item_7.gif\" alt=\"빨강색 소악마 날개(등) 무제한\" /></td><td>빨강색 소악마 날개(등) 무제한</td><td>아티팩트 망토</td></tr><tr><td class=\"img\"><img src=\"./images/img_item_8.gif\" alt=\"스킬 재분배 두루마리\" /></td><td>스킬 재분배 두루마리</td><td>해당 캐릭터가 습득한 모든 스킬을 초기화 하고, 투자한 스킬 포인트를 되돌려 준다.</td></tr></tbody></table>";
			itemLayer += "</div></div>";
			$("#layerWrap").append(itemLayer);
		};
		var clsLayer = function (txt){
			$("#layerWrap").hide();
			$("#layerWrap ."+txt).remove();
		};
		var makePlayView = function (){
			//여기다 참여내역 불러내는 함수를 쓰시면 될 듯..
			//alert("not yet"); //test
			$(".viewPlay").css("display","block");
		};
		var makeGetItem = function (){
			//여기다 아이템 받는 레이어 만드는 함수를 쓰시면 될 듯...
			//alert("not yet"); //test
			$(".getItem").css("display","block");
		};
		var itemGetStatus = function(){
			var playBrd = $(".playBrd > span em.on").length;
			var trap = $(".playBrd > span.item_5 em.on").length;
			var itemTot = playBrd-trap;
			alert("총 "+itemTot+"개의 아이템을 획득했습니다.");
		};
		return{
			rolling : rolling,
			lunch : lunch,
			rollStop : rollStop,
			writeTxt : writeTxt,
			moveIndi : moveIndi,
			makeLayer : makeLayer,
			makeRule : makeRule,
			makeItem : makeItem,
			clsLayer : clsLayer,
			makePlayView : makePlayView,
			makeGetItem : makeGetItem,
			itemGetStatus : itemGetStatus
		};
	}());
});