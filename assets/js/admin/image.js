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
    var images = [];
    var htmlImages = '';
    $.ajax({
        type: 'GET',
        url: defaultUrl + '/api/getImage',
        success: function(res) {
            if (res.code === 200) {
                images = res.data;
                images.forEach(item => {
                    htmlImages += renderImage(item);
                });
                $('#image-data').html(htmlImages);
            } else {
                alert(res.status);
            }    
        },
        error: function(err){
        }
    });

    function renderImage(image) {
        return `<tr>
                    <td>${image.id}</td>
                    <td>${image.title}</td>
                    <td style="white-space:nowrap; text-overflow:ellipsis; max-width:400px; overflow:hidden;">
                        ${image.url}</td>
                    <td>${image.username}</td>
                    <td>${image.channel_name}</td>
                    <td>${image.created_at}</td>
                    <td>${image.updated_at}</td>
                    <td>
                    <a class="btn btn-info btn-sm" data-toggle="modal" data-target="#editImage" onclick="showEditImage(${image.id})" href="#" ><i class="fas fa-pencil-alt"></i>Edit</a>
                    <a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteImage" data-image-id=${image.id} href="#"><i class="fas fa-trash"></i>Delete</a>
                    </td>
                </tr>`;
    }
    $.ajax({
        type: 'GET',
        url: defaultUrl + '/api/getChannel',
        success: function(res) {
            if (res.code === 200) {
                var data = res.data;
                let htmlChannelData = '';
                data.forEach(item => {
                    htmlChannelData += renderChannelSelection(item);
                });
                $('#edit-image-channel').html(htmlChannelData);
                $('#create-image-channel').html(htmlChannelData);
            } else {
                alert(res.status);
            }
        },
        error: function(err){
        }
    });

    function renderChannelSelection(channel) {
        return `<option value = '${channel.id}' >${channel.channel_name}</option>`;
    }

    $('#uploadImage').on('change', function(event) {
        var image = $('#showImage')[0];
        image.src = URL.createObjectURL(event.target.files[0]);
    })

    $('#uploadImageEdit').on('change', function(event) {
        var image = $('#showImageEdit')[0];
        image.src = URL.createObjectURL(event.target.files[0]);
    })

    $('#edit-image-submit').click(function(event) {
        let img_url = '';
        let fd = new FormData();
        let file = $('#uploadImageEdit')[0].files[0];
        if (typeof(file) == 'undefined') {
            editImage(img_url);
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
                    editImage(img_url);
                }
            });
        }
    })
    function editImage(img_url) {
        let title = $('#edit-image-title').val();
        let channel = $('#edit-image-channel').val();
        let image_id = $('#edit-image-submit').attr('data-image-id');
        let user = JSON.parse(localStorage.getItem('user'));
        $.ajax({
            type: 'POST',
            url: defaultUrl + '/api/editImage',
            data: {
                'image_id': image_id,
                'title': title,
                'channel_id': channel,
                'user_id': user.id,
                'img_url': img_url
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
})(jQuery)

function showEditImage(image_id) {
    $.ajax({
        type: 'GET',
        url: defaultUrl + '/api/getImage',
        data: {
            'image_id': image_id
        },
        success: function(res) {
            if (res.code === 200) {
                let image = res.data[0];
                $('#edit-image-title').val(image.title);
                $('#edit-image-channel').val(image.channel_id);
                $('#showImageEdit').attr('src', '../' + image.url);
                $('#edit-image-submit').attr('data-image-id', image_id);
            } else {
                alert(res.status);
            }   
        },
        error: function(err){
        }
    });
}(jQuery)