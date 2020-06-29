
if(localStorage.getItem('user')) {
    var user = JSON.parse(localStorage.getItem('user'));
}
if(user) {
    $('#email').html(user.email);
    $('.login').css('display', 'none');
    $('.user').css('display', 'block');
}

$('#login').click(function(){
    $('#myForm').css('display', 'block');
})

function closeForm(){
    $('#myForm').css('display', 'none')
}

$('#btn-submit').on('click', function() {
    var data = {
        username: $('#username').val(),
        password: $('#password').val()
    }
    $.ajax({
        type: "POST",
        url: "https://cms-php.local/login",
        data: data,
        success: function (res) {
            res = JSON.parse(res);
            console.log(res.data.email);
            if (res.status === 'ok') {
                $('#email').html(res.data.email);
                $('.login').css('display', 'none');
                $('.user').css('display', 'block');
                $('#myForm').css('display', 'none');
                localStorage.setItem('user', JSON.stringify(res.data));
            }
        },
        error: function(msg) {
            console.log(msg['statusText']);
        }
        
    })
})

$('#logout').click(() => {
    console.log('logout success');
    $('.login').css('display', 'block');
    $('.user').css('display', 'none');
    localStorage.removeItem('user');
})