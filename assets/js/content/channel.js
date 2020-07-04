(function ($) {
    let params = window.location.search.split('?');
    let channel_id = null;
    params.forEach((item) => {
        if (item.includes('id')) {
            channel_id = item.slice(3, item.length);
        }  
    })
    if(!Number.isInteger(parseInt(channel_id))) {
        window.location.href = 'http://cms-php.local';
    } else {
        $.ajax({
            url: 'http://cms-php.local/api/getChannel',
            type: 'GET',
            data: {
                'channel_id': channel_id
            },
            success: function(res) {
                if(res.code === 200) {
                    if(typeof(res.data[0]) == 'undefined') {
                        window.location.href = 'http://cms-php.local';
                    } else {
                        var channel = res.data[0];
                        var posts = res.data.posts;
                        var htmlPost = '<div class="row mb-4">'
                        $('#channel_name').html(channel.channel_name.toUpperCase());
                        posts.forEach((post, key) => {
                            if(key === 0) {
                                $('#first_post_title').html(post.title);
                                $('#first_post_content').html(post.content);
                                $('#first_post_image').attr('src', post.img_url);
                            } else {
                                htmlPost += renderPost(post);
                                if (key % 4 === 0) { htmlPost += '</div><div class="row mb-4">'}
                            }
                        })
                        htmlPost +='</div>';
                        $('#post-list').html(htmlPost);
                    }
                } else {
                    alert(res.status);
                }
            }
        })
    }
    function renderPost(post) {
        return `
        <div class="col-sm-3  mb-5 mb-sm-2">
        <div class="position-relative image-hover">
          <img
            src="${post.img_url}"
            class="img-fluid"
            alt="world-news"
          />
          <span class="thumb-title">${post.title}</span>
        </div>
        <h5 class="font-weight-600 mt-3">
            ${post.title}
        </h5>
      </div>
      `
    }
})(jQuery)