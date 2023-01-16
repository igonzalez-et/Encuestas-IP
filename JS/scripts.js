$(".botonPoll").click(function(){
    $('#tituloAccionBotones').html($(this).attr('name'));
    //eliminarHijos('#contenedorDinamico');
    if($(this).attr('id')=="botonCrearPregunta"){
        crearFormulario('#contenedorDinamico');
    }
    else if($(this).attr('id')=="botonCrearEncuesta"){
        $("#contenedorListaPreguntas").hidden();
        $("#contenedorListaEncuestas").hidden();
        $("#contenedorCrearPregunta").show();
    }
    else if($(this).attr('id')=="botonListarPreguntas"){
        $("#contenedorCrearPregunta").hidden();
        $("#contenedorListaEncuestas").hidden();
        $("#contenedorListaPreguntas").show();
    }
    else if($(this).attr('id')=="botonListarEncuestas"){
        $("#contenedorListaPreguntas").hidden();
        $("#contenedorCrearPregunta").hidden();
        $("#contenedorListaEncuestas").show();
    }
    
});

function eliminarHijos(padre){
    $(padre).children().remove();
}

function crearFormulario(padre){
    $(padre).html("<form method='post'>\n"+
    "<label for='inpNombrePregunta'>Nombre de Pregunta</label>&nbsp;&nbsp;\n"+
    "<input type='text' id='inpNombrePregunta'><br>\n"+
    "<label for='tipoPregunta'>Tipo de pregunta:</label>&nbsp;&nbsp;\n"+
    "<select id='tipoPregunta'>\n"+
    "<option value='text' selected>Text</option>\n"+
    "<option value='numeric'>Numeric</option>\n"+
    "</select><br>\n"+
    "<input type='submit' value='Guardar'>"+
    "<input type='reset' value='Cancelar'>"+
    "</form>"
    )
}