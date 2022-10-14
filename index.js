var express = require('express');
const { inflate } = require('zlib');
var app = express();
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views','./views');


var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000, () => {
    console.log(`App listening on port 3000`)
});

var mangUSers=[];
io.on("connection", function(socket){
    console.log('co ng ket noi: ' +socket.id);

    //Nhận lệnh disconnected
    socket.on('disconnect', function(){
        console.log(socket.id,'socket disconnected');
    });
    //Nhận lện đăng ký user
    socket.on('client-send-Username', function(data){
        if(mangUSers.indexOf(data) >=0){
            //fail
            socket.emit('server-send-dangki-thatbai');
        }else{
            //successful
            mangUSers.push(data); //day data vao mang
            socket.Username = data;
            socket.emit('server-send-dangki-thanhcong',data);
            io.sockets.emit('server-send-dangki-danhsach-Users',mangUSers);
        }
    });
    //Nhận lệnh đăng xuất
    socket.on('logout', function(){
        mangUSers.splice(
            mangUSers.indexOf(socket.Username),1
        );
        socket.broadcast.emit('server-send-dangki-danhsach-Users',mangUSers);
    });

    //Nhận lệnh send data chat
    socket.on('user-send-message', function(data){
        io.sockets.emit('server-send-message',{name:socket.Username, noidung:data});
    });

    //Nhận phan hoi thong bao co ng dang go noi dung chat
    socket.on('dang-go-chu', function(){
        var s = socket.Username+ " dang nhap chu";
        io.sockets.emit('ai-do-dang-go-chu',s);
    });
    socket.on('ngung-go-chu', function(){
        io.sockets.emit('ai-do-STOP-go-chu');    
    });

});

app.get('/', function(req, res) {
    res.render('trangchu');
});