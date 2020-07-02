<?php
    include_once("./controller/channel.php");
    include("./controller/authorization.php");
    $channel = new Channel();
    if(!empty($_REQUEST['channel_id'])) {
        $channel->getChannel();
        exit;
    }
    $channel->getChannels();