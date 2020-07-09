(function ($) {
    let params = window.location.search.split('?');
    let channel_id = null;
    params.forEach((item) => {
        if (item.includes('id')) {
            channel_id = item.slice(3, item.length);
        }  
    })
    if(!Number.isInteger(parseInt(channel_id))) {
        window.location.href = defaultUrl;
    } else {
        $.ajax({
            url: defaultUrl + '/api/getChannel',
            type: 'GET',
            data: {
                'channel_id': channel_id
            },
            success: function(res) {
                if(res.code === 200) {
                    if(typeof(res.data[0]) == 'undefined') {
                        window.location.href = defaultUrl;
                    } else {
                        var channel = res.data[0];
                        var posts = res.data.posts;
                        var htmlPost = '<div class="row mb-4">'
                        $('#channel_name').html(channel.channel_name.toUpperCase());
                        $('#channel_title').html(channel.title);
                        posts.forEach((post, key) => {
                            htmlPost += renderPost(post);
                            if (key % 4 === 0 && key !== 0) { htmlPost += '</div><div class="row mb-4">'}
                            
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
        <div class="col-sm-3  mb-5 mb-sm-2" onclick="window.location='${defaultUrl + '/post?post_id=' + post.id}';">
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