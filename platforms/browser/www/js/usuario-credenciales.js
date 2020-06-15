$( function() {
	setTimeout( function() {
		AJAX( 'verCredencialesTodas', verCredencialesTodasRSP );
	}, 500 );
} )

function verCredencialesTodasRSP( rsp ){
	var datos = rsp.datos,
		obj = [0, "tdc","tdd","sem","sea","afs","afp","ine","ine","gim","soc","tbs","tem","aer","com","ans","tad","int","tvc"],
		techo = `<form ><fieldset data-role="controlgroup" data-theme=a data-mini=true>`;

	for( var i = 0; i < datos.length; i++ ){
		var html = "",
			targ,
			tc = datos[i]['co_tipo_credencial'],
			cc = datos[i]['co_credencial'];
		if( i == 0 ){
			html += techo;
		}else if(tc != datos[i-1]['co_tipo_credencial'] ){
			html += techo;
		}
		if( datos[i]['co_simple_mult'] == 1 ){
			html += "<label><input name='cred-radio-"+tc+"' type=radio data-credencial="+cc+" onclick=onOffCredencial("+cc+")>"+datos[i]['tx_nombre']+"</label>";
		}else{
			html += "<label><input name='cred-radio-"+tc+"' type=checkbox data-credencial="+cc+" onclick=onOffCredencial("+cc+")>"+datos[i]['tx_nombre']+"</label>";
		}

		if( i == 0 ){
			targ = `[name=cred-${obj[tc]}]`;
		}else if(tc != datos[i-1]['co_tipo_credencial'] ){
			targ = `[name=cred-${obj[tc]}]`;
		}else{
			targ = `[name=cred-${obj[tc]}] .ui-controlgroup-controls`;
		}
		
		$(targ).append(html).enhanceWithin();
		if( i == datos.length-1 ){
			AJAX( 'checkCredenciales', checkCredencialesRSP, JSON.parse( localStorage.getItem('usuario' )) );
			$("div[name^='cred-']").each(function() {
				if( !$(this).find('form').length ){
					var html = "<h4 class=text-center>No hay credenciales registradas para esta categoría.</h4>" ;
					$(this).html(html)
				}
				
			})
			
		}
	}
}

function onOffCredencial( co_credencial ) {
	var datos = {
		co_usuario: JSON.parse( localStorage.getItem('usuario' ))['co_usuario'],
		co_credencial: co_credencial,
		onOff: $("[data-credencial="+co_credencial+"]")[0]['checked'],
		type: $("[data-credencial="+co_credencial+"]")[0]['type'],
	}
	AJAX( "onOffCredencial", onOffCredencialRSP, datos );
}

function onOffCredencialRSP( rsp ) {
	rspBaseV2( rsp );
	AJAX( 'checkCredenciales', checkCredencialesRSP, JSON.parse( localStorage.getItem('usuario' )) );
}

function checkCredencialesRSP( rsp ) {
	rsp.datos.map( function( val, idx ) {
		var obj = $("[data-credencial="+val['co_credencial']+"]");
		obj.prop('checked',true).prev().addClass('ui-'+obj['0']['type']+'-on').removeClass('ui-'+obj['0']['type']+'-off');
	})
}