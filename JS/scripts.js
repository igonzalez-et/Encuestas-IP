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
        // $("#errorMessage").html(texto);
        // $(".alert").css("display","block");

        console.log(tipo+" "+texto);
        $("#messagesCSS").append("<div class='error-message'>Operación error<span class='closebtn' onclick='this.parentElement.parentElement.style.display='none';'>&times;</span></div>");
        $(".error-message").addClass("error-styling");
    }
    else if(tipo == "correcto"){
        // window.location.href = "http://localhost:8080/dashboard.php";
        // $("#correctoMessage").html(texto);
        // $(".correcto").css("display","block");

        console.log(tipo+" "+texto);
        $("#messagesCSS").append("<div class='success-message'>Operación error<span class='closebtn' onclick='this.parentElement.parentElement.style.display='none';'>&times;</span></div>");
        $(".success-message").addClass("success-styling");
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
    // else if($(this).attr('id')=="botonCrearEncuesta"){
    //     $("#contenedorListaPreguntas").hidden();
    //     $("#contenedorListaEncuestas").hidden();
    //     $("#contenedorCrearPregunta").show();
    // }
    // else if($(this).attr('id')=="botonListarPreguntas"){
    //     $("#contenedorCrearPregunta").hidden();
    //     $("#contenedorListaEncuestas").hidden();
    //     $("#contenedorListaPreguntas").show();
    // }
    // else if($(this).attr('id')=="botonListarEncuestas"){
    //     $("#contenedorListaPreguntas").hidden();
    //     $("#contenedorCrearPregunta").hidden();
    //     $("#contenedorListaEncuestas").show();
    // }
    
});

function eliminarHijos(padre){
    $(padre).children().remove();
}

