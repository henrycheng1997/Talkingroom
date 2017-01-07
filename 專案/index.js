var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile(__dirname+'/index.html');
});

var user_count = 0;

//有人連上
io.on('connection', function(socket){
  console.log('有個人連進來了!!');

//新的使用者(類似登錄)
  socket.on('add user',function(msg){
		socket.username = msg;
		console.log("新的使用者"+msg+" logged.");
		io.emit('add user',{
			username: socket.username
		});
	});

//獲得訊息事件
  socket.on('chat message',function(msg){
    console.log(socket.username+":"+ msg);

//發布訊息
    io.emit('chat message', {
			username:socket.username,
			msg:msg
		});
  });


//離開
  socket.on('disconnect', function(){
    console.log(socket.username+"left");
    io.emit('user left',{
      username:socket.username
    });
  });


});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
