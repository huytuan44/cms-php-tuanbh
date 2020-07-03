(function ($) {
    'use strict' 
    var data = [];
    var htmlData = '';
    $.ajax({
        type: 'GET',
        url: 'http://cms-php.local/api/getUser',
        success: function(res) {
            if (res.code === 200) {
                data = res.data;
                data.forEach(item => {
                    htmlData += renderUser(item);
                });
                $('#users-data').html(htmlData)
            } else {
                alert(res.status);
            }    
        },
        error: function(err){
        }
    });

    function renderUser(user) {
        return `<tr>
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.type}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td>${parseInt(user.gender) ? 'Nữ' : 'Nam'}</td>
                <td>${user.created_at}</td>
                <td>${user.updated_at}</td>`
                 + (user.type === 'user' ?
                    `<td>
                    <a class="btn btn-info btn-sm" onclick="editUser(${user.id});" data-toggle="modal" data-target="#editUser" href="#"><i class="fas fa-pencil-alt"></i>Edit</a>
                    <a class="btn btn-danger btn-sm" onclick="deleteUser(${user.id});" data-toggle="modal" data-target="#deleteUser" href="#"><i class="fas fa-trash"></i>Delete</a>
                    </td>` : '<td></td>') +
            `</tr>`;
    }

    $('#createSubmit').click(function() {
        let username = $('#createUsername').val();
        let password = $('#createPass').val();
        let email = $('#createEmail').val();
        let age = $('#createAge').val();
        let gender = $('#createGender').val();
        
        $.ajax({
            type: 'POST',
            url: 'http://cms-php.local/api/signup',
            data: {
                'username': username,
                'password': password,
                'email': email,
                'age': age,
                'gender': gender
            },
            success: function(res) {
                console.log(res);
                location.reload();
            },
            error: function(err) {
                alert(err);
            }
        });
    })
    
    $('#editSubmit').click(function() { 
        let userId = $(this).attr('data-user-id');
        let username = $('#editUsername').val();
        let password = $('#editPass').val();
        let email = $('#editEmail').val();
        let age = $('#editAge').val();
        let gender = $('#editGender').val();
        
        $.ajax({
            type: 'POST',
            url: 'http://cms-php.local/api/editInfo',
            data: {
                'user_id': userId,
                'username': username,
                'password': password,
                'email': email,
                'age': age,
                'gender': gender
            },
            success: function(res) {
                if(res.code === 200) {
                    location.reload();
                } else {
                    alert(res.status);
                }
            },
            error: function(err) {
                alert(err);
            }
        });
    })
    $('#submitDeleteUser').click(function() {
        let userId = $(this).attr('data-user-id');
        $.ajax({
            type: 'POST',
            url: 'http://cms-php.local/api/deleteUser',
            data: {
                'user_id': userId
            },
            success: function(res) {
                console.log(res);
                if(res.code === 200) {
                    location.reload();
                } else {
                    alert(res.status);
                }
            },
            error: function(err) {
                alert(err);
            }
        })
    })
})(jQuery)

// show user data in edit form
function editUser(userId) {
        $.ajax({
            type: 'GET',
            url: 'http://cms-php.local/api/getUser',
            data: {
                'user_id': userId 
            },
            success: function(res) {
                if (res.code == '200') {
                    let data = res.data[0];
                    $('#editUsername').val(data.username);
                    $('#editEmail').val(data.email);
                    $('#editAge').val(data.age);
                    $('#editGender').val(data.gender);
                    $('#editSubmit').attr('data-user-id', data.id);
                } else {
                    alert(res.status);
                }
            },
            error: function(err) {
                alert(err);
            }
        })
}(jQuery)

function deleteUser(userId) {
    $('#submitDeleteUser').attr('data-user-id', userId);
}(jQuery)