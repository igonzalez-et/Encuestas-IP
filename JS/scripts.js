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
    // $(".bodyLogin").css("overflow-y", "scroll");
    // $(".bodyDashboard").css("overflow-y", "scroll");
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
        $("#contenedorFormulario").remove();
        crearFormularioDinamico();
    }
    else if($(this).attr('id')=="botonCrearEncuesta"){
        $("#contenedorFormulario").remove();
        $("#contenedorListaEncuestas").css("display","none");
        $("#contenedorListaPreguntas").css("display","none");
        $("#contenedorCrearEncuesta").css("display","block");
    }
    else if($(this).attr('id')=="botonListarPreguntas"){
        $("#contenedorCrearEncuesta").css("display","none");
        $("#contenedorListaEncuestas").css("display","none");
        $("#contenedorFormulario").remove();
        $("#contenedorListaPreguntas").css("display","block");
    }
    else if($(this).attr('id')=="botonListarEncuestas"){
        $("#contenedorListaPreguntas").css("display","none");
        $("#contenedorCrearEncuesta").css("display","none");
        $("#contenedorFormulario").remove();
        $("#contenedorListaEncuestas").css("display","block");
    }
    
});


function crearFormularioDinamico(){
    crearDiv("#contenedorCrearPregunta","contenedorFormulario");
    crearFormulario("#contenedorFormulario","idFormPregunta")
    crearSelectForm("Tipo de pregunta:","tipoPregunta","tipoPregunta","#idFormPregunta");
    crearOptionSelect("Tipus de pregunta","#tipoPregunta",true);
    crearOptionSelect("text","#tipoPregunta");
    crearOptionSelect("numeric","#tipoPregunta");
    crearLabelAndInput("Nombre de Pregunta","text","inpNombrePregunta","inpNombrePregunta","#idFormPregunta");
    crearInput("reset","borrarPregunta","borrarPregunta","Cancelar","#idFormPregunta");

    $("#tipoPregunta").on('change', function() {
        //Si la opción del desplegable es 'text'
        if ($(this).val() == 'text'){

            $("#borrarPregunta").remove();
            $("#inpNombrePregunta").on('input',function(){
                $("#borrarPregunta").remove();
                if(!$("#guardarPregunta").val()){
                    crearInput("submit","guardarPregunta","guardarPregunta","Guardar","#idFormPregunta");
                }
                if($("#inpNombrePregunta").val() == ""){
                    $("#guardarPregunta").remove();
                }
                crearInput("reset","borrarPregunta","borrarPregunta","Cancelar","#idFormPregunta");
            });
            crearInput("reset","borrarPregunta","borrarPregunta","Cancelar","#idFormPregunta");
        }

        //Si la opción del desplegable es 'numeric'
        else if ($(this).val() == 'numeric') {
            
            $("#borrarPregunta").remove();
            $("#inpNombrePregunta").on('input',function(){
                $("#borrarPregunta").remove();
                if(!$("#guardarPregunta").val()){
                    crearInput("submit","guardarPregunta","guardarPregunta","Guardar","#idFormPregunta");
                }
                if($("#inpNombrePregunta").val() == ""){
                    $("#guardarPregunta").remove();
                }
                crearInput("reset","borrarPregunta","borrarPregunta","Cancelar","#idFormPregunta");
            });
            crearInput("reset","borrarPregunta","borrarPregunta","Cancelar","#idFormPregunta");
        }

        //Si la opción del desplegable es 'simple'
        else if ($(this).val() == 'simple'){
            alert("simple");
        }

        //Si la opción del desplegable es '--'
        else{
            $("#contenedorFormulario").remove();
            crearFormularioDinamico();
        }
    });

}

function crearDiv(idContenedorPadre,idContenedorNuevo){
    const contenedorNuevo = "<div id='"+idContenedorNuevo+"'></div>";
    $(idContenedorPadre).append(contenedorNuevo);
}

function crearFormulario(contenedorPadre, idFormulario){
    const formularioNuevo = "<form id='"+idFormulario+"' method='post'></form>";
    $(contenedorPadre).append(formularioNuevo);
}

function crearLabelAndInput(label, tipoInput, idInput, nameInput, idFormularioPadre){
    const labelNuevo = "<label for='"+nameInput+"'>"+label+"</label>&nbsp;&nbsp;";
    const inputNuevo = "<input type='"+tipoInput+"' id='"+idInput+"' name='"+nameInput+"'><br>";

    $(idFormularioPadre).append(labelNuevo);
    $(idFormularioPadre).append(inputNuevo);
}

function crearSelectForm(label,idSelect,nameSelect,idFormularioPadre){
    const labelNuevo = "<label for='"+nameSelect+"'>"+label+"</label>&nbsp;&nbsp;";
    const selectNuevo = "<select id='"+idSelect+"' name='"+nameSelect+"'></select><br>";

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

function eliminarHijos(padre){
    $(padre).children().remove();
}

function eliminarScrollBody(body){
    $(body).css("overflow-y","scroll");
}


