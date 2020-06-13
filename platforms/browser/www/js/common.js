const colores = [
	'red', 'orange', 'yellow',
	'green', 'lime',
	'aqua','light-blue', 'blue', 'navy',
	'purple', 'fuchsia', 'maroon',
];

function crearPaleta( selector, color, element = 0 ){
	var color 		= color == 0 ? 0 : Math.floor( Math.random() * 7 ),
		largo 		= $(selector).length
		element 	= element;
		
	for( var i = element, j = color; j < colores.length ; j++ ){
		if( i == largo ){break;}
		$(selector+":nth("+i+")").addClass("text-"+colores[j]);
		i++;
	}

	if( i < largo ){
		crearPaleta( selector, 0, i );
	}
}

function closeSession(){
	$( "body" ).pagecontainer( "change", "../../index.html");
}