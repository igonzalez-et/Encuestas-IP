<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./CSS/style.css" type="text/css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="./JS/scripts.js"></script>
    <title>Index</title>
</head>
<body class="bodyIndex">
    <?php include("./includes/headerNoLogin.php")?>
    <div class="contenedorPrincipal">
        <div class="contenedorLanding">
            <div class="headerContenedor">
                <h1></h1><br><br>
            </div>
            <div class="bienvenidoLanding">
                <h2>Benvingut a la nostra pàgina d'enquestes</h2>
                <a href="./login.php" class="botonLanding">INICIAR</a>
            </div>
        </div>
        
    </div>

    <div class="container">
        <span class="dondestas animation"></span>
        <div class="center ">
            <div class="wrap">
                <div class="box-1 box">
                    <img src="./img/form_icon.png" class="fas fa-file-code">
                    <img src="./img/form_icon.png" class="fas fa-file-code">
                </div>
                <div class="box-2 box">
                    <img src="./img/form_icon.png" class="fas fa-file-code">
                    <img src="./img/form_icon.png"class="fas fa-file-code">
                </div>
            </div>
        </div>
    </div>

    <?php include("./includes/footer.php")?>
</body>
</html>