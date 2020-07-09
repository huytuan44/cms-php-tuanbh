<?php
    include_once("./controller/channel.php");
    include("./controller/authorization.php");
    $channel = new Channel();
    if (!empty($_REQUEST['channel_id'])) { 
        if ($_REQUEST['channel_id'] !== '0') {
            $channel->getChannel();
            exit;
        }
    }
    if (!empty($_REQUEST['status'])) { 
        if ($_REQUEST['status'] !== '0') {
            $channel->getChannelsWithPost();
            exit;
        }
    }
    $channel->getChannels();