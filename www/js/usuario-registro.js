$('.ui-page-active [name=fe_fecha_nacimiento]').mask('00/00/0000');

function registrarUsuario(){
	var datos = {
		tx_nombres: $(".ui-page-active [name=tx_nombres]").val(),
		tx_apellidos: $(".ui-page-active  [name=tx_apellidos]").val(),
		co_genero: $(".ui-page-active  [name=co_genero]").val(),
		fe_fecha_nacimiento: $(".ui-page-active  [name=fe_fecha_nacimiento]").val(),
		tx_usuario: $(".ui-page-active  [name=tx_usuario]").val(),
		tx_correo: $(".ui-page-active  [name=tx_correo]").val(),
		tx_clave: $(".ui-page-active  [name=tx_clave]").val(),
		tx_clave_r: $(".ui-page-active  [name=tx_clave_r]").val(),
	}
	var datos_blancos = 0;
	for ( var elemento in datos ){
		if( datos[elemento] == "" ){ datos_blancos++; }
	}
	
	if( datos_blancos > 0 ){
		abrirModal( 1, "Existen datos en blanco. Corrija por favor." );
	}else if( datos.tx_usuario.length < 6 ){
		abrirModal( 1, "El nombre de usuario debe tener como mínimo 6 carácteres. Ingrese un nombre de usuario más largo por favor." );
	}else if( !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(datos.tx_correo)) ){
		abrirModal( 1, "La dirección de correo es inválida. Corrija por favor." );
	}else if( datos.tx_clave.length < 6 ){
		abrirModal( 1, "Las contraseñas deben tener como mínimo 6 carácteres. Ingrese una contraseña más larga por favor." );
	}else if( datos.tx_clave !== datos.tx_clave_r ){
		abrirModal( 1, "Las contraseñas no coinciden. Corrija por favor." );
	}else{
		AJAX( 'registrarUsuario', rspBase, datos );
	}
}