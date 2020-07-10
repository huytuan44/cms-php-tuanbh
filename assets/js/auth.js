(function ($) {
  if (localStorage.getItem('user') != null) {
    $('.unlogin').css('display', 'none');
    $('.login-success').css('display', 'block');
    var user = JSON.parse(localStorage.getItem('user'));
    $('#username').html(user.username);
    if (user.type == 'user') {
      $('#admin-page').css('display', 'none');
    }
  };

  //login
  $('#login').on("click", function () {
    $(".form-login").css('display', 'block');
    $(".form-signup").css('display', 'none');
    $('.form-create-post').css('display', 'none');
    $('.form-create-image').css('display', 'none');
    $(".modal-custom").css('display', 'block');
  });
  $('#login-form-exit').on("click", function () {
    $(".form-login").css('display', 'none');
    $(".modal-custom").css('display', 'none');
  });
  $('#login-form-submit').on('click', function () {

  });

  //sign up
  $('#signup').on("click", function () {
    $(".form-signup").css('display', 'block');
    $(".form-login").css('display', 'none');
    $('.form-create-post').css('display', 'none');
    $('.form-create-image').css('display', 'none');
    $(".modal-custom").css('display', 'block');
  });
  $('#signup-form-exit').on("click", function () {
    $(".form-signup").css('display', 'none');
    $(".modal-custom").css('display', 'none');
  });

  window.onclick = function (event) {
    if (event.target == document.getElementById('modal')) {
      $(".modal-custom").css('display', 'none');
    }
  }

  $('#login-form-submit').click(function () {
    let username = $('#login-username').val();
    let password = $('#login-password').val();
    $.ajax({
      type: 'POST',
      url: defaultUrl + '/api/login',
      data: {
        'username': username,
        'password': password
      },
      success: function (res) {
        if (res.code === 200) {
          $('.unlogin').css('display', 'none');
          $('.login-success').css('display', 'block');
          $(".form-login").css('display', 'none');
          $('#modal').css('display', 'none');
          let currentUser = res.data;
          localStorage.setItem('user', JSON.stringify(currentUser));
          $('#username').html(currentUser.username);
          if (currentUser.type !== 'admin') $('#admin-page').css('display', 'none');
        }
        else {
          alert(res.status);
        }
      }
    });
  })

  $('#signup-form-submit').click(function () {
    let username = $('#signup-username').val();
    let email = $('#signup-email').val();
    let password = $('#signup-password').val();
    let gender = $("input[name='signup-gender']:checked").val();
    let age = $('#signup-age').val();
    $.ajax({
      type: 'POST',
      url: defaultUrl + '/api/signup',
      data: {
        'username': username,
        'email': email,
        'password': password,
        'gender': gender,
        'age': age
      },
      success: function(res) {
        if(res.code === 200) {
          getUserByUsername(username);
          $('.unlogin').css('display', 'none');
          $('.login-success').css('display', 'block');
          $(".form-signup").css('display', 'none');
          $('#modal').css('display', 'none');
        } else {
          alert(res.status);
        }
      }
    })
  })

  $('#logout').click(function () {
    localStorage.removeItem('user');
    $('.unlogin').css('display', 'block');
    $('#username').html('');
    $('.login-success').css('display', 'none');
  })

  getUserByUsername = function(username) {
    $.ajax({
      type: 'GET',
      url: defaultUrl + '/api/getUser',
      data: {
        'username': username
      },
      success: function(res) {
        if(res.code === 200) {
          let currentUser = res.data[0];
          localStorage.setItem('user', JSON.stringify(currentUser));
          $('#username').html(currentUser.username);
          if (currentUser.type != 'admin') $('#admin-page').css('display', 'none');
        } else {
          alert(res.status);
        }
      }
    })
  }
})(jQuery)