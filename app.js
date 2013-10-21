/*
var express = require("express")
	,http = require("http")
	,app = express()
	,httpserver = http.createServer(app)
	,io = require("socket.io").listen(httpserver)
	,mongo = require("mongoskin");
	
var port = process.env.PORT || 8088;
var mongoUrl = process.env.MONGOHQ_URL || "127.0.0.1:27017/takudb"; 
var db = mongo.db(mongoUrl);
var server = require("./server/server.js");
*/
	
	
// express 2.5

var express = require("express")
	,app = express.createServer()
	,io = require("socket.io").listen(app)
	,mongo = require("mongoskin");
var port = process.env.PORT || 8088;
var mongoUrl = process.env.MONGOHQ_URL || "127.0.0.1:27017/takudb"; 
var db = mongo.db(mongoUrl);
var server = require("./server/server.js");

	


// 셋팅
//app.use("/public", express["static"](__dirname + "/public"));
app.use("/client", express["static"](__dirname + "/client"));
app.use(express.bodyParser());
app.set("view engine", "jade");
app.set("view options", {layout:false});
app.set("views", __dirname + "/view");
//app.set("views", __dirname + "/jade/pushboard");

//takudb의 pushboard 테이블 가져와서 뿌리기
/* 
db.collection('pushboard').find().sort({_id:0}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
}); 
*/

// listen
//httpserver.listen(port);
app.listen(port);
// index페이지
/*
app.get('/', function (req, res) {
	res.render("./index", {title:"Welcome"});
});
*/

// pushboard 초기화
server.init(app, db, io);

// 오목 초기화
//omok.init(app, db, io);