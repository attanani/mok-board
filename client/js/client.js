var socket;
$(document).ready(function(){
	
	var toData = {"articleNo":001, "cardImg":"client/img/wesh.png", "name":"Lee Jungman", "comment":"", "date":"Now", "where":"At Home"},
		containerForComment = $('.commentRowUi'),
		mktc;
	
	function makeTmplete(a){
		var tpl = '<li class="commentRowLi"><div class="uiCommentWrap"><div class="clearFloat"><div class="leftFloat"><a href="#"><img class="imgs cardImg" src=' + a.cardImg
		+ ' alt="img"></a></div><div><div><div class="commentBox"><div><span class="cName">' + a.name
		+ '</span><span> </span><span class="cComment">' + a.comment
		+ '</span></div><div class="uci"><span>' + a.date
		+ '</span><span> </span><span>' + a.where
		+ '</span></div><div></div></div></div></div><li>';
		
		return tpl;
		
	};
	
	function inputCommentElement(data){
		
			
			var tt = makeTmplete(data);
	 		$(tt).appendTo(containerForComment);
		
	};
	
	$(".commentSendBtn").click(function(){
	 	
	 	var uiComment = $(".innerTextWrap textarea").val();
	 	
	 	
		if (uiComment == ""){
			alert("글을 입력하세요.");
			return;
		}else{
			toData.comment=uiComment;
			socket.emit("newContent", toData)
			$(".innerTextWrap textarea").val("");
		}
	});
	
	
	// 최초 글 가져오기
	getList();
	
	// 푸쉬서버연결
	socket = io.connect("/pp/push").on("newContent", function(data, mktc2){
		console.log(mktc2)
		inputCommentElement(data);
	});
	
	function getList(){
	$.get("getList", {}, function(data){
		console.log(data);
		
		for (var i=0; i<data.list.length; i++){
			inputCommentElement(data.list[i]);
		}
	});
}

});