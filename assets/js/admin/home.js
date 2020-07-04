(function ($) {
    'use strict' 
    $.ajax({
        type: 'GET',
        url: 'http://cms-php.local/api/getUser',
        success: function(res) {
            if (res.code === 200) {
                $('#numberUser').html(res.data.length);

            } else {
                alert(res.status);
            }    
        },
        error: function(err){
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://cms-php.local/api/getPost',
        success: function(res) {
            if (res.code === 200) {
                $('#numberPost').html(res.data.length);
            } else {
                alert(res.status);
            }    
        },
        error: function(err){
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://cms-php.local/api/getImage',
        success: function(res) {
            if (res.code === 200) {
                $('#numberImage').html(res.data.length);
            } else {
                alert(res.status);
            }    
        },
        error: function(err){
        }
    });
})(jQuery)
