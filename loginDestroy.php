<?php
session_start();
include "./includes/log.php";
try{
    $user = $_SESSION["user"]["username"];
    session_destroy();
    unset($_POST["logout"]);
    appendLog("S", "User " . $user . " has successfully logout");
}catch (Exception $e){
    $user = $_SESSION["user"]["username"];
    appendLog("E", $e->getMessage());
}
// session_destroy();
header("Location: ./login.php")
?>