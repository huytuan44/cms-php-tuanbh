$('#login').click(function(){
    $('#myForm').css('display', 'block');
})

function closeForm(){
    $('#myForm').css('display', 'none')
}

$('#btn-submit').on('click', function() {
    $.ajax({
        type: "POST",
        url: "https://cms-php.local/home",
        success: function (res) {
            console.log(res);
        },
        error: function(msg) {
            console.log(msg['statusText']);
        }
        
    })
})