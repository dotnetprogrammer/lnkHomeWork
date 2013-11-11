$(function(){
	$("aside").css("height",$(window).height()-69);
	$(window).resize(function(){
		$("aside").css("height",$(window).height()-69);
	});
	$(".companyFrm .btn").click(function(){
		var frmStr = $(".companyFrm .txt").val();
		if(frmStr==''){
			alert("내용을 입력하세요");
		} else {
			return false;
		}
	});
	var btnAreaWidth = $(".news table").css("width");
	$(".news .btnArea").css("width",btnAreaWidth);

	var msg1 = "URL 입력";
	var msg2 = "스크린샷 업로드 또는 유투브 url 직접 입력"
	$(".dnLink").on("focusin",function(){
		$(this).val("").css("text-align","left");
	}).on("focusout",function(){
		if($(this).val()=='' && $(this).hasClass("thumb")){
			$(this).val(msg2).css("text-align","center");
		} else if ($(this).val()=='' && $(this).hasClass("single")){
			$(this).val(msg1).css("text-align","center");
		} else {
			return false;
		}
	});	
	$(".title").keyup(function(){
		chkBytes("title");
	});
	$(".allTxt").keyup(function(){
		chkBytes("allTxt");
	});
	$(".allTxtNews").keyup(function(){
		chkBytes("allTxtNews");
	});
	function chkBytes(node){
		var getBytes = $("."+node).val().length;
		if(node=="title" && getBytes>=50){
			alert("제목은 최대 50자 입니다.");
		} else if (node=="allTxt" && getBytes>=150){
			alert("전문은 최대 150자 입니다.");
		} else if (node=="allTxtNews" && getBytes>=200){
			alert("소식 등록은 최대 200자 입니다.");
		}
	}
	$(".news .btnArea .sort").click(function(){
		var txts = [];
		//console.log(txts);
		var dataLen = $(".orderNum").length;
		$(".orderNum").each(function(idx){
			var thisVal = $(this).val();
			if($(this).val()==""){
				alert("빈 칸이 있습니다. 정확한 값을 입력하세요");
				$(this).focus();
				return false;
			} else if ($(this).val()=="0"){
				alert("0은 입력할 수 없습니다. 1부터"+dataLen+"까지의 숫자를 입력하세요.");
				$(this).focus();
				return false;
			} else if ($(this).val()>dataLen){
				alert("제품소개 갯수보다 큰 값은 입력할 수 없습니다. 1부터"+dataLen+"까지의 숫자를 입력하세요.");
				$(this).focus();
				return false;
			}
			for(var i=0, len=txts.length;len>i; i++){
				if(txts[i] == thisVal){
					alert("겹치는 값이 있습니다. 순서에 맞게 입력하세요");
					$(this).focus();
					return false;
				}
			};
			txts.push(thisVal);
			//console.log(txts);
		});
	});
	$(".createNews .btnArea .regist").click(function(){
		var pub = $(".pub :radio:checked");
		var titleStr = $(".createNews .title");
		var allTxtNews = $(".createNews .allTxtNews");
		var thumb = $(".createNews .thumb");
		//console.log(titleStr.length);
		if (pub.length!=1){
			alert("게시, 미게시 여부를 지정하세요");
			return false;
		} else if (titleStr.val().length<=0){
			alert("제목을 입력하세요");
			$(titleStr).focus();
			return false;
		} else if (allTxtNews.val().length<=0){
			alert("전문을 입력하세요");
			$(allTxtNews).focus();
			return false;
		} else if (thumb.val().length<=0){
			alert("썸네일을 입력하세요");
			$(thumb).focus();
			return false;
		}
	});
	$(".createProduct .btnArea .regist").click(function(){
		var gameType = $(".gameType :radio:checked");
		var titleStr = $(".createProduct .title");
		var allTxt = $(".createProduct .allTxt");
		var thumbNail = $(".createProduct .thumbNail");
		var thumb = $(".createProduct .multiple input");
		var guide_1 = $(".createProduct .guide_1");
		var guide_2 = $(".createProduct .guide_2");
		var client = $(".createProduct .client");
		if (gameType.length!=1){
			alert("게임 구분을 지정하세요");
			return false;
		} else if (titleStr.val().length<=0){
			alert("제목을 입력하세요");
			$(titleStr).focus();
			return false;
		} else if (allTxt.val().length<=0){
			alert("전문을 입력하세요");
			$(allTxt).focus();
			return false;
		} else if (thumbNail.val().length<=0){
			alert("썸네일을 입력하세요");
			$(thumbNail).focus();
			return false;
		} else if (thumb.val()==msg2 || thumb.val().length<=0){
			alert("멀티미디어 파일을 입력하세요");
			$(".createProduct .multiple input").focus();
			return false;
		} else if (guide_1.val()==msg1 || guide_1.val().length<=0){
			alert("제품소개서 url을 입력하세요");
			$(guide_1).focus();
			return false;
		} else if (guide_2.val()==msg1 || guide_2.val().length<=0){
			alert("게임가이드 url을 입력하세요");
			$(guide_2).focus();
			return false;
		} else if (clinet.val()==msg1 || clinet.val().length<=0){
			alert("클라이언트 url을 입력하세요");
			$(clinet).focus();
			return false;
		}
	});
});