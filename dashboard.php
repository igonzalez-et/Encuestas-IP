<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./CSS/style.css" type="text/css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="./JS/scripts.js"></script>
    <title>Dashboard</title>
</head>
<body class="bodyDashboard">
    <?php include("./includes/header.php")?>
    <br>
    <?php include("./includes/messageCSS.php")?>

    <?php
        //$_SESSION["arrayMensajesCSS"] = array();
        if(!isset($_SESSION["arrayMensajesCSS"])){
            $_SESSION["arrayMensajesCSS"] = array();
            echo "<script type='text/javascript'>eliminarScrollBody('.bodyDashboard')</script>";

        }
        else{
            for ($i=0; $i < count($_SESSION["arrayMensajesCSS"]); $i++) { 
                echo "<script type='text/javascript'>mostrarMensajeCSS('".$_SESSION["arrayMensajesCSS"][$i][0]."','".$_SESSION["arrayMensajesCSS"][$i][1]."')</script>";

            }
            $_SESSION["arrayMensajesCSS"] = array();
        }
    ?>

    <?php
        $rolUsuario = $_SESSION['user']['role'];
        if($rolUsuario == "admin"){
            include("./includes/dashboardAdmin.php");
            
        }
        else if($rolUsuario == "profesor"){
            include("./includes/dashboardProfessors.php");
        }
        else{
            echo "<p>".$rolUsuario."</p>";
        }
        
    ?>
    <?php include("./includes/footer.php")?>
</body>
</html>
