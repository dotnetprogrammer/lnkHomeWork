$(function(){
	/*login*/
	var okId = 1;	//임시 아이디 지정
	var okPw = 1;	//임시 비번 지정
	var changePw = "no"; //임시 90일 체크
	
	$(".login .login_btn").click(function(){
		var idCheck = $(".userId").val();
		var pwCheck = $(".userPw").val();

		if(idCheck == ""){
			alert("아이디를 입력해 주세요.");
			$(".userId").focus();
		}else if(pwCheck == ""){
			alert("비밀번호를 입력해 주세요.");
			$(".userPw").focus();
		}else if((idCheck != okId) || (pwCheck != okPw)){
			alert(" 아이디 혹은 비밀번호가 다르게 입력되었습니다. \n (신규입사자의 경우 직원계정등록 및 부서장 승인이 \n 완료되어야 로그인 할 수 있습니다.)");
			$('.userId').val("");
			$('.userPw').val("");
			$(".userId").focus();
		}else{
			if(changePw == "no"){
				alert("신규사용자이거나 비밀번호 변경 후 90일이 경과되었습니다. \n확인 버튼을 눌러 새 비밀번호를 설정해 주시기 바랍니다.");	
				window.open("pw.html","changePw","top=200px,left=400px,width=568px,height=400px,scrollbars=no,resizable=no");
				$('.userId').val("");
				$('.userPw').val("");
        		return false;
			}else{
				var url = "../info/index.html";    
				$(location).attr('href',url);
			};
		};
		return false;
	});
			
	/*pw*/
	$(".pw_btn01").click(function(){
		var newPw01 = $(".userPw01").val();
		var newPw02 = $(".userPw02").val();		//신규 비밀번호		
		var newPw03 = $(".userPw03").val();		//신규 비밀번호 확인
		
		if(okPw != newPw01){
			alert("현재 비밀번호가 다르게 입력 되었습니다.");
			$(".userPw01").focus();
			$('.userPw01').val("");			
			if(newPw03 != newPw02){
				$(".userPw03").parent().children().eq(2).text("(불일치)");
			}else{
				$(".userPw03").parent().children().eq(2).text("(일치)");
			}
		}else if(newPw02 == ""){
			alert("새 비밀번호를 입력해 주세요.");
			$(".userPw02").focus();
		}else if(newPw01 == newPw02){
			alert("기존 번호와 상의한 번호를 입력해주세요.");
			$(".userPw03").parent().children().eq(2).text(" ");
			$(".userPw02").focus();
			$('.userPw02').val("");
			$('.userPw03').val("");			
		}else if(newPw03 == ""){
			alert("새 비밀번호를 재입력해 주세요.");
			$(".userPw03").focus();
		}else if(newPw03 != newPw02){
			$(".userPw03").parent().children().eq(2).text("(불일치)");
			$(".userPw03").focus();
			$('.userPw03').val("");			
		}else{
			$(".userPw03").parent().children().eq(2).text("(일치)");
			var answer = confirm("변경하시겠습니까?");			
			if(answer){				
				alert("변경이 완료되었습니다.");				
 			    var url = "../info/index.html";
 				opener.parent.location.replace(url);
 				self.close();		    
			}else{
				alert("취소되었습니다.");
				self.close();
			}
		}		
		return false;
	});
	
	$(".pw_btn02").click(function(){
		alert("취소되었습니다.");
		self.close();
	});
	
	
	/*mypage 확인 btn*/
	$(".mypage .btn_box>li").click(function(){
		var saveCheck = confirm("저장하시겠습니까?");
		if (saveCheck == true){
  			alert("저장되었습니다.");
  			var url = "../info/index.html";
			$(location).attr('href',url);
  		}else{
  			alert("취소되었습니다.");
  			var url = "../info/index.html";    
			$(location).attr('href',url);
  		};	
	});
	
		
});
