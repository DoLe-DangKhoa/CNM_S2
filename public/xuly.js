 var socket = io('http://localhost:3000');

socket.on('server-send-dangki-thatbai', function () {
    alert('username da co nguoi su dung');
});

socket.on('server-send-dangki-thanhcong', function (data) {
    $('#currentUser').html(data);
    $("#loginForm").hide();
    $("#chatForm").show();
});

socket.on('server-send-dangki-danhsach-Users', function (data) {
    $('#boxContent').html('');
    data.forEach( function(i) {
        $('#boxContent').append(" <div class='user'>" +i+ "</div> ");
    });
});

socket.on('server-send-dangki-thatbai', function () {
    alert('username da co nguoi su dung');
});

socket.on('ai-do-dang-go-chu', function (data) {
    $('#thongbao').
    html("<img width='20px' src='https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw340' >"+data);
});
socket.on('ai-do-STOP-go-chu', function () {
    $('#thongbao').html('');
});

socket.on('server-send-message', function (data) {
    $('#listMessages').append('<div class="messages">' +data.name+ ": "+data.noidung +'</div>');
});

 $(document).ready(function(){           
    $("#loginForm").show();
    $("#chatForm").hide();

    $("#btnRegister").click(function(){
        socket.emit('client-send-Username', $("#txtUserName").val());
    });

    $("#btnLogout").click(function(){
        socket.emit('logout');
        $("#chatForm").hide();
        $("#loginForm").show();       
    });

    $("#txtMessage").focusin(function(){
        socket.emit('dang-go-chu');
    });
    $("#txtMessage").focusout(function(){
        socket.emit('ngung-go-chu');
    });


    $("#btnSendMessage").click(function(){
        socket.emit('user-send-message',$('#txtMessage').val());      
    });
});
