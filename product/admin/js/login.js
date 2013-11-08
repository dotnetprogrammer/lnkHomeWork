$(function(){ 
  var idArea = $(".loginPanel .id");
  var pwArea = $(".loginPanel .pw");
  var loginBtn = $(".loginPanel .btn");
  idArea.on("focusin",function(){
    $(this).addClass("id_on");
  }).on("focusout",function(){
    if($(this).val()==''){
      $(this).removeClass("id_on");
    } else {
      return false;
    }
  });
  pwArea.on("focusin",function(){
    $(this).addClass("pw_on");
  }).on("focusout",function(){
    if($(this).val()==''){
      $(this).removeClass("pw_on");
    } else {
      return false;
    }    
  });
  loginBtn.click(function(){
    valueChk();
  });
  function valueChk(){
    var idAreaValue = idArea.val();
    var pwAreaValue = pwArea.val();
    if(pwAreaValue=="" && idAreaValue ==""){
      alert("ID와 비밀번호를 입력하세요");
    } else if(idAreaValue==""){
      alert("ID를 확인해주세요");
    } else if(pwAreaValue==""){
      alert("비밀번호를 확인해주세요");
    }
  }
});