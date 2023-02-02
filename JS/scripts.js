


function cerrarMensajeCSS(){
    var close = document.getElementsByClassName("closebtn");
    var i;

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function(){
            var div = this.parentElement;
            div.style.opacity = "0";
            setTimeout(function(){ div.style.display = "none"; }, 600);
        }
    }
}

function mostrarMensajeCSS(tipo,texto){

    if(tipo == "error"){
        $("#messagesCSS").append("<div class='error-message'>Error: "+texto+"<span class='closebtn' onclick='this.parentElement.parentElement.style.display='none';'>&times;</span></div>");
        $(".error-message").addClass("error-styling");
    }
    else if(tipo == "correcto"){
        $("#messagesCSS").append("<div class='success-message'>Correcte: "+texto+"<span class='closebtn' onclick='this.parentElement.parentElement.style.display='none';'>&times;</span></div>");
        $(".success-message").addClass("success-styling");
    }
    else if(tipo == "info"){
        $("#messagesCSS").append("<div class='info-message'>Info: "+texto+"<span class='closebtn' onclick='this.parentElement.parentElement.style.display='none';'>&times;</span></div>");
        $(".info-message").addClass("info-styling");
    }
    else if(tipo == "warning"){
        $("#messagesCSS").append("<div class='warning-message'>Vigila: "+texto+"<span class='closebtn' onclick='this.parentElement.parentElement.style.display='none';'>&times;</span></div>");
        $(".warning-message").addClass("warning-styling");
    }

    cerrarMensajeCSS();
}

$(".botonPoll").click(function(){
    $('#tituloAccionBotones').html($(this).attr('name'));
    if($(this).attr('id')=="botonCrearPregunta"){
        $("#contenedorListaPreguntas").css("display","none");
        $("#contenedorListaEncuestas").css("display","none");
        $("#contenedorCrearEncuesta").css("display","none");
        $("#contenedorCrearPregunta").css("display","block");
        $("#contenedorFormulario").remove();
        crearFormularioDinamico();
    }
    else if($(this).attr('id')=="botonCrearEncuesta"){
        $("#contenedorFormulario").remove();
        $("#contenedorListaEncuestas").css("display","none");
        $("#contenedorListaPreguntas").css("display","none");
        $("#contenedorCrearPregunta").css("display","none");
        $("#contenedorCrearEncuesta").css("display","block");
        $("#contenedorFormulario").remove();
        crearFormularioDinamicoEncuesta();
    }
    else if($(this).attr('id')=="botonListarPreguntas"){
        $("#contenedorCrearEncuesta").css("display","none");
        $("#contenedorListaEncuestas").css("display","none");
        $("#contenedorCrearPregunta").css("display","none");
        $("#contenedorFormulario").remove();
        $("#contenedorListaPreguntas").css("display","block");
    }
    else if($(this).attr('id')=="botonListarEncuestas"){
        $("#contenedorListaPreguntas").css("display","none");
        $("#contenedorCrearEncuesta").css("display","none");
        $("#contenedorCrearPregunta").css("display","none");
        $("#contenedorFormulario").remove();
        $("#contenedorListaEncuestas").css("display","block");
    }
    
});


function crearFormularioDinamico(){
    var nombreInput;
    var primerInput;
    var segundoInput;
    crearDiv("#contenedorCrearPregunta","contenedorFormulario");
    crearFormulario("#contenedorFormulario","idFormPregunta");
    crearSelectForm("Tipus de pregunta:","tipoPregunta","tipoPregunta","#idFormPregunta");
    crearOptionSelect("Tipus de pregunta","#tipoPregunta",true);
    crearOptionSelect("text","#tipoPregunta");
    crearOptionSelect("numeric","#tipoPregunta");
    crearOptionSelect("simple","#tipoPregunta");
    crearLabelAndInput("Nom de pregunta:","text","inpNombrePregunta","inpNombrePregunta","#idFormPregunta");
    crearInput("reset","borrarPregunta","borrarPregunta","Cancelar","#idFormPregunta");

    $("#tipoPregunta").on('change', function() {
        //Si la opción del desplegable es 'text'
        if ($(this).val() == 'text'){
            reiniciarFormulario();
            
            $("#inpNombrePregunta").on('input',function(){
                $("#borrarPregunta").remove();
                if(!$("#guardarPregunta").val()){
                    crearInput("submit","guardarPregunta","guardarPregunta","Guardar","#idFormPregunta");
                }
                if($("#inpNombrePregunta").val() == ""){
                    $("#guardarPregunta").remove();
                }
                crearInput("button","borrarPregunta","borrarPregunta","Cancelar","#idFormPregunta");
                $("#borrarPregunta").click(function(){
                    $("#contenedorFormulario").remove();
                    crearFormularioDinamico();
                });
            });
            crearInput("button","borrarPregunta","borrarPregunta","Cancelar","#idFormPregunta");
            $("#borrarPregunta").click(function(){
                $("#contenedorFormulario").remove();
                crearFormularioDinamico();
            });
        }

        //Si la opción del desplegable es 'numeric'
        else if ($(this).val() == 'numeric') {
            
            reiniciarFormulario();
            $("#inpNombrePregunta").on('input',function(){
                $("#borrarPregunta").remove();
                if(!$("#guardarPregunta").val() && $("#inpNombrePregunta").length > 0){
                    crearInput("submit","guardarPregunta","guardarPregunta","Guardar","#idFormPregunta");
                }
                if($("#inpNombrePregunta").val() == ""){
                    $("#guardarPregunta").remove();
                }
                crearInput("button","borrarPregunta","borrarPregunta","Cancelar","#idFormPregunta");
                $("#borrarPregunta").click(function(){
                    $("#contenedorFormulario").remove();
                    crearFormularioDinamico();
                });
            });
            crearInput("button","borrarPregunta","borrarPregunta","Cancelar","#idFormPregunta");
            $("#borrarPregunta").click(function(){
                $("#contenedorFormulario").remove();
                crearFormularioDinamico();
            });

        }

        //Si la opción del desplegable es 'simple'
        else if ($(this).val() == 'simple'){


            $("#inpNombrePregunta").val("");
            $("#guardarPregunta").remove();
            $("#borrarPregunta").remove();

            crearDiv("#idFormPregunta","contenedorDinamico");
            crearParrafoDiv("#contenedorDinamico", "parrafoDinamico", "Introdueix l\'opció correcta en la primera casella")
            creacionInputsDinamicos(2);
            crearBoton("idAñadirInput", "button","Afegir", "#idFormPregunta");

            const contenedor = document.querySelector("#contenedorDinamico");
            const botonAgregar = document.querySelector("#idAñadirInput");

            let totalInputs = 3;

            //let primerInput = $('#contenedorDinamico').find('input[type=text]').filter(':visible:first');
            //nombreInput = $("input[type=text]:eq(0)");
            primerInput = $("#inputSimpleRespuesta1");
            segundoInput = $("#inputSimpleRespuesta2");

            $("#botonEliminarInput1").prop("disabled", true);
            $("#botonEliminarInput2").prop("disabled", true);
            

            botonAgregar.addEventListener('click', e=> {
                let div = document.createElement('div');
                div.innerHTML = `<label>${totalInputs++}</label> - <input type="text" class="inputSimpleRespuesta" name="nombre[]" placeholder="Introdueix resposta" required><button type="button" class="botonEliminarInput" onclick="eliminarInputDinamico(this)">Eliminar</button>`;
                contenedor.appendChild(div);
            });

            eliminarInputDinamico = (e) => {
                const divPadre = e.parentNode;
                divPadre.querySelector("input").value = "";
                contenedor.removeChild(divPadre);
                actualizarNumeroInput();
            };

            actualizarNumeroInput = () => {
                let divs = contenedor.children;
                totalInputs = 1;
                for(let i = 0; i < divs.length; i++) {
                    
                    divs[i].children[0].innerHTML = totalInputs++;
                }
                funcionesDinamicasFormulario();
                
            };

            

            primerInput.on("input", function(){
                funcionesDinamicasFormulario();
            });

            segundoInput.on("input", function(){
                funcionesDinamicasFormulario();
            });

            $("#inpNombrePregunta").on('input',function(){
                funcionesDinamicasFormulario();
            });
            crearInput("button","borrarPregunta","borrarPregunta","Cancelar","#idFormPregunta");
            $("#borrarPregunta").click(function(){
                $("#contenedorFormulario").remove();
                crearFormularioDinamico();
            });
        }
    });
}

function crearFormularioDinamicoEncuesta(){
    crearDiv("#contenedorCrearEncuesta","contenedorFormulario");
    crearFormulario("#contenedorFormulario","idFormEncuesta");

    crearDiv("#idFormEncuesta","contenedorNombreEncuesta");
    crearLabelAndInput("Nom d'enquesta:<br>","text","inpNombreEncuesta","inpNombreEncuesta","#contenedorNombreEncuesta");

    crearDiv("#idFormEncuesta","contenedorEleccionFechas");
    crearDiv("#contenedorEleccionFechas","contenedorEleccionFechasInicio");
    crearLabelAndInput("Data inici:<br>","datetime-local","inpFechaInicio","inpFechaInicio","#contenedorEleccionFechasInicio");
    crearDiv("#contenedorEleccionFechas","contenedorEleccionFechasFinal");
    crearLabelAndInput("Data final:<br>","datetime-local","inpFechaFinal","inpFechaFinal","#contenedorEleccionFechasFinal");

    crearDiv("#idFormEncuesta","contenedorProfesores");
    crearParrafoDiv("#contenedorProfesores","parrafoProfesores","Escull els professors per a l'enquesta:");
    crearInput("text", "nombresProfesores", "nombresProfesores", null, "#contenedorProfesores");
    $("#nombresProfesores").css("visibility", "hidden");

    crearDiv("#contenedorProfesores","contenedorEleccionProfesores");

    crearDiv("#contenedorEleccionProfesores","contenedorProfesoresDisponibles");
    crearParrafoDiv("#contenedorProfesoresDisponibles","parrafoProfesores","Professors disponibles:");
    arrayNombreProfesores(arrayProfesores,"button","botonProfesor","#contenedorProfesoresDisponibles");

    crearDiv("#contenedorEleccionProfesores","contenedorBotonesProfesores");
    crearBoton("pasarProfesorBoton", "button", "Afegir", "#contenedorBotonesProfesores");
    crearBoton("borrarProfesorBoton", "button", "Borrar", "#contenedorBotonesProfesores");

    crearDiv("#contenedorEleccionProfesores","contenedorProfesoresSeleccionados");
    crearParrafoDiv("#contenedorProfesoresSeleccionados","parrafoProfesores","Professors seleccionats:");
    
    funcionesBotonesProfesorEncuestas();

}

function crearDiv(idContenedorPadre,idContenedorNuevo){
    const contenedorNuevo = "<div id='"+idContenedorNuevo+"'></div>";
    $(idContenedorPadre).append(contenedorNuevo);
}

function crearParrafoDiv(idContenedorPadre, idParrafo, textoParrafo){
    const parrafoNuevo = "<p id='"+idParrafo+"'>"+textoParrafo+"</p>";
    $(idContenedorPadre).append(parrafoNuevo);
}

function crearFormulario(contenedorPadre, idFormulario){
    const formularioNuevo = "<form id='"+idFormulario+"' method='post'></form>";
    $(contenedorPadre).append(formularioNuevo);
}

function crearLabelAndInput(label, tipoInput, idInput, nameInput, idFormularioPadre){
    const labelNuevo = "<label id='"+nameInput+"Label' for='"+nameInput+"'>"+label+"</label>&nbsp;&nbsp;";
    const inputNuevo = "<input type='"+tipoInput+"' id='"+idInput+"' name='"+nameInput+"'><br>";

    $(idFormularioPadre).append(labelNuevo);
    $(idFormularioPadre).append(inputNuevo);
}

function crearSelectForm(label,idSelect,nameSelect,idFormularioPadre){
    const labelNuevo = "<label id='"+nameSelect+"Label' for='"+nameSelect+"'>"+label+"</label>&nbsp;&nbsp;";
    const selectNuevo = "<select id='"+idSelect+"' name='"+nameSelect+"'></select>";

    $(idFormularioPadre).append(labelNuevo);
    $(idFormularioPadre).append(selectNuevo);
}

function crearOptionSelect(valueOption,idSelectPadre,optionSelected = false){
    if(optionSelected){
        const optionNueva = "<option value='"+valueOption+"' disabled selected>"+valueOption+"</option>";
        $(idSelectPadre).append(optionNueva);
    }
    else{
        const optionNueva = "<option value='"+valueOption+"'>"+valueOption+"</option>";
        $(idSelectPadre).append(optionNueva);
    }
}

function crearInput(tipoInput, idInput, nameInput, valueInput = null, idFormularioPadre){
    const inputNuevo = "<input type='"+tipoInput+"' id='"+idInput+"' name='"+nameInput+"' value='"+valueInput+"'>";

    $(idFormularioPadre).append(inputNuevo);    
}

function crearBoton(idBoton, tipoBoton, valueBoton, padre){
    const botonNuevo = "<button type='"+tipoBoton+"' id='"+idBoton+"' value='"+valueBoton+"'>"+valueBoton+"</button>";

    $(padre).append(botonNuevo);
}

function crearBotonProfesoresEncuestas(claseBoton, idBoton, tipoBoton, valueBoton, padre){
    const botonNuevo = "<button type='"+tipoBoton+"' class='"+claseBoton+"' id='"+idBoton+"' value='"+valueBoton+"'>"+valueBoton+"</button>";

    $(padre).append(botonNuevo);
}

function creacionInputsDinamicos(numInputs){
    const contenedor = document.querySelector("#contenedorDinamico");

    for (let i = 1; i < numInputs+1; i++) {
        let div = document.createElement('div');
        div.innerHTML = `<label>${i}</label> - <input type="text" class="inputSimpleRespuesta" id="inputSimpleRespuesta${i}" name="nombre[]" placeholder="Introdueix resposta" required><button type="button" class="botonEliminarInput" id="botonEliminarInput${i}" onclick="eliminarInputDinamico(this)">Eliminar</button>`;
        contenedor.appendChild(div);
    }
}

function reiniciarFormulario(){
    $("#inpNombrePregunta").val("");
    $("#guardarPregunta").remove();
    $("#contenedorDinamico").remove();
    $("#idAñadirInput").remove();
    $("#borrarPregunta").remove();
}

function funcionesDinamicasFormulario(){
    nombreInput = $("input[type=text]:eq(0)").val();
    if($("#tipoPregunta").val() == "simple"){
        primerInput = $("input[type=text]:eq(1)").val();
        segundoInput = $("input[type=text]:eq(2)").val();
    }
    
    $("#borrarPregunta").remove();
    if(!$("#guardarPregunta").val() && nombreInput.length > 0 && primerInput.length > 0 && segundoInput.length > 0){
        crearInput("submit","guardarPregunta","guardarPregunta","Guardar","#idFormPregunta");
    }
    if(nombreInput.length == 0 || primerInput.length == 0 || segundoInput.length == 0){
        $("#guardarPregunta").remove();
    }
    crearInput("button","borrarPregunta","borrarPregunta","Cancelar","#idFormPregunta");
    $("#borrarPregunta").click(function(){
        $("#contenedorFormulario").remove();
        crearFormularioDinamico();
    });
}

function avisoEliminar(e){
    crearDiv("#contenedorCrearPregunta","contenedorAvisoEliminar");
    crearParrafoDiv("#contenedorAvisoEliminar", "parrafoAviso", "Vols eliminar aquesta resposta?");
    crearBoton("btnAvisoEliminarSi", "button", "Sí", "#contenedorAvisoEliminar");
    crearBoton("btnAvisoEliminarNo", "button", "No", "#contenedorAvisoEliminar");
    $("#btnAvisoEliminarNo").click(function(){
        $("#contenedorAvisoEliminar").remove();
    });
    $("#btnAvisoEliminarSi").click(function(){
        $("#contenedorAvisoEliminar").remove();
        eliminarInputDinamico(e);
    });
    
}

function arrayNombreProfesores(array,tipoBoton,idBoton,divPadre){
    for (let i = 0; i < array.length; i++) {
        $(divPadre).append("<button type='"+tipoBoton+"' class='"+idBoton+"' id='"+idBoton+i+"' value='"+array[i]+"'>"+array[i]+"</button>");
    }
}

function arrayNombrePreguntas(array,tipoBoton,idBoton,divPadre){
    for (let i = 0; i < array.length; i++) {
        $(divPadre).append("<button type='"+tipoBoton+"' class='"+idBoton+"' id='"+idBoton+i+"' value='"+array[i]+"'>"+array[i]+"</button>");
    }
}

function arrayNombreAlumnos(array,tipoBoton,idBoton,divPadre){
    for (let i = 0; i < array.length; i++) {
        $(divPadre).append("<button type='"+tipoBoton+"' class='"+idBoton+"' id='"+idBoton+i+"' value='"+array[i]+"'>"+array[i]+"</button>");
    }
}

function funcionesBotonesProfesorEncuestas(){
    var idBotonClick;
    var valueBotonClick;

    $(".botonProfesor").click(function(e){
        valueBotonClick = e.target.value;
        idBotonClick = e.target.id;
        $(".botonProfesor").css("background-color","lightgray");
        $("#"+idBotonClick).css("background-color","orange");
        
        $("#pasarProfesorBoton").click(function() {
            $("#"+idBotonClick).remove();
            crearBotonProfesoresEncuestas("botonProfesor",idBotonClick,"button",valueBotonClick,"#contenedorProfesoresSeleccionados");
            toogleDivPreguntasEncuestas();

            $(".botonProfesor").click(function(e){
                valueBotonClick = e.target.value;
                idBotonClick = e.target.id;
                $(".botonProfesor").css("background-color","lightgray");
                $("#"+idBotonClick).css("background-color","orange");
                
                $("#pasarProfesorBoton").click(function() {
                    $("#"+idBotonClick).remove();
                    crearBotonProfesoresEncuestas("botonProfesor",idBotonClick,"button",valueBotonClick,"#contenedorProfesoresSeleccionados");
                    toogleDivPreguntasEncuestas();
                    funcionesBotonesProfesorEncuestas();
                })
            
                $("#borrarProfesorBoton").click(function() {
                    $("#"+idBotonClick).remove();
                    crearBotonProfesoresEncuestas("botonProfesor",idBotonClick,"button",valueBotonClick,"#contenedorProfesoresDisponibles");
                    toogleDivPreguntasEncuestas();
                    funcionesBotonesProfesorEncuestas();
                })
            });
        })
    
        $("#borrarProfesorBoton").click(function() {
            $("#"+idBotonClick).remove();
            crearBotonProfesoresEncuestas("botonProfesor",idBotonClick,"button",valueBotonClick,"#contenedorProfesoresDisponibles");
            toogleDivPreguntasEncuestas();

            $(".botonProfesor").click(function(e){
                valueBotonClick = e.target.value;
                idBotonClick = e.target.id;
                $(".botonProfesor").css("background-color","lightgray");
                $("#"+idBotonClick).css("background-color","orange");
                
                $("#pasarProfesorBoton").click(function() {
                    $("#"+idBotonClick).remove();
                    crearBotonProfesoresEncuestas("botonProfesor",idBotonClick,"button",valueBotonClick,"#contenedorProfesoresSeleccionados");
                    toogleDivPreguntasEncuestas();
                })
            
                $("#borrarProfesorBoton").click(function() {
                    $("#"+idBotonClick).remove();
                    crearBotonProfesoresEncuestas("botonProfesor",idBotonClick,"button",valueBotonClick,"#contenedorProfesoresDisponibles");
                    toogleDivPreguntasEncuestas();
                })
            });
        })
    });
}

function funcionesBotonesPreguntaEncuestas(){
    var idBotonClickPregunta;
    var valueBotonClickPregunta;

    $(".botonPregunta").click(function(e){
        valueBotonClickPregunta = e.target.value;
        idBotonClickPregunta = e.target.id;
        $(".botonPregunta").css("background-color","lightgray");
        $("#"+idBotonClickPregunta).css("background-color","orange");
        
        $("#pasarPreguntaBoton").click(function() {
            $("#"+idBotonClickPregunta).remove();
            crearBotonProfesoresEncuestas("botonPregunta",idBotonClickPregunta,"button",valueBotonClickPregunta,"#contenedorPreguntasSeleccionadas");
            toogleDivAlumnosEncuestas();

            $(".botonPregunta").click(function(e){
                valueBotonClickPregunta = e.target.value;
                idBotonClickPregunta = e.target.id;
                $(".botonPregunta").css("background-color","lightgray");
                $("#"+idBotonClickPregunta).css("background-color","orange");
                
                $("#pasarPreguntaBoton").click(function() {
                    $("#"+idBotonClickPregunta).remove();
                    crearBotonProfesoresEncuestas("botonPregunta",idBotonClickPregunta,"button",valueBotonClickPregunta,"#contenedorPreguntasSeleccionadas");
                    toogleDivAlumnosEncuestas();
                    funcionesBotonesPreguntaEncuestas();
                })
            
                $("#borrarPreguntaBoton").click(function() {
                    $("#"+idBotonClickPregunta).remove();
                    crearBotonProfesoresEncuestas("botonPregunta",idBotonClickPregunta,"button",valueBotonClickPregunta,"#contenedorPreguntasDisponibles");
                    toogleDivAlumnosEncuestas();
                    funcionesBotonesPreguntaEncuestas();
                })
            });
        })
    
        $("#borrarPreguntaBoton").click(function() {
            $("#"+idBotonClickPregunta).remove();
            crearBotonProfesoresEncuestas("botonPregunta",idBotonClickPregunta,"button",valueBotonClickPregunta,"#contenedorPreguntasDisponibles");
            toogleDivAlumnosEncuestas();

            $(".botonPregunta").click(function(e){
                valueBotonClickPregunta = e.target.value;
                idBotonClickPregunta = e.target.id;
                $(".botonPregunta").css("background-color","lightgray");
                $("#"+idBotonClickPregunta).css("background-color","orange");
                
                $("#pasarPreguntaBoton").click(function() {
                    $("#"+idBotonClickPregunta).remove();
                    crearBotonProfesoresEncuestas("botonPregunta",idBotonClickPregunta,"button",valueBotonClickPregunta,"#contenedorPreguntasSeleccionadas");
                    toogleDivAlumnosEncuestas();
                })
            
                $("#borrarPreguntaBoton").click(function() {
                    $("#"+idBotonClickPregunta).remove();
                    crearBotonProfesoresEncuestas("botonPregunta",idBotonClickPregunta,"button",valueBotonClickPregunta,"#contenedorPreguntasDisponibles");
                    toogleDivAlumnosEncuestas();
                })
            });
        })
    });
}


function funcionesBotonesAlumnoEncuestas(){
    var idBotonClickAlumno;
    var valueBotonClickAlumno;

    $(".botonAlumno").click(function(e){
        valueBotonClickAlumno = e.target.value;
        idBotonClickAlumno = e.target.id;
        $(".botonAlumno").css("background-color","lightgray");
        $("#"+idBotonClickAlumno).css("background-color","orange");
        
        $("#pasarAlumnoBoton").click(function() {
            $("#"+idBotonClickAlumno).remove();
            crearBotonProfesoresEncuestas("botonAlumno",idBotonClickAlumno,"button",valueBotonClickAlumno,"#contenedorAlumnosSeleccionados");
            toogleBotonesFinalesFormulario();

            $(".botonAlumno").click(function(e){
                valueBotonClickAlumno = e.target.value;
                idBotonClickAlumno = e.target.id;
                $(".botonAlumno").css("background-color","lightgray");
                $("#"+idBotonClickAlumno).css("background-color","orange");
                
                $("#pasarAlumnoBoton").click(function() {
                    $("#"+idBotonClickAlumno).remove();
                    crearBotonProfesoresEncuestas("botonAlumno",idBotonClickAlumno,"button",valueBotonClickAlumno,"#contenedorAlumnosSeleccionados");
                    toogleBotonesFinalesFormulario();
                })
            
                $("#borrarAlumnoBoton").click(function() {
                    $("#"+idBotonClickAlumno).remove();
                    crearBotonProfesoresEncuestas("botonAlumno",idBotonClickAlumno,"button",valueBotonClickAlumno,"#contenedorAlumnosDisponibles");
                    toogleBotonesFinalesFormulario();
                })
            });
        })
    
        $("#borrarAlumnoBoton").click(function() {
            $("#"+idBotonClickAlumno).remove();
            crearBotonProfesoresEncuestas("botonAlumno",idBotonClickAlumno,"button",valueBotonClickAlumno,"#contenedorAlumnosDisponibles");
            toogleBotonesFinalesFormulario();

            $(".botonAlumno").click(function(e){
                valueBotonClickAlumno = e.target.value;
                idBotonClickAlumno = e.target.id;
                $(".botonAlumno").css("background-color","lightgray");
                $("#"+idBotonClickAlumno).css("background-color","orange");
                
                $("#pasarAlumnoBoton").click(function() {
                    $("#"+idBotonClickAlumno).remove();
                    crearBotonProfesoresEncuestas("botonAlumno",idBotonClickAlumno,"button",valueBotonClickAlumno,"#contenedorAlumnosSeleccionados");
                    toogleBotonesFinalesFormulario();
                })
            
                $("#borrarAlumnoBoton").click(function() {
                    $("#"+idBotonClickAlumno).remove();
                    crearBotonProfesoresEncuestas("botonAlumno",idBotonClickAlumno,"button",valueBotonClickAlumno,"#contenedorAlumnosDisponibles");
                    toogleBotonesFinalesFormulario();
                })
            });
        })
    });
}


function toogleDivPreguntasEncuestas(){

    if($("#contenedorProfesoresSeleccionados button").length > 0){
        var cadenaNombresProfesores = "";
        for (let i = 0; i < $("#contenedorProfesoresSeleccionados button").length; i++) {
            
            if(i == 0){
                cadenaNombresProfesores += $("#contenedorProfesoresSeleccionados button")[i].value;
                $("#nombresProfesores").val(cadenaNombresProfesores);
            }
            else {
                cadenaNombresProfesores += "," + $("#contenedorProfesoresSeleccionados button")[i].value;
                $("#nombresProfesores").val(cadenaNombresProfesores);
            }
        }
        
        if(!$("#contenedorEleccionPreguntas").length){
            crearDiv("#idFormEncuesta","contenedorPreguntas");
            crearParrafoDiv("#contenedorPreguntas","parrafoPreguntas","Escull les preguntes per a l'enquesta:");
            crearInput("text", "nombresPreguntas", "nombresPreguntas", null, "#contenedorPreguntas");
            $("#nombresPreguntas").css("visibility", "hidden");

            crearDiv("#contenedorPreguntas","contenedorEleccionPreguntas");
            crearDiv("#contenedorEleccionPreguntas","contenedorPreguntasDisponibles");
            crearParrafoDiv("#contenedorPreguntasDisponibles","parrafoPreguntas","Preguntes disponibles:");
            arrayNombreProfesores(arrayPreguntas,"button","botonPregunta","#contenedorPreguntasDisponibles");
        
            crearDiv("#contenedorEleccionPreguntas","contenedorBotonesPreguntas");
            crearBoton("pasarPreguntaBoton", "button", "Afegir", "#contenedorBotonesPreguntas");
            crearBoton("borrarPreguntaBoton", "button", "Borrar", "#contenedorBotonesPreguntas");
        
            crearDiv("#contenedorEleccionPreguntas","contenedorPreguntasSeleccionadas");
            crearParrafoDiv("#contenedorPreguntasSeleccionadas","parrafoProfesores","Preguntes seleccionades:");

            funcionesBotonesPreguntaEncuestas();
        }
    }
    else{
        cadenaNombresProfesores = null;
        $("#nombresProfesores").val(cadenaNombresProfesores);
        $("#contenedorPreguntas").remove();
        $("#contenedorAlumnos").remove();
        $("#contenedorBotonesFinalesEncuesta").remove();
        
    }
}

function toogleDivAlumnosEncuestas(){
    if($("#contenedorPreguntasSeleccionadas button").length > 0){
        var cadenaNombresPreguntas = "";
        for (let i = 0; i < $("#contenedorPreguntasSeleccionadas button").length; i++) {
            
            if(i == 0){
                cadenaNombresPreguntas += $("#contenedorPreguntasSeleccionadas button")[i].value;
                $("#nombresPreguntas").val(cadenaNombresPreguntas);
            }
            else {
                cadenaNombresPreguntas += "," + $("#contenedorPreguntasSeleccionadas button")[i].value;
                $("#nombresPreguntas").val(cadenaNombresPreguntas);
            }
        }

        if(!$("#contenedorEleccionAlumnos").length){
            crearDiv("#idFormEncuesta","contenedorAlumnos");
            crearParrafoDiv("#contenedorAlumnos","parrafoAlumnos","Escull els alumnes per a l'enquesta:");
            crearInput("text", "nombresAlumnos", "nombresAlumnos", null, "#contenedorAlumnos");
            $("#nombresAlumnos").css("visibility", "hidden");

            crearDiv("#contenedorAlumnos","contenedorEleccionAlumnos");
            crearDiv("#contenedorEleccionAlumnos","contenedorAlumnosDisponibles");
            crearParrafoDiv("#contenedorAlumnosDisponibles","parrafoAlumnos","Alumnes disponibles:");
            arrayNombreAlumnos(arrayAlumnos,"button","botonAlumno","#contenedorAlumnosDisponibles");
        
            crearDiv("#contenedorEleccionAlumnos","contenedorBotonesAlumnos");
            crearBoton("pasarAlumnoBoton", "button", "Afegir", "#contenedorBotonesAlumnos");
            crearBoton("borrarAlumnoBoton", "button", "Borrar", "#contenedorBotonesAlumnos");
        
            crearDiv("#contenedorEleccionAlumnos","contenedorAlumnosSeleccionados");
            crearParrafoDiv("#contenedorAlumnosSeleccionados","parrafoAlumnos","Alumnes seleccionats:");

            funcionesBotonesAlumnoEncuestas();
        }
    }
    else{
        cadenaNombresPreguntas = null;
        $("#nombresProfesores").val(cadenaNombresPreguntas);
        $("#contenedorAlumnos").remove();
        $("#contenedorBotonesFinalesEncuesta").remove();
    }
}

function toogleBotonesFinalesFormulario(){
    if($("#contenedorAlumnosSeleccionados button").length > 0){
        var cadenaNombresAlumnos = "";
        for (let i = 0; i < $("#contenedorAlumnosSeleccionados button").length; i++) {
            
            if(i == 0){
                cadenaNombresAlumnos += $("#contenedorAlumnosSeleccionados button")[i].value;
                $("#nombresAlumnos").val(cadenaNombresAlumnos);
            }
            else {
                cadenaNombresAlumnos += "," + $("#contenedorAlumnosSeleccionados button")[i].value;
                $("#nombresAlumnos").val(cadenaNombresAlumnos);
            }
        }

        if(!$("#contenedorBotonesFinalesEncuesta").length){
            crearDiv("#idFormEncuesta","contenedorBotonesFinalesEncuesta");
            crearInput("submit","guardarEncuesta","guardarEncuesta","Guardar","#contenedorBotonesFinalesEncuesta");
            crearInput("button","borrarEncuesta","borrarEncuesta","Cancelar","#contenedorBotonesFinalesEncuesta");
            $("#borrarEncuesta").click(function(){
                $("#contenedorFormulario").remove();
                crearFormularioDinamicoEncuesta();
            });
        }
    }
    else{
        cadenaNombresAlumnos = null;
        $("#nombresAlumnos").val(cadenaNombresAlumnos);
        $("#contenedorBotonesFinalesEncuesta").remove();
    }

}

function eliminarHijos(padre){
    $(padre).children().remove();
}

function eliminarScrollBody(body){
    $(body).css("overflow-y","hidden");
}

