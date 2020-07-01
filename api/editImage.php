<?php
    include_once("./controller/image.php");
    include("./controller/authorization.php");
    $image = new Image();
    $image->editImage();