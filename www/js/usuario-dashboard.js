AJAX( "verRubros", verRubrosRSP );
crearPaleta('.benef-navbar li a');
verCuponesRSP();

AJAX( "checkCredenciales", checkCredencialesRSP, usuario );
var usr = usuario.tx_nombres.indexOf(" ") > 0 ? usuario.tx_nombres.substring(0,usuario.tx_nombres.indexOf(" ") ) : usuario.tx_nombres;
$("#tx_nombres").html( usr );

function checkCredencialesRSP( rsp ) {
	var datos = rsp.datos,
		filas = rsp.filas,
		html = "",
		html2 = "";

	if( filas > 0 ){
		html += `<table class='table table-borderless'><tr>`;
		datos.map( function( val, idx ) {
			var logo = val['img_logo'] != null ? val['img_logo'] : "../../img/interroga.png";
			html += "<td><img width=80px src='"+logo+"' /></td>"
		} )
		html += "</tr></table>";
		$("#listaCredenciales").empty().append(html);
	}else{
		html2 += "<table class='table table-borderless'><tr><td class=text-center>Usted no tiene credenciales registradas</td></tr></table>";
		$("#listaCredenciales").empty().append(html2);

		html += `<div class='warning-box bg-yellow text-white'>
					<div class='row middle-xs between-xs'>
    					<div class='col-xs-3'><h1 class='text-center'><i class='la la-warning la-3x'></i></h1></div>
    					<div class='col-xs-9'>
        					<p style='text-align: justify;'> Detectamos que aún no has registrado tus credenciales. 
        					Son importantes para saber qué descuentos ofrecerte. Haz clic en el botón abajo para registrarlas.
        					</p>
    					</div>
    					<div class='col-xs-12'>
    						<a href='registro-credenciales.html' class='ui-btn bg-green text-white'>Registrar Credenciales</a>
    					</div>
					</div>        
				</div>`;
		setTimeout(function() {
			$(".warning-box").remove();
			$(".ui-page-active .ui-content").prepend(html);
		}, 500);
	}
}

function verRubrosRSP ( rsp ){
	var datos 	= rsp.datos,
		html 	= "";

	if( datos.length > 0 ){
		datos.map( function( val, idx ) {
			var display = idx < 6 ? "" : "extra-elements";
			html += "<div class='box col-xs-6 col-sm-4 "+display+"'><label><input type='radio' name='radio-rubro' value="+val['co_rubro']+">"+val['tx_rubro']+"</label></div>";
		});

		html += "<div class='col-xs-12 text-center row center-xs'><a href=# class='col-xs-6 col-sm-3 ui-btn ui-mini bg-green text-white' name=verMasMenos>Ver Más</a></div>"

		$("#listaRubros")
			.empty()
			.append(html)
			.enhanceWithin()
			.ready( function() {
				var text = "Más",
					display = "none";
				$("#listaRubros [name=verMasMenos]").click( function () {
					text = text == "Más" ? "Menos" : "Más";
					$(this).html("Ver "+text);
					if(display == "none" ){
						display = "block";
						$("#listaRubros .extra-elements").slideDown("slow");
					}else{
						display = "none";
						$("#listaRubros .extra-elements").slideUp("slow");	
					}
				})

			crearPaleta('#listaRubros label');
		})
	}else{
		$("#listaRubros").html("<div class='box col-xs-12'><p>No hay rubros disponibles.</p></div>")
	}
}

function verCuponesRSP(){
	var html = `<table class='table table-borderless'><tr>`;
		/*datos.map( function( val, idx ) {
			var logo = val['img_logo'] != null ? val['img_logo'] : "../../img/interroga.png";
			html += "<td><img width=80px src='"+logo+"' /></td>"
		} )*/
		html += "<td><img width=80px src='../../img/interroga.png' /></td>";
		html += "<td><img width=80px src='../../img/interroga.png' /></td>";
		html += "<td><img width=80px src='../../img/interroga.png' /></td>";
		html += "<td><img width=80px src='../../img/interroga.png' /></td>";
		html += "<td><img width=80px src='../../img/interroga.png' /></td>";
		html += "<td><img width=80px src='../../img/interroga.png' /></td>";
		html += "<td><img width=80px src='../../img/interroga.png' /></td>";
		html += "</tr></table>";
		$("#listaDescuentos").empty().append(html);
}