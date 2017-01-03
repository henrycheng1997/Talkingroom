var fs = require('fs'),
url = require('url'),
app = require('http').createServer(function(req, res) {
	var filename = '',
	resource = url.parse(req.url).pathname;
	switch(resource) {
		case '/test843a.js':
			console.log(resource);
			filename = __dirname + resource;
			res.setHeader('Content-Type', 'text/plain');
			break;
		case '/reset.css':
			console.log(resource);
			filename = __dirname + resource;
			res.setHeader('Content-Type', 'text/css');
			break;
        case '/ws.io/ws.io.js':
            console.log(resource);
            filename = __dirname + resource;
            res.setHeader('Content-Type', 'text/javascript');
            break;
		default:
			filename = __dirname + '/test843.html';
			res.setHeader('Content-Type', 'text/html');
			break;
	}
	fs.readFile(filename, function(err, data) {
		if(err) {
			res.writeHead(500);
			return res.end('Error reading resource.');
		} else {
			res.writeHead(200);
			res.end(data);
		}
	});
}),
io = require('./ws.io').listen(app),
rooms = require('./test843a');

io.idmap = {};

io.sockets.on('connection', function(socket) {
	socket.on('setnickname', function(m) {
		console.log('setnickname', m);
		if(typeof socket.manager.nicknames === 'undefined') {
			socket.manager.nicknames = {};
			socket.manager.nicknames[m] = {count:0};
			socket.set('nickname', m, function() {
				socket.emit('nicknamesuccess', {nickname:m,id:socket.id});
			})
			socket.manager.idmap[socket.id] = m;
		} else {
			if(typeof socket.manager.nicknames[m] === 'undefined') {
				socket.manager.nicknames[m] = {count:0};
				socket.set('nickname', m, function() {
					socket.emit('nicknamesuccess', {nickname:m,id:socket.id});
				});
				socket.manager.idmap[socket.id] = m;
			} else {
				socket.manager.nicknames[m].count++;
				var t = m + '' + socket.manager.nicknames[m].count;
				socket.set('nickname', t, function() {
					socket.emit('nicknamefail', {nickname:t,id:socket.id});
					t = null;
				});
				socket.manager.idmap[socket.id] = t;
			}
		}
	});
	socket.on('join', function(room) {
		if(checkroom(rooms, room)) {
			socket.set('room', room, function() {
				socket.get('nickname', function(err, nickname) {
					if(!err) {
                        socket.join(room,function(){console.log(socket.manager.idmap[socket.id]+' join:'+room,socket.manager.rooms);});
                        socket.emit('joinroomsuccess', {room:room});
						socket.in(room).emit('system', nickname + ' has joined this room.');
					}
				});
			});
		}
	});
	function getListInRoom(manager, room) {
		var ret = [];
		var a = manager.rooms['/'+room];
		if(!a) a = [];
		a.forEach(function(value) {
			ret.push([value, manager.idmap[value]]);
		});
		return ret;
	}
	socket.on('leave', function() {
		socket.has('room', function(error, has) {
			if(has) {				
				socket.get('room', function(error, room) {
					if(!error) {					
						socket.get('nickname', function(error, nickname) {
							if(!error) {
								socket.broadcast.in(room).emit('system', nickname + ' has left this room.');
								socket.leave(room, function() {
									console.log(socket.manager.idmap[socket.id]+' leave:'+room,socket.manager.rooms);
								});
							}
						});
					}
				});
			}
		});
	});
	socket.on('post', function(m) {
		socket.has('room', function(error, has) {
			if(has) {
				socket.get('room', function(error, room) {
					socket.broadcast.in(room).emit('msg', m);
				});
			} else {
				socket.emit('warning', 'You should chooese a chat room first.');
			}
		});
	});
	socket.on('disconnect', function() {
		socket.has('room', function(error, has) {
			if(has) {
				socket.get('room', function(error, room) {
					if(!error) {
						socket.get('nickname', function(error, nickname) {
							socket.broadcast.in(room).emit('system', nickname + ' has left this room.');
						});
					}
				});
			}
		});
	});
});

app.listen(8443);

function checkroom(rooms, room) {
	var ret = false;
	for(var i in rooms) {
		if(room==i && rooms[i] == 'public') {
			ret = true;
		} 
	}
	return ret;
}
