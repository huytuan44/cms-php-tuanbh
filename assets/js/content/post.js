(function ($) {
    let params = window.location.search.split('?');
    let post_id = null;
    params.forEach((item) => {
        if (item.includes('post_id')) {
            post_id = item.slice(8, item.length);
        }  
    })
    $.ajax({
        url: 'http://cms-php.local/api/getPost',
        type: 'GET',
        data: {
            'post_id': post_id
        },
        success: function(res) {
            if(res.code === 200) {
                var data = res.data[0]
                $('#channel_name').html(data.channel_name.toUpperCase());
                $('#post_title').html(data.title.toUpperCase());
                $('#post_content').html(data.content);
                $('#post_image').attr('src', data.img_url);
            } else {
                alert(res.status);
            }
        }
    })
})(jQuery)