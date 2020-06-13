verCredenciales();

function verCredenciales() {
	setTimeout( function() {
		$(".ui-page-active [name^=cred]").each(function() {
			var elemento 	= $(this);
				dato 		= elemento.attr('name').substring(5);

			AJAX( 'verCredenciales', function( rsp ) {
				var datos = rsp.datos,
					html = "";

				if( datos.length > 0 ){
						html += `<form><fieldset data-role="controlgroup" data-theme=a data-mini=true>`;
					if( datos[0]['co_simple_mult'] == 1 ){
						datos.map( function( val, idx ) {
							html += "<label><input name='cred-radio-"+val['co_tipo_credencial']+"' type=radio data-credencial="+val['co_credencial']+" onclick=onOffCredencial("+val['co_credencial']+")>"+val['tx_nombre']+"</label>";
						});
					}else{
						datos.map( function( val, idx ) {
							html += "<label><input name='cred-radio-"+val['co_tipo_credencial']+"' type=checkbox data-credencial="+val['co_credencial']+" onclick=onOffCredencial("+val['co_credencial']+")>"+val['tx_nombre']+"</label>";
						});
					}

					html += "</fieldset></form>";
					elemento.append( html ).enhanceWithin().ready(function() {
						if( elemento.attr('name') == 'cred-tvc' ){
							AJAX( 'checkCredenciales', checkCredencialesRSP, usuario );	
						}
					});
				}else{
					html += "<h4 class=text-center>No hay credenciales registradas para esta categoría.</h4>" ;
					elemento.append( html );
				}
			}, { id: dato, img: 0 } );
		})
	}, 500 );
}

function onOffCredencial( co_credencial ) {
	var datos = {
		co_usuario: usuario.co_usuario,
		co_credencial: co_credencial,
		onOff: $("[data-credencial="+co_credencial+"]")[0]['checked'],
		type: $("[data-credencial="+co_credencial+"]")[0]['type'],
	}
	AJAX( "onOffCredencial", onOffCredencialRSP, datos );
}

function onOffCredencialRSP( rsp ) {
	rspBaseV2( rsp );
	AJAX( 'checkCredenciales', checkCredencialesRSP, usuario );
}

function checkCredencialesRSP( rsp ) {
	rsp.datos.map( function( val, idx ) {
		var obj = $("[data-credencial="+val['co_credencial']+"]");
		obj.prop('checked',true).prev().addClass('ui-'+obj['0']['type']+'-on').removeClass('ui-'+obj['0']['type']+'-off');
	})
}