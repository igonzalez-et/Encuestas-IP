<?php
    session_start();

    try {
        $hostname = "localhost";
        $dbname = "enquestes_ip";
        $username = "root";
        $pw = "P@ssw0rd";
        $pdo = new PDO ("mysql:host=$hostname;dbname=$dbname","$username","$pw");
        } catch (PDOException $e) {
        echo "Failed to get DB handle: " . $e->getMessage() . "\n";
        exit;
        }
?><!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./CSS/style.css">
    <title>Login</title>
</head>
<body class="login">
    <div class="divInput">
        <form action="login.php" method="post">
            <label for="loginInputEmail">Email: </label><br>
            <input type="email" name="loginInputEmail" id="loginInputEmail" required><br>
            <label for="loginInputPass">Contrasenya: </label> <br>
            <input type="password" name="loginInputPass" id="loginInputPass" required><br>
            <input type="submit" value="Log in">
        </form>
        <a href="#">Has olvidat la teva contrasenya?</a>
    </div>
    <?php
        if(isset($_POST["loginInputEmail"]) && isset($_POST["loginInputPass"])){

            $query = $pdo->prepare("select email,pass,role from users where email = :email");
            
            $email = $_POST['loginInputEmail'];

            $query->bindParam(':email', $email);

            $query->execute();

            if($row = $query->fetch()){

                $query = $pdo->prepare("select email,pass,role from users where pass = sha1(:pass)");
            
                $pass = $_POST['loginInputPass'];

                $query->bindParam(':pass', $pass);

                $query->execute();
                if($row = $query->fetch()){
                    header('Location: http://localhost:8080/dashboard.php');
                    $_SESSION["user"] = ["user" => $row["email"], "role" => $row["role"]];
                }else{
                    echo "Usuari o contrasenya incorrect";
                }
                
            }else{
                echo "Usuari no registrat";
            }

        }

        
    ?>
</body>
</html>