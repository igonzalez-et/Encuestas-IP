<?php
function appendLog($messageTypeInitial,$message){
    $date = date("Y-m-d");
    $log = "[" . $messageTypeInitial . "]" . " - " . "[". date("H:i:s") ."]" . " - " . getIP()  . " - " . "[" . $message . "]" . "\n";
    file_put_contents("log/". "log_" . $date . ".txt", $log, FILE_APPEND);
}

function getIP(){
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

?>