AJAX( "verRubros", verRubrosRSP );

function verRubrosRSP( rsp ) {
	var datos = rsp.datos,
		html = "";

	if( datos.length > 0 ){
		datos.map( function( val, idx ) {
			html += "<tr><td>"+val['tx_rubro']+"</td></tr>";
		});

		$("#tablaRubros").empty().append(html);

	}else{
		html += "<tr><td colspan=2><p>NO HAY MARCAS REGISTRADAS<p></td></tr>";
		$("#tablaRubros").empty().append(html);
	}
}

function guardarRubro() {
	var datos = {
		tx_rubro: $("[name=tx_rubro]").val(),
	}

	if( datos.tx_rubro == "" ){
		abrirModal( 1, "No debe dejar campos en blanco" );
	}else{
		AJAX( "guardarRubro", function( rsp ) {
			rspBase( rsp );
			$("[name=tx_rubro]").val("");
			AJAX( "verRubros", verRubrosRSP );
		}, datos );
	}
}
