$( function() {
	cargarCredenciales();	
} )


function cargarCredenciales() {
	setTimeout( function() {
		var idP = $("body").pagecontainer( "getActivePage" )[0]['id'].substring(11);
		AJAX( 'verCredenciales', verCredencialesRSP, { id: idP, img: 1 } )
	}, 500 );
}


function verCredencialesRSP( rsp ) {
	var datos 	= rsp.datos,
		html 	= "";

	if( datos.length > 0 ){
		datos.map( function( val, idx ) {
			var img = val['img_logo'] == null || val['img_logo'] == "" ? "../../img/interroga.png" : val['img_logo'];
			html += "<tr><td>"+val['tx_nombre']+"</td>";
			html += "<td><img src='"+img+"' width=50 /></td></tr>";
		});

		$("[name=tablaCredencial]").empty().append(html);
	}else{
		html += "<td colspan=2><p>NO HAY CREDENCIALES REGISTRADAS<p></td>";
		$("[name=tablaCredencial]").empty().append(html);
	}
}

function guardarCredencial() {
	var datos = {
		co_tipo_credencial: $(".ui-page-active [name=co_tipo_credencial]").val(),
		img_logo: $(".ui-page-active [name=img_logo]")[0].files[0],
		tx_nombre: $(".ui-page-active [name=tx_nombre]").val()
	}

	if( datos.img_logo == undefined || datos.tx_nombre == "" ){
		abrirModal( 1, "No puede dejar campos en blanco.");
	}else if( datos.img_logo.name.search("jpg$|jpeg$") < 1 ){
		abrirModal( 1, "Sólo puede subir archivos jpg o jpeg.");
	}else if( datos.img_logo.size / 1024 > 500 ){
		abrirModal( 1, "La imagen es muy grande, por favor suba una imagen que no supere los 500 KB.");
	}else{
		var reader = new FileReader();
		reader.readAsDataURL( datos['img_logo'] );
		reader.onload = function () {
			datos['img_logo'] = reader.result;
			AJAX( "guardarCredencial", guardarCredencialRSP, datos );
		};
		
	}
}

function guardarCredencialRSP( rsp ) {
	rspBase( rsp );
	cargarCredenciales();
	$(".ui-page-active [name=img_logo]").val("");
	$(".ui-page-active [name=tx_nombre]").val("");
}