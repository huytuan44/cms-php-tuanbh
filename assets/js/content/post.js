(function ($) {
    let params = window.location.search.split('?');
    let post_id = null;
    params.forEach((item) => {
        if (item.includes('post_id')) {
            post_id = item.slice(8, item.length);
        }  
    })
    if(!Number.isInteger(parseInt(post_id))) {
        window.location.href = 'http://cms-php.local';
    } else {
        $.ajax({
            url: 'http://cms-php.local/api/getChannel',
            type: 'GET',
            success: function(res) {
                if (res.code == 200) {
                    var channels = res.data;
                    var html = '';
                    channels.forEach((item) => {
                        html += renderChannel(item);
                    })
                    $('#list-channel').html(html);
                }
            }
        })

        $.ajax({
            url: 'http://cms-php.local/api/getPost',
            type: 'GET',
            data: {
                'post_id': post_id
            },
            success: function(res) {
                console.log(res);
                if(res.code === 200) {
                    if(res.data.length === 0) {
                        window.location.href = 'http://cms-php.local';
                    } else {
                        var data = res.data[0];
                        $('#channel_name').html(data.channel_name.toUpperCase());
                        $('#post_title').html(data.title.toUpperCase());
                        $('#post_content').html(data.content);
                        $('#post_image').attr('src', data.img_url);
                    }
                    
                } else {
                    alert(res.status);
                }
            }
        })

        renderChannel = function(channel) {
            return ` <li class="nav-item">
            <a class="nav-link" href="channel?id=${channel.id}">${channel.channel_name}</a>
          </li>`
        }
    }
    
})(jQuery)