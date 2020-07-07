(function ($) {
    let params = window.location.search.split('?');
    let post_id = null;
    params.forEach((item) => {
        if (item.includes('post_id')) {
            post_id = item.slice(8, item.length);
        }  
    })
    if(!Number.isInteger(parseInt(post_id))) {
        window.location.href = defaultUrl;
    } else {
        $.ajax({
            url: defaultUrl + '/api/getChannel',
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
            url: defaultUrl + '/api/getPost',
            type: 'GET',
            data: {
                'post_id': post_id
            },
            success: function(res) {
                if(res.code === 200) {
                    if(res.data.length === 0) {
                        window.location.href = defaultUrl;
                    } else {
                        var data = res.data[0];
                        $('#channel_name').html(data.channel_name.toUpperCase());
                        $('#post_title').html(data.title.toUpperCase());
                        $('#post_content').html(data.content);
                        $('#post_image').attr('src', data.img_url);
                        $('#post_date').html(data.created_at);
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

        $.ajax({
            type: 'GET',
            url: defaultUrl + '/api/getComments',
            data: {
                'post_id': post_id
            },
            success: function(res) {
                console.log(res);
                if (res.code === 200 && res.data.length > 0) {
                    let comments = res.data;
                    let html = '';
                    comments.forEach((comment) => {
                        html += renderComment(comment);
                    });
                    $('#comment-post').html(html);
                }
            }
        })

        renderComment = function(comment) {
            let childHtml = '';
            if (comment.childComment.length > 0) {
                comment.childComment.forEach((item) => {
                    childHtml += renderChildComment(item)
                })
            }
            return `<li>
                <div class="parrent-comment">
                    <div class="comment-time">${comment.created_at}</div>
                    ${comment.username}: ${comment.content}
                </div> 
                <ul style="list-style-type: none;">
                  ${childHtml}
                </ul>
            </li>`;
        }

        renderChildComment = function(comment) {
            return `<li>
                <div class="child-comment">
                    <div class="comment-time">${comment.created_at}</div>
                    ${comment.username}: ${comment.content}
                </div> 
            </li>`;
        }
    }
    
})(jQuery)