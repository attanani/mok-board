/**
 * @author Administrator
 */


var clientFunction = {
	makeTmplete:function(a){
		var tpl = '<li class="commentRowLi"><div class="uiCommentWrap"><div class="clearFloat"><div class="leftFloat"><a href="#"><img class="imgs cardImg" src=' + a.cardImg
		+ ' alt="img"></a></div><div><div><div class="commentBox"><div><span class="cName">' + a.name
		+ '</span><span> </span><span class="cComment">' + a.comment
		+ '</span></div><div class="uci"><span>' + a.date
		+ '</span><span> </span><span>' + a.where
		+ '</span></div><div></div></div></div></div><li>';
		
		return tpl;
		
	}
	
}

var PREFIX = "/pp";

exports.init = function(app, db, io){
	var pb_comment_db = db.collection("pushboard-comment")
		, pb_article_db = db.collection("pushboard-comment");
	

	// 메인화면
	app.get("/", function(req, res){
		res.render("./index", {
			title:"푸쉬보드!"
		});
	});
	
	// article 가져오기
	app.get("/getArticle", function(req, res){
	//app.get("/getList", function(req, res){
			console.log("Call!! pushboard.getList()");
		var list = [];
		
		// get comments
		pb_comment_db.find().sort({_id:1}).limit(100).toArray(function(err, content){
			if (err){
				res.end('getList error :(');
			} else {
				//console.log(typeof content);
				res.json({list:content});
				//res.send({list:content});
			}
		});
		//////
		
		// get articles
		pb_article_db.find().sort({_id:1}).limit(100).toArray(function(err, content){
			if (err){
				res.end('getList error :(');
			} else {
				//console.log(typeof content);
				res.json({list:content});
				//res.send({list:content});
			}
		});
		//////
		
	});
	
	
	// comments 가져오기
	app.get("/getComment", function(req, res){
	//app.get("/getList", function(req, res){
			console.log("Call!! pushboard.getList()");
		var list = [];
		
		// get comments
		pb_comment_db.find().sort({_id:1}).limit(100).toArray(function(err, content){
			if (err){
				res.end('getList error :(');
			} else {
				//console.log(typeof content);
				res.json({list:content});
				//res.send({list:content});
			}
		});	
	});
	
	// article 가져오기
	app.get("/getArticle", function(req, res){
		// get articles
		pb_article_db.find().sort({_id:1}).limit(100).toArray(function(err, content){
			if (err){
				res.end('getList error :(');
			} else {
				//console.log(typeof content);
				res.json({list:content});
				//res.send({list:content});
			}
		});	
	});
	
	// 글쓰기
	//app.post("/write", function(req, res){
	//	pb.insert({content:req.body.content});
	//	res.end('엇 글쓰기 안된다');
	//});
	
	// 푸쉬소켓
	io.of(PREFIX + "/push").on("connection", function(socket){
		console.log("server.js 푸쉬소켓 연결!");
		socket.on("newContent", function(data){
			console.log("newContent = " + data);
			
			pb_comment_db.insert(data);
			
			socket.emit("newContent", data, clientFunction.makeTmplete);
			socket.broadcast.emit("newContent", data, clientFunction.makeTmplete);
		});
		
		socket.on("newArticle", function(data){
				pb_article_db.insert(data);
				socket.emit("newArticle", data, clientFunction.makeTmplete);
				socket.broadcast.emit("newArticle", data, clientFunction.makeTmplete);
		});
		
		
		socket.on("disconnect", function(){
		});
	});
}
