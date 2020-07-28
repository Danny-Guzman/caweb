jQuery( document ).ready( function($) {
	
	wp.customize( 'caweb_add_alert_banner', function( alert_id ) {
		alert_id.bind( function( id ) {
			console.log('caweb_alert_banner_' + id );
		});
	});

	wp.customize( 'caweb_alert_banner_1', function( value ) {
		value.bind( function( newval ) {
			console.log( newval );
		});
	});
});

