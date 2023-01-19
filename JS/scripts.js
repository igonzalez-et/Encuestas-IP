$(".botonPoll").click(function(){
    $('#tituloAccionBotones').html($(this).attr('name'));
    if($(this).attr('id')=="botonCrearPregunta"){
        $("#contenedorListaPreguntas").css("display","none");
        $("#contenedorListaEncuestas").css("display","none");
        $("#contenedorCrearEncuesta").css("display","none");
        $("#contenedorCrearPregunta").css("display","block");
    }
    else if($(this).attr('id')=="botonCrearEncuesta"){
        $("#contenedorListaPreguntas").css("display","none");
        $("#contenedorListaEncuestas").css("display","none");
        $("#contenedorCrearPregunta").css("display","none");
        $("#contenedorCrearEncuesta").css("display","block");
    }
    else if($(this).attr('id')=="botonListarPreguntas"){
        $("#contenedorCrearEncuesta").css("display","none");
        $("#contenedorListaEncuestas").css("display","none");
        $("#contenedorCrearPregunta").css("display","none");
        $("#contenedorListaPreguntas").css("display","block");
    }
    else if($(this).attr('id')=="botonListarEncuestas"){
        $("#contenedorListaPreguntas").css("display","none");
        $("#contenedorCrearEncuesta").css("display","none");
        $("#contenedorCrearPregunta").css("display","none");
        $("#contenedorListaEncuestas").css("display","block");
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
