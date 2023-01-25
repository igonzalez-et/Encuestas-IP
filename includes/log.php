<?php
function appendLog($messageTypeInitial,$message){
    $date = date("Y-m-d");
    $log = "[" . $messageTypeInitial . "]" . " - " . "[". date("H:i:s") ."]" . " - " . "[" . $message . "]" . "\n";
    file_put_contents("log/". "log_" . $date . ".txt", $log, FILE_APPEND);
}
?>