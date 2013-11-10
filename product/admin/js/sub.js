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
	var sortValidate = function(){
		var sortList = $(".productSort .orderNum");
		var sortRange = $(".productSort .orderNum").length;
		var sortData = $(".productSort .orderNum").map(function(){
			return this.value;
		}).get().join(", ");
		var dataArray = new Array(sortData);
		console.log(dataArray);
	};
	$(".btnArea .sort").click(function(){
		sortValidate();	
	});
});