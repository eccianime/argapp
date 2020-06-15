$(function() {
	AJAX( "verRubros", verRubrosRSP );
	crearPaleta('.benef-navbar li a');
	verCuponesRSP();
	mostrarAviso()
})

function mostrarAviso( ) {
	var html = `<div class='info-box bg-orange text-white text-bold'>
				<div class='row middle-xs between-xs'>
					<div class='col-xs-3'><h1 class='text-center'><i class='la la-bell la-3x'></i></h1></div>
					<div class='col-xs-9'>
    					<p style='text-align: justify; margin: 0; font-size: 20px;'>¿Querés ver las ofertas que tenés con tus tarjetas? <a class="text-white" href='pages/usuario/login.html'>Haz clic aquí</a></p>
					</div>
				</div>        
			</div>`;
	setTimeout(function() {
		$(".ui-page-active .ui-content").prepend(html);
	}, 3000);
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
	var html = `<table class='table table-borderless table-condensed'><tr>`;
		/*datos.map( function( val, idx ) {
			var logo = val['img_logo'] != null ? val['img_logo'] : "../../img/interroga.png";
			html += "<td><img class='img-circle' width=80px src='"+logo+"' /></td>"
		} )*/
		html += "<td><img class='img-circle' width=80px src='img/interroga.png' /></td>";
		html += "<td><img class='img-circle' width=80px src='img/interroga.png' /></td>";
		html += "<td><img class='img-circle' width=80px src='img/interroga.png' /></td>";
		html += "<td><img class='img-circle' width=80px src='img/interroga.png' /></td>";
		html += "<td><img class='img-circle' width=80px src='img/interroga.png' /></td>";
		html += "<td><img class='img-circle' width=80px src='img/interroga.png' /></td>";
		html += "<td><img class='img-circle' width=80px src='img/interroga.png' /></td>";
		html += "</tr></table>";
		$("#listaDescuentos").empty().append(html);
}