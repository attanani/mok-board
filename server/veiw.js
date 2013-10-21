/**
 * @author Administrator
 */


function makeTmplete(a){
		var tpl = '<li class="commentRowLi"><div class="uiCommentWrap"><div class="clearFloat"><div class="leftFloat"><a href="#"><img class="imgs cardImg" src=' + a.cardImg
		+ ' alt="img"></a></div><div><div><div class="commentBox"><div><span class="cName">' + a.name
		+ '</span><span> </span><span class="cComment">' + a.comment
		+ '</span></div><div class="uci"><span>' + a.date
		+ '</span><span> </span><span>' + a.where
		+ '</span></div><div></div></div></div></div><li>';
		
		return tpl;
		
	};