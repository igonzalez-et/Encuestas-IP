<?php
session_start();
?>
<?php session_start();?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css" type="text/css">
    <title>Dashboard</title>
</head>
<body class="bodyDashboard">
    <?php include("./includes/header.php")?>
    <?php 
        //$_SESSION["user"] = ["user"=>"user","role"=>"admin"];
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
