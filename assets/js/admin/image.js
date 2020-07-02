(function ($) {
    'use strict' 
    var images = [];
    var htmlImages = '';
    $.ajax({
        type: 'GET',
        url: 'https://cms-php.local/api/getImage',
        success: function(res) {
            let response = JSON.parse(res);
            if (response.code === 200) {
                images = response.data;
                images.forEach(item => {
                    htmlImages += renderImage(item);
                });
                $('#image-data').html(htmlImages)
            } 
            console.log(response.status)    
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
                </tr>`
    }
})(jQuery)