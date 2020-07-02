(function ($) {
    'use strict' 
    var data = [];
    var htmlData = '';
    $.ajax({
        type: 'GET',
        url: 'https://cms-php.local/api/getUser',
        success: function(res) {
            let response = JSON.parse(res);
            if (response.code === 200) {
                data = response.data;
                data.forEach(item => {
                    htmlData += renderUser(item);
                });
                $('#users-data').html(htmlData)
            } 
            console.log(response.status)    
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
                    <a class="btn btn-info btn-sm" data-toggle="modal" data-target="#editUser" href="#" data-user-id=${user.id}><i class="fas fa-pencil-alt"></i>Edit</a>
                    <a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#deleteUser" href="#" data-user-id=${user.id}><i class="fas fa-trash"></i>Delete</a>
                    </td>` : '<td></td>') +
            `</tr>`
    }
    
})(jQuery)