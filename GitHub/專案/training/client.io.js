//socket.io

<script src="/socket.io/socket.io.js"><script>
<script>
var socket =io.connect('https://cdn.socket.io/socket.io-1.4.5.js');
socket.on('news',function(data){
    console.log(data);
    socket.emit('my other event',{my:'data'});
});
</script>