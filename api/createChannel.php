<?php
    include_once("./controller/channel.php");
    include("./controller/authorization.php");
    $channel = new Channel();
    $channel->createChannel();