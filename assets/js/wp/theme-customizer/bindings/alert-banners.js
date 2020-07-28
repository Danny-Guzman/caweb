jQuery( document ).ready( function($) {
	
	wp.customize( 'caweb_add_alert_banner', function( alert_id ) {
		alert_id.bind( function( id ) {
			console.log('caweb_alert_banner_' + id );
		});
	});

	for( var a = 1; a < 20; a++){
		wp.customize( 'caweb_alert_banner_' + a, function( value ) {
			value.bind( function( newval ) {
				var obj = JSON.parse( newval );
				
				
				if( obj.alert ){
					var alert = $( 'header .alert-' + obj.alert );
					var alert_level = alert.find('.alert-level');
					var alert_icon = alert_level.find('span');
					var alert_link = alert.find('.alert-link');
					var alert_msg = alert.find('.alert-text');

					// Alert Status
					if( obj.status ){
						alert.removeClass('hidden');
					}else{
						alert.addClass('hidden');
					}

					// Alert Banner Color
					alert.css('background-color', obj.banner_color );

					// Alert Level ( Icon & Header )
					alert_level.empty();
					alert_icon.removeClass();
					
					if( obj.icon.trim() ){
						alert_icon.addClass('ca-gov-icon-' + obj.icon );
					}

					alert_level.append(alert_icon);
					alert_level.append(obj.header);

					// Alert Message
					alert_msg.html( obj.message );

					// Read More Button
					if( obj.read_more && obj.read_more_text.trim() && obj.read_more_url.trim() ){
						alert_link.removeClass('hidden');
					}else{
						alert_link.addClass('hidden');
					}

					alert_link.html( obj.read_more_text );
					alert_link.attr( 'href', obj.read_more_url );

					if( obj.read_more_target ){
						alert_link.attr( 'target', '_blank' );
					}else{
						alert_link.attr( 'target', '_self' );
					}

				}
			});
		});
	}
});

