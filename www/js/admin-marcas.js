AJAX( "verRubros", verRubrosRSP );

function verRubrosRSP( rsp ) {
	var datos 	= rsp.datos,
		html 	= "";

	if( datos.length > 0 ){
		datos.map( function( val, idx ) {
			html += "<option value="+val['co_rubro']+">"+val['tx_rubro']+"</option>";
		});

		$("[name=tx_rubro]")
			.append(html);
		$("[name=tx_rubro_filtro]")
			.append(html)
			.ready(function() {
				verMarcas();
		})
	}
}

function verMarcas() {
	var datos = {
		co_rubro: $("[name=tx_rubro_filtro] option:selected").attr('value'),
	}
	AJAX( "verMarcas", verMarcasRSP, datos );
}

function verMarcasRSP( rsp ) {
	var datos = rsp.datos,
		html = "";

	if( datos.length > 0 ){
		datos.map( function( val, idx ) {
			html += "<tr><td>"+val['tx_marca']+"</td>";
			html += "<td>"+val['tx_rubro']+"</td></tr>";
		});

		$("#tablaMarcas").empty().append(html);

	}else{
		html += "<td colspan=2><p>NO HAY MARCAS REGISTRADAS<p></td>";
		$("#tablaMarcas").empty().append(html);
	}
}

function guardarMarca() {
	var datos = {
		tx_marca: $("[name=tx_marca]").val(),
		co_rubro: $("[name=tx_rubro] option:selected").attr('value'),
	}

	if( datos.tx_marca == "" || datos.co_rubro == "" ){
		abrirModal( 1, "Debe escribir una marca y seleccionar un rubro" );
	}else{
		AJAX( "guardarMarca", function( rsp ) {
			rspBase(rsp);
			$("[name=tx_marca]").val("");
			$("[name=tx_rubro]").val("");
			$(".ui-select:first span").html("Elige uno...");
			verMarcas();
		}, datos );
	}
}
