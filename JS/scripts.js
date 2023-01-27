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
    crearLabelAndInput("Nom de Pregunta","text","inpNombrePregunta","inpNombrePregunta","#idFormPregunta");
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
                mostrarMensajeCSS("correcto","Has afegit una nova resposta");
            });

            eliminarInputDinamico = (e) => {
                const divPadre = e.parentNode;
                divPadre.querySelector("input").value = "";
                contenedor.removeChild(divPadre);
                mostrarMensajeCSS("warning","Has eliminat una resposta");
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
    const botonNuevo = "<button type='"+tipoBoton+"' id='"+idBoton+"'>"+valueBoton+"</button>";

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

function eliminarHijos(padre){
    $(padre).children().remove();
}

function eliminarScrollBody(body){
    $(body).css("overflow-y","hidden");
}

