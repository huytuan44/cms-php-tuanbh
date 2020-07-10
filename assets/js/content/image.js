(function($){
    $.ajax({
        type: 'GET',
        url: defaultUrl + '/api/getChannel',
        data: { 'status': 'image' },
        success: function(res) {
          if (res.code === 200) {
            let channels = res.data;
            let html = ''
            channels.forEach(channel => {
                if (channel.images.length > 0) {
                    html += `<div class="row mt-5" onclick="window.location='${defaultUrl + '/channel?id=' + channel.id}';">
                                <div class="col-sm-12">
                                <h5 class="text-muted font-weight-medium mb-3">${channel.channel_name}</h5>
                                </div>
                            </div><div class="row mb-4">`;
                    channel.images.forEach((image, key) => {
                        if (key%4 == 0 && key != 0) html += '</div><div class="row mb-4">';
                        html += `<div class="col-sm-3  mb-5 mb-sm-2">
                                    <div class="position-relative image-hover">
                                    <img
                                        src="${image.url}"
                                        class="img-fluid"
                                        alt="${image.title}"
                                    />
                                    <span class="thumb-title">${channel.channel_name}</span>
                                    </div>
                                    <h5 class="font-weight-600 mt-3">
                                    ${image.title}
                                    </h5>
                                </div>`
                    })        
                    html += '</div>';
                }
            });
            $('#show-image').html(html);
            $("#show-image").popupLightbox({
                width: 600,
                height: 450
             });
          } else {
            alert(res.status);
          }
        }
      });

})(jQuery)