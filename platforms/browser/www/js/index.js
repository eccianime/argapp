function onBodyLoad() {
	document.addEventListener("deviceready", PGcargado, false);
	document.addEventListener("backbutton", botonAtras, false);
}

function botonAtras( e ) {
	e.preventDefault();
}

function PGcargado(){
	$.mobile.defaultPageTransition = 'slideup';
	$.mobile.loadingMessage = "Cargando...";
	$.mobile.loadingMessageTextVisible = true;
	$.mobile.loadingMessageTheme = "b";
	$.mobile.pageLoadErrorMessage = "Disculpe, su solicitud no pudo ser procesada.";
	$.mobile.pageLoadErrorMessageTheme = "b";
	$.mobile.pageLoadErrorMessageTheme = "b";

	$("#modalGeneral").popup();
}

const SITIO_WEB = "http://cordova-testingsite.rf.gd/";
//const SITIO_WEB = "http://localhost/arg-app/";

const URL_BASE = SITIO_WEB+"webservice-argapp.php?accion=";

function abrirModal( nro, mensaje, regresar = 1 ) {
	var color = nro == 1 ? "rgb(213,14,33)" : ( nro == 2 ? "rgb(90,177,20)" : "rgb(255,168,0)" ) ;
	var titulo = nro == 1 ? "<i class='la la-times-circle'></i> Ocurrió un Error" : ( nro == 2 ? "<i class='la la-check-circle'></i> Éxito" : "<i class='la la-warning'></i> Información" );
	$(".ui-popup").css({backgroundColor:color});
	$(".ui-popup .ui-btn").css({backgroundColor:color});

	$("#tituloModal").html(titulo);
	$("#mensajeModal").html(mensaje);

	if( regresar == 1 ){
		$("#botonAtrasModal").attr('data-rel',"back");
		$("#botonAtrasModal").attr('onclick', "" );
	}else{
		$("#botonAtrasModal").attr('data-rel',"");
		$("#botonAtrasModal").attr('onclick', 'window.history.back();window.history.back();' );
	}

	$("#modalGeneral").popup("open");
}

function mostrarCargando() {
	var loading = "<div class='splash mid-transp'></div>";
	$('[data-role=page]').append(loading);
}

function quitarCargando() {
	$(".splash").remove();
}

function AJAX( url, respuesta, datos )  {
	mostrarCargando();
	$.ajax({
		type: "POST",
		url: URL_BASE+url,
		crossDomain: true,
		success: respuesta,
		data: datos,
		error: function( resp ) {
			quitarCargando();
			abrirModal( 1, "Disculpe, hubo un error.<br/>"+resp.responseText );
		}
	}).always(function() {
		quitarCargando();
	});
}

function rspBase( datos ) {
	abrirModal( datos.nro, datos.msg, datos.reg );	
}

function rspBaseV2( datos ) {
	var fondo = datos.nro == 1 ? "red" : "green";
	var html = "<div class='slide in text-white bg-"+fondo+" alert'>\
					<h4><i class='icon la-fw la la-check'></i> "+datos.msg+".</h4></div>";
	$('.ui-page-active .ui-content').prepend(html);
	$(".alert").delay(1000).fadeOut(1000, function() {
		$(this).remove();
	});
}