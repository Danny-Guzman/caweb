jQuery( document ).ready( function($) {
	$('#_customize-input-caweb_add_alert_banner').click( add_alert_banner);
	
	$('.caweb-toggle-alert').click( toggle_alert );
	$('.caweb-remove-alert').click( remove_alert );
	$('.customize-control-alert_banner input').on( 'input', capture_change_event );
	$('.customize-control-alert_banner input[name^="alert-status-"]').on( 'change', capture_change_event );
	$('.customize-control-alert_banner textarea').on( 'input', capture_change_event );
	$('.toggle-read-more-options').on( 'input', toggle_read_more_options );

	function toggle_read_more_options(){
		var alert_id = $(this).attr('name').replace('alert-read-more-', '');

		if( $(this).prop('checked') ){
			$('#alert-read-more-options-' + alert_id ).collapse('show');
		}else{
			$('#alert-read-more-options-' + alert_id ).collapse('hide');
		}
	}

	function capture_change_event(){

		if( undefined !== $(this).attr('data-alert') ){
			var alert_id = $(this).attr('data-alert').replace('caweb_alert_banner_', '');
			var obj = {
				'alert' : alert_id,
				'status' : $('input[name="alert-status-' + alert_id + '"]').prop('checked'),
				'header' : $('input[name="alert-header-' + alert_id + '"]').val(),
				'message' : $('textarea[name="alert-message-' + alert_id + '"]').val(),
				'display_on' : $('input[name="alert-display-' + alert_id +'"]:checked').val(),
				'banner_color' : $('input[name="alert-banner-color-' + alert_id + '"]').val(),
				'read_more' : $('input[name="alert-read-more-' + alert_id + '"]').prop('checked'),
				'read_more_text' : $('input[name="alert-read-more-text-' + alert_id + '"]').val(),
				'read_more_url' : $('input[name="alert-read-more-url-' + alert_id + '"]').val(),
				'read_more_target' : $('input[name="alert-read-more-target-' + alert_id + '"]').prop('checked'),
				'icon' : $('input[name="alert-icon-' + alert_id + '"]').val(),
			};

			$('input#' + $(this).attr('data-alert') ).val( JSON.stringify( obj ) );
			$('input#' + $(this).attr('data-alert') ).trigger('change');
		}
	}

	function add_alert_banner(){
		var alert_list = $(this).parent().parent();
		var alert_count = $(alert_list).children().length - 2;
		var alert_identifier = 'caweb_alert_banner_' + alert_count;

		var new_li = $(this).parent().next().clone();
		var alert_toggle = $(new_li).find('.caweb-toggle-alert');
		var alert_status = $(new_li).find('input[name^="alert-status-"]');
		var alert_remove = $(new_li).find('.caweb-remove-alert');
		var alert_read_more = $(new_li).find('.toggle-read-more-options');

		$(new_li).attr('id', 'customize-control-' + alert_identifier );

		$(alert_status).attr('data-toggle', 'toggle');
		$(alert_status).attr('data-size', 'sm');

		$(alert_toggle).on( 'click', toggle_alert );
		$(alert_toggle).attr( 'data-target', $(alert_toggle).attr('data-target').replace('sample', alert_count ) );

		$(alert_remove).on( 'click', remove_alert );
		$(alert_remove).attr( 'data-alert', $(alert_remove).attr('data-alert').replace('sample', alert_count ) );

		$(alert_read_more).on( 'input', toggle_read_more_options );

		$(new_li).find('input').on( 'input', capture_change_event );

		$.each( $(new_li).find('input'), function(){
			$(this).attr('id', $(this).attr('id').replace('sample', alert_count ) );
			$(this).attr('name', $(this).attr('name').replace('sample', alert_count ) );

			if( undefined !== $(this).attr( 'data-customize-setting-link' ) ){
				$(this).attr( 'data-customize-setting-link', $(this).attr('data-customize-setting-link').replace('sample', alert_count ) )
				$(this).val( '' );
			}else if( undefined !== $(this).attr( 'data-alert' ) ){
				$(this).attr( 'data-alert', $(this).attr('data-alert').replace('sample', alert_count ) )
			}
		});
		
		$.each( $(new_li).find('textarea'), function(){
			$(this).attr('id', $(this).attr('id').replace('sample', alert_count ) );
			$(this).attr('name', $(this).attr('name').replace('sample', alert_count ) );
			$(this).attr( 'data-alert', $(this).attr('data-alert').replace('sample', alert_count ) )
		});

		$.each( $(new_li).find('label[for$="sample"]'), function(){
			$(this).attr('for', $(this).attr('for').replace('sample', alert_count ) );
		});

		$.each( $(new_li).find('div[id$="sample"]'), function(){
			$(this).attr('id', $(this).attr('id').replace('sample', alert_count ) );
		});

		$(new_li).find('input[name^="alert-status-"]').on( 'change', capture_change_event );
		$(new_li).find('textarea').on( 'input', capture_change_event );


		$(alert_status).bootstrapToggle({
			onstyle: 'success',
			size: 'sm',
		});

		$(alert_list).append( $(new_li) );
		/*
		$(this).val(alert_count);
		$(this).trigger('change');

		setTimeout(function(){
			$(alert_list).append( $(new_li) );
		}, 500 );
		*/
		
		//wp.editor.initialize("alertmessage-" + alertCount, caweb_admin_args.tinymce_settings);

		//$(this).val('New Banner');

	}

	function toggle_alert(){
		$( '#' + $(this).attr('data-target') ).collapse('toggle');
		$(this).find('span').toggleClass('dashicons-arrow-right');
	}

	function remove_alert( e ){
		e.preventDefault();
		var r = confirm("Are you sure you want to remove this alert? This can not be undone.");
	  
		if (r == true) {
			var alert_id = $(this).attr('data-alert').replace('caweb_alert_banner_', '');
			var obj = {
				'alert' : alert_id,
				'remove': true
			};

			$('input#' + $(this).attr('data-alert') ).val( JSON.stringify( obj ) );
			$('input#' + $(this).attr('data-alert') ).trigger('change');
			$(this).parent().attr('id','customize-control-caweb_alert_banner_sample');
		}
	}

});