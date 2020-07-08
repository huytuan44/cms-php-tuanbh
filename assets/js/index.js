
$(function() {

  // owl carousel script starts
  if ($("#main-banner-carousel").length) {
    $("#main-banner-carousel").owlCarousel({
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplaySpeed: 2000,
      autoplayHoverPause: true,
      autoWidth: false,
      dots: true,
      margin: 0,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1
        },
        320: {
          items: 1
        }
      }
    });
  }

  // scroll header script here
  window.onscroll = function() {
    scrollHeader();
  };
  // Get the header
  var header = $(".navbar-bottom-menu");
  var body = $("body");
  function scrollHeader() {
    // adding sticky class
    if (window.pageYOffset > 105) {
      $(header).addClass("sticky");
    } else {
      // removing sticky class
      $(header).removeClass("sticky");
    }
  }

  // navbar toggler script
  $(".navbar-toggler").on("click", function() {
    $(".collapse").toggleClass("show");
    $("body").toggleClass("layer-open");
    // $(header).toggleClass("sticky-not");
    $(".navbar-close").show();
  });
  $(".navbar-close").on("click", function() {
    $(".collapse").toggleClass("show");
    $(".navbar-close").hide();
    $("body").toggleClass("layer-open");
    // $(header).toggleClass("sticky-not");
    $(".dark-overlay").click(function() {
      $(".collapse").removeClass("show");
      $("body").removeClass("layer-open");
    });
  });

  $('#create-post').click(function() {
    $('#modal').css('display', 'block');
    $('.form-create-post').css('display', 'block');
  })

  $('#upload-image-post').on('change', function(event) {
    var image = document.getElementById('show-image-post');
    image.src = URL.createObjectURL(event.target.files[0]);
  })

  $('.modal-exit').click(function() {
    $('#modal').css('display', 'none');
    $('.form-create-post').css('display', 'none');
  })

  $.ajax({
    type: 'GET',
    url: defaultUrl + '/api/getChannel',
    success: function(res) {
      if (res.code === 200) {
        let html = '';
        res.data.forEach(element => {
          html += `<option value='${element.id}'>${element.channel_name}</option>`;
        });
        $('#channel-post').html(html);
      } else {
        alert(res.status);
      }
    }
  });

  $.ajax({
    type: 'GET',
    url: defaultUrl + '/api/getPost',
    success: function(res) {
      if (res.code === 200) {

      } else {
        alert(res.status);
      }
    }
  })

  $('#create-post-submit').click(function() {
    let img_url = '';
        //upload image to server and get url
        let fd = new FormData();
        let file = $('#upload-image-post')[0].files[0];
        fd.append('file',file);
        $.ajax({
            type: 'POST',
            url: defaultUrl + '/api/uploadImage',
            data: fd,
            contentType: false, 
            processData: false,
            success: function(res) {
                if (res.code === 200) {
                    let img_url = res.data;
                    let title = $('#title-post').val();
                    let content = $('#content-post').val();
                    let channel = $('#channel-post').val();
                    let user = JSON.parse(localStorage.getItem('user'));
                    $.ajax({
                      type: 'POST',
                      url: defaultUrl + '/api/createPost',
                      data: {
                        'title': title,
                        'content': content,
                        'img_url': img_url,
                        'user_id': user.id,
                        'channel_id': channel
                      },
                      success: function(response) {
                        alert(response.status);
                      }
                    })
                } else {
                    alert(res.status);
                }   
            }
          });
    
  })

});
