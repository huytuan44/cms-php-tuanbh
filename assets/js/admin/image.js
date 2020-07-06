(function ($) {
    'use strict'
    if (localStorage.getItem("user") == null){
        window.location.href = "http://cms-php.local";
    } else {
        var user = JSON.parse(localStorage.getItem("user"));
        if (user.type == 'user') {
            window.location.href = "http://cms-php.local";
        }
        $('#username').html(user.username);
    } 
    var images = [];
    var htmlImages = '';
    $.ajax({
        type: 'GET',
        url: 'http://cms-php.local/api/getImage',
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
                    <td>${image.url}</td>
                    <td>${image.username}</td>
                    <td>${image.channel_name}</td>
                    <td>${image.created_at}</td>
                    <td>${image.updated_at}</td>
                    <td>
                    <a class="btn btn-info btn-sm" data-toggle="modal" data-target="#editImage" data-image-id=${image.id} href="#" ><i class="fas fa-pencil-alt"></i>Edit</a>
                    <a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteImage" data-image-id=${image.id} href="#"><i class="fas fa-trash"></i>Delete</a>
                    </td>
                </tr>`;
    }
})(jQuery)