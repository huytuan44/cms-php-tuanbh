
$(function() {

  // owl carousel script starts

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
    $('.form-create-image').css('display', 'none');
  })

  $('#create-image').click(function() {
    $('#modal').css('display', 'block');
    $('.form-create-image').css('display', 'block');
    $('.form-create-post').css('display', 'none');
  })

  $('#upload-image-post').on('change', function(event) {
    var image = document.getElementById('show-image-post');
    image.src = URL.createObjectURL(event.target.files[0]);
  })

  $('#upload-image').on('change', function(event) {
    var image = document.getElementById('show-image');
    image.src = URL.createObjectURL(event.target.files[0]);
  })

  $('.modal-exit').click(function() {
    $('#modal').css('display', 'none');
    $('.form-create-post').css('display', 'none');
    $('.form-create-image').css('display', 'none');
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
        $('#channel-image').html(html);
      } else {
        alert(res.status);
      }
    }
  });

  $.ajax({
    type: 'GET',
    url: defaultUrl + '/api/getImage',
    success: function(res) {
      if (res.code === 200) {
        let html = '';
        res.data.forEach(element => {
          html += `<div class="item">
                    <div class="carousel-content-wrapper mb-2">
                      <div class="carousel-content">
                        <h1 class="font-weight-bold">
                          ${element.title}
                        </h1>
                        <h5 class="font-weight-normal  m-0">
                          Người upload: ${element.username}
                        </h5>
                        <p class="text-color m-0 pt-2 d-flex align-items-center">
                          <span class="fs-10 mr-1">${element.created_at}</span>
                          <i class="mdi mdi-bookmark-outline mr-3"></i>
                          <span class="fs-10 mr-1">Kênh: ${element.channel_name}</span>
                          <i class="mdi mdi-comment-outline"></i>
                        </p>
                      </div>
                      <div class="carousel-image">
                        <img src="${element.url}" alt="" />
                      </div>
                    </div>
                  </div>`;
        });

        
        $('#main-banner-carousel').html(html)
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
      } else {
        alert(res.status);
      }
    }
  });

  $.ajax({
    type: 'GET',
    url: defaultUrl + '/api/getChannel',
    data: { 'status': 'post' },
    success: function(res) {
      if (res.code === 200) {
        let html = '';
        res.data.forEach(channel => {
          html += `<div class="world-news">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="d-flex position-relative float-left" onclick="window.location='${defaultUrl + '/channel?id=' + channel.id}';">
                          <h3 class="section-title">${channel.channel_name}</h3>
                        </div>
                      </div>
                    </div>
                    <div class="row">`;
                    if( channel.posts.length > 0) {
                      let postsHtml = '';
                      channel.posts.forEach(post => {
                        postsHtml += `<div class="col-lg-3 col-sm-6 grid-margin mb-5 mb-sm-2" onclick="window.location='${defaultUrl + '/post?post_id=' + post.id}';">
                                      <div class="position-relative image-hover">
                                        <img src="${post.img_url}" class="img-fluid" alt="${channel.channel_name}" />
                                        <span class="thumb-title">${channel.channel_name}</span>
                                      </div>
                                      <h5 class="font-weight-bold mt-3">
                                        ${post.title}
                                      </h5>
                                      <p class="fs-15 font-weight-normal">
                                        ${post.content.substring(0, 100)}
                                      </p>
                                      <a href="${'/post?post_id=' + post.id}" class="font-weight-bold text-dark pt-2">Đọc tiếp</a>
                                    </div>`
                      })
                      html+= postsHtml + '</div>';
                    }
                     
        });
        $('#channel-list').html(html);
      } else alert(res.status);
    }
  })

  $('#create-post-submit').click(function() {
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

  $('#create-image-submit').click(function() {
        //upload image to server and get url
        let fd = new FormData();
        let file = $('#upload-image')[0].files[0];
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
                    let title = $('#title-image').val();
                    let channel = $('#channel-image').val();
                    let user = JSON.parse(localStorage.getItem('user'));
                    $.ajax({
                      type: 'POST',
                      url: defaultUrl + '/api/createImage',
                      data: {
                        'title': title,
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
