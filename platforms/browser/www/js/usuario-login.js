$(function() {
	$("[name=tx_usuario]").val("");
	$("[name=tx_clave]").val("");

	localStorage.setItem('usuario', '' );
})

function entrar(){
	var usr = {
		tx_usuario: $("[name=tx_usuario]").val(),
		tx_clave: $("[name=tx_clave]").val()
	}

	if( usr.tx_usuario == "" || usr.tx_clave == "" ){
		abrirModal( 1, "Disculpe, no puede dejar campos vacíos." );
	}else{
		AJAX( "entrar", entrarRSP, usr );
	}	
}

function entrarRSP( datos ){
	if( datos.success == true ){
		var usuario = datos.datos[0];
		localStorage.setItem('usuario', JSON.stringify( usuario ) );

		var page = usuario.co_tipo == 1 ? "usuario" : "admin";
		$( "body" ).pagecontainer( "change", "../../pages/"+page+"/dashboard.html");
	}else{
		abrirModal( 1, "Disculpe, las credenciales utilizadas son incorrectas o el usuario no existe." )
	}	
}