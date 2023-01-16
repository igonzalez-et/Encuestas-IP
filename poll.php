<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./CSS/style.css" type="text/css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <title>Enquestes</title>
</head>
<body>
    <?php include("./includes/header.php")?>
    <div class="contenedorPrincipalPoll">
        <h1>Dashboard Admin / Enquestes</h1>
        <div class="contenedorBotonesPoll">
            <button class="botonPoll" id="botonCrearPregunta" name="Crear Pregunta">
                <img class="imgBotonPoll" src="https://cdn-icons-png.flaticon.com/512/17/17340.png">
                <h3>Crear Pregunta</h3>
            </button>
            <button class="botonPoll" id="botonCrearEncuesta" name="Crear Enquesta">
                <img class="imgBotonPoll" src="https://cdn-icons-png.flaticon.com/512/17/17340.png">
                <h3> Crear Enquesta</h3>
            </button>
            <button class="botonPoll" id="botonListarPreguntas" name="Llistat de Preguntes">
                <img class="imgBotonPoll" src="https://cdn-icons-png.flaticon.com/512/3597/3597048.png">
                <h3>Llistat de Preguntes</h3>
            </button>
            <button class="botonPoll" id="botonListarEncuestas" name="Llistat de Enquestes">
                <img class="imgBotonPoll" src="https://cdn-icons-png.flaticon.com/512/3597/3597048.png">
                <h3>Llistat de Enquestes</h3>
            </button>
        </div>
        <br>
        <div class="contenedorAccionBotones">
            <h1 id="tituloAccionBotones">Llistat de Enquestes</h1>
            <div id="contenedorDinamico">
                <ul>
                    <li>EncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestas</li>
                    <li>EncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestas</li>
                    <li>EncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestas</li>
                    <li>EncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestas</li>
                    <li>EncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestas</li>
                    <li>EncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestas</li>
                    <li>EncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestas</li>
                    <li>EncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestas</li>
                    <li>EncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestas</li>
                    <li>EncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestasEncuestas</li>
                </ul>
            </div>
        </div>
    </div>
    <?php include("./includes/footer.php")?>
    <script src="./JS/scripts.js"></script>
</body>
</html>