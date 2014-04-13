$(function(){
	//board_thum 게시판에 필요한 스크립트가 들어갑니다.
	
	/*멀티미디어 글 리스트가 홀수일때 빈공간 하단에 밑줄을 생성해 줍니다.*/
	var isList = $(".board_thum_list").length;
	if(isList){
		var isOdd = $(".board_thum_list>ul>li").length %2;
		if(isOdd){
			$(".board_thum_list>ul>li:last").css(
				"border-bottom","none"						
			);
			$(".board_thum_list>ul").css(
				"border-bottom","1px solid #e5e5e5"	
			);
		};
	};
});
