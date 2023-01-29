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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./CSS/style.css" type="text/css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src='./JS/scripts.js'></script>
    <title>Enquestes</title>
</head>
<body class="bodyPoll">
    <?php include("./includes/header.php")?>
    <br>
    <?php include("./includes/messageCSS.php")?>
        
    <?php
        $tipo = "info";
        $mensajeCSS = "Has entrat a l\'administració d\'enquestes";
        array_push($_SESSION["arrayMensajesCSS"],array($tipo,$mensajeCSS));
        
        //$_SESSION["arrayMensajesCSS"] = array();
        if(!isset($_SESSION["arrayMensajesCSS"])){
            $_SESSION["arrayMensajesCSS"] = array();
            
        }
        else{
            for ($i=0; $i < count($_SESSION["arrayMensajesCSS"]); $i++) { 
                echo "<script type='text/javascript'>mostrarMensajeCSS('".$_SESSION["arrayMensajesCSS"][$i][0]."','".$_SESSION["arrayMensajesCSS"][$i][1]."')</script>";

            }
            $_SESSION["arrayMensajesCSS"] = array();
        }
    ?>

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

            <!-- Contenedor Crear Pregunta -->
            <div id="contenedorCrearPregunta">
                <?php 
                    $userMail = $_SESSION["user"]["email"];
                    
                    if(isset($_POST["guardarPregunta"])){
                        $tipo = "correcto";
                        $mensajeCSS = "Has desat correctament la pregunta";
                        echo "<script type='text/javascript'>mostrarMensajeCSS('".$tipo."','".$mensajeCSS."')</script>";
                        array_push($_SESSION["arrayMensajesCSS"],array($tipo,$mensajeCSS));
                        
                        $questionName = $_POST["inpNombrePregunta"];
                        $questionType = strtolower($_POST["tipoPregunta"]);
                        $query = $pdo->prepare("insert into preguntas(textos,id_tipos_preguntas) select '".$questionName."' as texto, id as id_tipo_pregunta from tipos_preguntas where tipos = '".$questionType."';");
                        $query->execute();
                        //appendLog("S", "Query executed successfully, question name: (" . $questionName . "), type: ".$questionType ."--".$query);
                        
                    }
                    
                ?>
            </div>

            <!-- Contenedor Crear Encuesta -->
            <div id="contenedorCrearEncuesta">
                <?php
                    $_SESSION["nombresProfesores"] = array();
                    $arrayProfesores = $_SESSION["nombresProfesores"];
                    $queryProfesores = $pdo->prepare("select * from usuarios where role='profesor'");
                    $queryProfesores->execute();
                    
                    while($rowProfesores = $queryProfesores->fetch()){
                            array_push($arrayProfesores,$rowProfesores['nombres']);
                    }

                    $_SESSION["nombresPreguntas"] = array();
                    $arrayPreguntas = $_SESSION["nombresPreguntas"];
                    $queryPreguntas = $pdo->prepare("select * from preguntas");
                    $queryPreguntas->execute();

                    while($rowPreguntas = $queryPreguntas->fetch()){
                        array_push($arrayPreguntas,$rowPreguntas['textos']);
                    }

                    $_SESSION["nombresAlumnos"] = array();
                    $arrayAlumnos = $_SESSION["nombresAlumnos"];
                    $queryAlumnos = $pdo->prepare("select * from usuarios where role='alumno'");
                    $queryAlumnos->execute();

                    while($rowAlumnos = $queryAlumnos->fetch()){
                        array_push($arrayAlumnos,$rowAlumnos['nombres']);
                    }

                    echo "<script>
                    var arrayProfesores = ".json_encode($arrayProfesores).";
                    var arrayPreguntas = ".json_encode($arrayPreguntas).";
                    var arrayAlumnos = ".json_encode($arrayAlumnos).";
                    </script>";
                ?>

                <?php 
                    $userMail = $_SESSION["user"]["email"];
                    
                    if(isset($_POST["guardarEncuesta"])){
                        $tipo = "correcto";
                        $mensajeCSS = "Has desat correctament l'enquesta";
                        echo "<script type='text/javascript'>mostrarMensajeCSS('".$tipo."','".$mensajeCSS."')</script>";
                        array_push($_SESSION["arrayMensajesCSS"],array($tipo,$mensajeCSS));
                        
                        $pollName = $_POST["inpNombreEncuesta"];
                        $pollDateStart = $_POST["inpFechaInicio"];
                        $pollDateFinal = $_POST["inpFechaFinal"];
                        
                        $queryEncuesta = $pdo->prepare("insert into encuestas(textos,fechas_inicio,fechas_final,id_creadores) values('".$pollName."','".$pollDateStart."','".$pollDateFinal."',1);");
                        $queryEncuesta->execute();
                        //appendLog("S", "Query executed successfully, question name: (" . $questionName . "), type: ".$questionType ."--".$query);
                        
                    }
                    
                ?>

            </div>

            <!-- Contenedor Listar Encuestas -->
            <div id="contenedorListaEncuestas">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th class="columnaFechaInicio">Data Inici</th>
                        <th class="columnaFechaFinal">Data Final</th>
                    </tr>
                    <?php
                    
                        $query = $pdo->prepare("select * from encuestas");
            
                        $query->execute();
                       
                   
                        

                        while($row = $query->fetch()){
                            echo "<tr>\n
                                <td class='columnaID'>". $row['id'] ."</td>\n
                                <td class='columnaNombre'>". $row['textos'] ."</td>\n
                                <td class='columnaFechaInicio'>". $row['fechas_inicio'] ."</td>\n
                                <td class='columnaFechaFinal'>". $row['fechas_final'] ."</td>\n
                            </tr>";
                        }
                        
                    ?>
                </table>
            </div>

            <!-- Contenedor Listar Preguntas -->
            <div id="contenedorListaPreguntas">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Tipus Pregunta</th>
                    </tr>
                    <?php
                   
                        $query = $pdo->prepare("select p.id as id,p.textos as texto,CONCAT(UPPER(SUBSTRING(t.tipos,1,1)),SUBSTRING(t.tipos,2,LENGTH(t.tipos))) AS tipo from preguntas p inner join tipos_preguntas t on p.id_tipos_preguntas = t.id order by id;");
            
                        $query->execute();                    
                        //appendLog("S", "Query executed successfully - '" . $query . "'");
                   
                    
                        

                        while($row = $query->fetch()){
                            echo "<tr>\n
                                <td class='columnaID'>". $row['id'] ."</td>\n
                                <td class='columnaNombre'>". $row['texto'] ."</td>\n
                                <td class='columnaTipo'>". $row['tipo'] ."</td>\n
                            </tr>";
                        }
                    ?>
                </table>
            </div>
        </div>
        
    </div>
    <?php include("./includes/footer.php")?>
    <script src="./JS/scripts.js"></script>
</body>
</html>