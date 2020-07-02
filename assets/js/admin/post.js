(function ($) {
    'use strict' 
    var posts = [];
    var htmlPosts = '';
    var htmlChannelData = '';
    $.ajax({
        type: 'GET',
        url: 'https://cms-php.local/api/getPost',
        success: function(res) {
            let response = JSON.parse(res);
            if (response.code === 200) {
                posts = response.data;
                posts.forEach(item => {
                    htmlPosts += renderPost(item);
                });
                $('#post-data').html(htmlPosts)
            } 
            console.log(response.status)    
        },
        error: function(err){
        }
    });

    $.ajax({
        type: 'GET',
        url: 'https://cms-php.local/api/getChannel',
        success: function(res) {
            let response = JSON.parse(res);
            if (response.code === 200) {
                var data = response.data;
                data.forEach(item => {
                    htmlChannelData += renderChannelSelection(item);
                });
                $('#select-channel').html(htmlChannelData)
            } 
            console.log(response.status)    
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
                <a class="btn btn-info btn-sm" data-toggle="modal" data-target="#editPost" href="#" data-post-id=${post.id}><i class="fas fa-pencil-alt"></i>Edit</a>
                <a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deletePost" href="#" data-post-id=${post.id}><i class="fas fa-trash"></i>Delete</a>
                </td>
            </tr>`
    }

    function renderChannelSelection(channel) {
        return `
            <option value=${channel.id} >${channel.channel_name}</option>`
    }
})(jQuery)