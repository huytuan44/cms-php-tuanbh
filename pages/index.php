<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- layout -->
    <nav class="nav-bar">
        <ul>
            <li>
                <img src="assets/image/river.png" alt="Logo" width="20" height="20">
                <a class="page-title" href="#">Mương sạch</a>
            </li>
            <li class="login">
                <a id="login" href="#">Đăng nhập</a>
                <a id="" href="#">Đăng ký</a>               
            </li>
            <li class="user">
                <a id="email" href="#"></a>
                <a id="logout" href="#">Đăng xuất</a>               
            </li>
        </ul>
    </nav>

    <!-- login popup -->
    <div class="form-popup" id="myForm">
        <form class="form-container" >
            <h1>Login</h1>

            <label for="username"><b>UserName</b></label>
            <input id="username" type="text" placeholder="Enter Email" name="email" required>

            <label for="psw"><b>Password</b></label>
            <input id="password" type="password" placeholder="Enter Password" name="psw" required>

            <button type="button" id="btn-submit" class="btn">Login</button>
            <button class="btn cancel" onclick="closeForm()">Close</button>
        </form>
    </div>
</body>
<script src="assets/js/jquery-3.5.1.min.js"></script>
<script src="assets/js/common.js"></script>
</html>

    
