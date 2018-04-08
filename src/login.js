$(function () {


    function openLoginWin() {
        $(".dialog-mask").addClass("show");
        $('#dialog-login').addClass("show");
    }

    /*$.get('http://47.52.170.220:8080/etss/api/v1/user/islogin', {token:'adfd'}, function (e) {
        console.log(e);
    });*/
    $.ajax({
        type: "GET",
        url:'/api/v1/user/islogin',
        headers: {
            'Accept': "application/json; charset=utf-8"
        },
        accept:{'token':'wet'},
        success: function (data) {
            console.log(data);
        },
        error: function (e) {
            console.log(e);
        }
    });

    openLoginWin();

});