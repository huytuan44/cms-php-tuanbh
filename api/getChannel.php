<?php
    include_once("./controller/channel.php");
    include("./controller/authorization.php");
    $channel = new Channel();
    if(!empty($_REQUEST['channel_id']) || $_REQUEST['channel_id'] === '0') {
        $channel->getChannel();
        exit;
    }
    $channel->getChannels();