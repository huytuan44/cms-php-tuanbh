(function($) {
    if(localStorage.getItem('user') != null){
        $('.unlogin').css('display', 'none');
        $('.login-success').css('display', 'block');
        var user = JSON.parse(localStorage.getItem('user'));
        if (user.type == 'user') {
            $('#admin-page').css('display', 'none');
        }
    };    

    //login
  $('#login').on("click", function() {
    $(".form-login").css('display', 'block');
    $(".form-signup").css('display', 'none');
    $('.form-create-post').css('display', 'none');
    $(".modal-custom").css('display', 'block');
  });
  $('#login-form-exit').on("click", function() {
    $(".form-login").css('display', 'none');
    $(".modal-custom").css('display', 'none');
  });
  $('#login-form-submit').on('click', function() {

  });

  //sign up
  $('#signup').on("click", function() {
    $(".form-signup").css('display', 'block');
    $(".form-login").css('display', 'none');
    $('.form-create-post').css('display', 'none');
    $(".modal-custom").css('display', 'block');
  });
  $('#signup-form-exit').on("click", function() {
    $(".form-signup").css('display', 'none');
    $(".modal-custom").css('display', 'none');
  });

  window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
      $(".modal-custom").css('display', 'none');
    }
  }
    
    $('#login-form-submit').click(function() {
        let username = $('#login-username').val();
        let password = $('#login-password').val();
        $.ajax({
            type: 'POST',
            url: defaultUrl + '/api/login',
            data: {
                'username': username,
                'password': password
            },
            success: function(res) {
                if(res.code === 200) {
                    $('.unlogin').css('display', 'none');
                    $('.login-success').css('display', 'block');
                    $(".form-login").css('display', 'none');
                    $('#modal').css('display', 'none');
                    localStorage.setItem('user', JSON.stringify(res.data));
                }
                else {
                    alert(res.status);
                }
            }
        });
    })

    $('#logout').click(function() {
        localStorage.removeItem('user');
        $('.unlogin').css('display', 'block');
        $('.login-success').css('display', 'none');
    })
    
})(jQuery)