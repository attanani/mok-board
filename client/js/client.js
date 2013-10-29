var socket;
var isFocus=false;
$(document).ready(function(){
	
	
	
	
	var toData = {"articleNo":001, "cardImg":"client/img/wesh.png", "name":"Lee Jungman", "comment":"", "date":"Now", "where":"At Home", "articleImg":"client/img/audi_tt.png"},
		containerForComment = $('.commentRowUi'),
		containerForMainBox = $('section'),
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

	function makeMainBox(articleData){
		var tpl = '<div class="main-box"><div class="content-wrap"><div class="author-wrap"><div class="uiCommentWrap '
		// Article Number
		 + articleData.articleNo
		//+ "article001"
		+ ' uiauthor-box"><div class="clearFloat"><!-- 사진 --><div class="leftFloat"><a><img class="imgs cardImg" src='
		// Author Profile Image
		+ articleData.cardImg
		//+ "client/img/wesh.png"
		+ ' alt="Authoer Profile Img"></a></div><div><div><div class="commentBox"><div><span class="cName">'
		// Author Name
		+ articleData.name
		//+ "이정만"
		+ '</span></div><div class="uci"><span>'
		// 작성시간
		+ articleData.date
		//+ "09월 17일"
		+ '</span><span></span><span>'
		// 작성한곳
		+ articleData.where
		//+ "집에서"
		+ '</span></div></div></div></div></div></div></div><div class="text-box">	<div>'
		// 본문 내용
		+ articleData.comment
		//+ "안녕하세요!!"
		+ '</div></div><div class="img-box"><img src='
		// 본문 이미지 들어가는 곳
		+ articleData.articleImg
		//+ "client/img/audi_tt.png"
		+ ' alt="contentBodyImg"></div><div><ul id="lvContent" data-role="listview"><li></li></ul></div><div>'
		+ '	<ul class="commentRowUi">	</ul>'
		+ '<div class="clearFloat commentRowLi uiCommentWrap"><div class="rightFloat commentSendBtn"></div><div class="textWrap"><input type="hidden" name="hiddeninput" autocomplete="off" class="hiddenInput" value="">'
		+ '	<div class="innerTextWrap"><textarea></textarea></div></div></div></div></div>	</div>'
		
		return tpl;
	}

	function inputCommentElement(data){
		
			
			var tt = makeTmplete(data);
	 		$(tt).appendTo(containerForComment);
		
	};
	
	function inputMainBoxElement(){
		
			
			var tt = makeMainBox();
	 		$(tt).appendTo(containerForMainBox);
		
	};
	
	$(".innerTextWrap textarea").focus(function(){
		
		isFocus = true;
	});
	
		$(".innerTextWrap textarea").blur(function(){
		
		isFocus = false;
	});
	
	
	
	
 	$(document).keypress(function(e){ 		
 		if(isFocus === true && e.keyCode==13){
	 		var uiComment = $(".innerTextWrap textarea").val();
	 	
			if (uiComment == ""){
				alert("글을 입력하세요.");
				return;
			}else{
				toData.comment=uiComment;
				socket.emit("newContent", toData);
				$(".innerTextWrap textarea").val("");
 			}
 		}
  	});

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
	
	function articleWrite(){
		var uiComment = $(".write-text-wrap textarea").val();
	 	
	 	
		if (uiComment == ""){
			alert("글을 입력하세요.");
			return;
		}else{
			toData.comment=uiComment;
			socket.emit("newArticle", toData)
			$(".write-text-wrap textarea").val("");
		}
	};
	
	$(".articleSendBtn").click(function(){
	 	
	 	var uiComment = $(".write-text-wrap textarea").val();
	 	
	 	
		if (uiComment == ""){
			alert("글을 입력하세요.");
			return;
		}else{
			toData.comment=uiComment;
			socket.emit("newArticle", toData)
			$(".write-text-wrap textarea").val("");
		}
	});
	
	
	// 최초 글 가져오기
	//getComments();
	getArticles();
	// 푸쉬서버연결
	socket = io.connect("/pp/push").on("newContent", function(data, mktc2){
		console.log(mktc2)
		inputCommentElement(data);
	});
	
	function getComments(){
		$.get("getComment", {}, function(data){
			console.log(data);
		
			for (var i=0; i<data.list.length; i++){
				inputCommentElement(data.list[i]);
			}
		});			
	}; // end of getComments
	
	function getArticles(){
		$.get("getArticle", {}, function(data){
			console.log(data);
		
			for (var i=0; i<data.list.length; i++){
				//inputMainBoxElement(toData);
				inputMainBoxElement(data.list[i]);
			}
		});			
	}; // end of getArticles
	

});