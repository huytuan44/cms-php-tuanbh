(function ($) {
    'use strict' 
    if (localStorage.getItem("user") == null){
        window.location.href = defaultUrl;
    } else {
        var user = JSON.parse(localStorage.getItem("user"));
        if (user.type == 'user') {
            window.location.href = defaultUrl;
        }
        $('#username').html(user.username);
    } 
    var posts = [];
    var htmlPosts = '';
    var htmlChannelData = '';
    $.ajax({
        type: 'GET',
        url: defaultUrl + '/api/getPost',
        success: function(res) {
            if (res.code === 200) {
                posts = res.data;
                posts.forEach(item => {
                    htmlPosts += renderPost(item);
                });
                $('#post-data').html(htmlPosts);
            } else {
                alert(res.status);
            }   
        },
        error: function(err){
        }
    });

    $.ajax({
        type: 'GET',
        url: defaultUrl + '/api/getChannel',
        success: function(res) {
            if (res.code === 200) {
                var data = res.data;
                data.forEach(item => {
                    htmlChannelData += renderChannelSelection(item);
                });
                $('#createChannel').html(htmlChannelData);
                $('#editChannel').html(htmlChannelData);
            } else {
                alert(res.status);
            }
        },
        error: function(err){
        }
    });

    function renderPost(post) {
        return `<tr>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.content}</td>
                <td>${post.img_url}</td>
                <td>${post.username}</td>
                <td>${post.channel_name}</td>
                <td>${post.created_at}</td>
                <td>${post.updated_at}</td>
                <td>
                <a class="btn btn-info btn-sm" data-toggle="modal" data-target="#editPost" href="#" onclick='showEditPost(${post.id})'><i class="fas fa-pencil-alt"></i>Edit</a>
                <a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deletePost" href="#" onclick='showDeletePost(${post.id})' ><i class="fas fa-trash"></i>Delete</a>
                </td>
            </tr>`;
    }

    function renderChannelSelection(channel) {
        return `<option value = '${channel.id}' >${channel.channel_name}</option>`;
    }

    $('#uploadImage').on('change', function(event) {
        var image = document.getElementById('showImage');
        image.src = URL.createObjectURL(event.target.files[0]);
    })

    $('#uploadEditImage').on('change', function(event) {
        var image = document.getElementById('showEditImage');
        image.src = URL.createObjectURL(event.target.files[0]);
    })

    $('#submitCreatePost').click(function() {
        let img_url = '';
        //upload image to server and get url
        let fd = new FormData();
        let file = $('#uploadImage')[0].files[0];
        fd.append('file',file);
        $.ajax({
            type: 'POST',
            url: defaultUrl + '/api/uploadImage',
            data: fd,
            contentType: false, 
            processData: false,
            success: function(res) {
                if (res.code === 200) {
                    img_url = res.data;
                    createPost(img_url);
                } else {
                    alert(res.status);
                }   
            }
          });
    })

    function createPost(img_url) {
        let title = $('#createTitle').val();
        let content = $('#createContent').val();
        let channel_id = $('#createChannel').val();
        $.ajax({
            type: 'POST',
            url: defaultUrl + '/api/createPost',
            data: {
                'title': title,
                'content': content,
                'channel_id': channel_id,
                'user_id': '1',
                'img_url': '../' + img_url
            },
            success: function(res) {
                if (res.code === 200) {
                    location.reload();
                } else {
                    alert(res.status);
                }   
            }
          });
    } 
    
    $('#editSubmit').click(function(){
        let img_url = '';
        //upload image to server and get url
        let fd = new FormData();
        let file = $('#uploadEditImage')[0].files[0];
        if (typeof(file) == 'undefined') {
            editPost(img_url);
        } else {
            fd.append('file',file);
            $.ajax({
                type: 'POST',
                url: defaultUrl + '/api/uploadImage',
                data: fd,
                contentType: false, 
                processData: false,
                success: function(res) {
                    if (res.code === 200) {
                        img_url = res.data;
                    } else {
                        alert(res.status);
                    }
                    editPost(img_url);
                }
            });
        }
    }) 
    function editPost(img_url) {
        let post_id = $('#editSubmit').attr('data-post-id');
        let title = $('#editTitle').val();
        let content = $('#editContent').val();
        let channel_id = $('#editChannel').val();
        let user = JSON.parse(localStorage.getItem('user')); 
        $.ajax({
            type: 'POST',
            url: defaultUrl + '/api/editPost',
            data: {
                'post_id': post_id,
                'title': title,
                'content': content,
                'channel_id': channel_id,
                'user_id': user.id,
                'img_url': img_url.length ? '../' + img_url : ''
            },
            success: function(res) {
                if (res.code === 200) {
                    location.reload();
                } else {
                    alert(res.status);
                }  
            }
        });
    } 

    $('#submitDeletePost').click(function() {
        let post_id = $(this).attr('data-post-id');
        $.ajax({
            type: 'POST',
            url: defaultUrl + '/api/deletePost',
            data: {
                'post_id': post_id,
            },
            success: function(res) {
                if (res.code === 200) {
                    location.reload();
                }   
            }
          });
    })
})(jQuery)

function showEditPost(post_id) {
    $.ajax({
        type: 'GET',
        url: defaultUrl + '/api/getPost',
        data: { 
            'post_id': post_id
        },
        success: function(res) {
            if (res.code === 200) {
                data = res.data[0];
                $('#editTitle').val(data.title);
                $('#editContent').val(data.content);
                $('#editChannel').val(data.channel_id);
                $('#showEditImage').attr('src', data.img_url);
                $('#editSubmit').attr('data-post-id', data.id);
            } else {
                alert(res.status);
            }
        }
    })
}(jQuery)

function showDeletePost(post_id) {
    $('#submitDeletePost').attr('data-post-id', post_id);
}(jQuery)