<?php
    session_start();
    
    include ("./includes/log.php");
   
    try {
        $hostname = "localhost";
        $dbname = "enquestes_ip";
        $username = "enquestes_user";
        $pw = "P@ssw0rd";
        $pdo = new PDO ("mysql:host=$hostname;dbname=$dbname","$username","$pw");
        appendLog("S", "Successful connection to the database");
        } catch (PDOException $e) {
        echo "Failed to get DB handle: " . $e->getMessage() . "\n";
        appendLog("E", "Failed to get DB handle: " . $e->getMessage());
        exit;
        }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./CSS/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>

    <script src='./JS/scripts.js'></script>
    <title>Login</title>
</head>
<body class="bodyLogin">
    <?php include("./includes/headerNoLogin.php")?>
    <?php include("./includes/messageCSS.php")?>

    <?php
        //$_SESSION["arrayMensajesCSS"] = array();
        if(!isset($_SESSION["arrayMensajesCSS"])){
            $_SESSION["arrayMensajesCSS"] = array();
            echo "<script type='text/javascript'>eliminarScrollBody('.bodyLogin')</script>";

        }
        else{
            for ($i=0; $i < count($_SESSION["arrayMensajesCSS"]); $i++) { 
                echo "<script type='text/javascript'>mostrarMensajeCSS('".$_SESSION["arrayMensajesCSS"][$i][0]."','".$_SESSION["arrayMensajesCSS"][$i][1]."')</script>";

            }
            $_SESSION["arrayMensajesCSS"] = array();
        }
        
    ?>
    <div class="divLogin">
        <form action="login.php" method="post">
            <label for="loginInputEmail">EMAIL </label><br>
            <input type="email" name="loginInputEmail" id="loginInputEmail" required><br>
            <label for="loginInputPass">CONTRASENYA </label> <br>
            <input type="password" name="loginInputPass" id="loginInputPass" required><br>
            <input type="submit" value="Iniciar sessió" id="submit">
        </form>
        <a href="#">Has oblidat la teva contrasenya?</a>
    </div>
    <?php

        if(isset($_POST["loginInputEmail"]) && isset($_POST["loginInputPass"])){

            $query = $pdo->prepare("select email,password,role from usuarios where email = :email");
            
            $email = $_POST['loginInputEmail'];

            $query->bindParam(':email', $email);

            $query->execute();
            
            if($row = $query->fetch()){

                $query = $pdo->prepare("select email,password,role from usuarios where email = :email and password = sha1(:pass)");
            
                $pass = $_POST['loginInputPass'];
                $email = $_POST['loginInputEmail'];

                $query->bindParam(':pass', $pass);
                $query->bindParam(':email', $email);

                $query->execute();
                if($row = $query->fetch()){
                    $_SESSION["user"] = ["user" => $row["email"], "role" => $row["role"]];

                    $tipo = "info";
                    $mensajeCSS = "Has iniciat sessió";
                    array_push($_SESSION["arrayMensajesCSS"],array($tipo,$mensajeCSS));

                    echo "<script type='text/javascript'>mostrarMensajeCSS('".$tipo."','".$mensajeCSS."')</script>";
                    header('Location: ./dashboard.php');
                    die();
                }else{
                    $tipo = "error";
                    $mensajeCSS = "Usuari o contrasenya incorrecte";
                    array_push($_SESSION["arrayMensajesCSS"],array($tipo,$mensajeCSS));
                    echo "<script type='text/javascript'>mostrarMensajeCSS('".$tipo."','".$mensajeCSS."')</script>";
                }
            }else{
                $tipo = "error";
                $mensajeCSS = "Usuari o contrasenya incorrecte";
                array_push($_SESSION["arrayMensajesCSS"],array($tipo,$mensajeCSS));
                echo "<script type='text/javascript'>mostrarMensajeCSS('".$tipo."','".$mensajeCSS."')</script>";
                
            }

        }

    ?>
    <?php include("./includes/footer.php")?>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
</body>
</html>
