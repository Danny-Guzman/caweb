jQuery( document ).ready( function($) {
	wp.customize( 'caweb_alert_banner_0', function( value ) {
		value.bind( function( newval ) {
			var obj = JSON.parse( newval );

			if( obj.remove ){
				$('header .alert-' + obj.alert ).remove();
				return false;
			}else{
				console.log( obj );
			}
		});
	});
});