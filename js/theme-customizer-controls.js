/* CAWeb Icon Menu Javascript */
jQuery(document).ready(function($) {
	$(document).on('click', '.caweb-icon-menu li', function(e){cawebIconSelected(this);});
	$(document).on('click', '.caweb-icon-menu-header .resetIcon', function(e){ resetIconSelect($(this).parent().next());});

	function cawebIconSelected(iconLi){
		resetIconSelect($(iconLi).parent(), false);
		$(iconLi).addClass('active');

		var i = $(iconLi).parent().find('input');

		if (i.length){
			$(i).val($(iconLi).attr('title'));
			$(i).trigger('input');
		}
	}

	function resetIconSelect(iconList, event_trigger = true){
		var icon_list = $(iconList).find('LI');
		
		for(o = 0; o < icon_list.length - 1; o++){
			$(icon_list[o]).removeClass('active');
		}

		var i = $(iconList).find('input');

		if (i.length){
			$(i).val('');
			if( event_trigger ){
				$(i).trigger('input');
			}
		}
	}
	
});
  

// Toggle CSS Colorscheme Options
jQuery( document ).ready( function($) {
	$('select[id$="ca_site_version"]').on("change", correct_colorscheme_visibility );

	function correct_colorscheme_visibility(){
		var color_scheme_picker = $('select[id$="ca_site_color_scheme"]');
		var current_color = color_scheme_picker.val();
		var new_colors = caweb_admin_args.caweb_colorschemes[$(this).val()];

		color_scheme_picker.empty();

		$.each(new_colors, function(i, ele){
			var o = document.createElement( 'OPTION' );

			$(o).val( i );
			$(o).html( ele.displayname );

			if( i === current_color ){
				$(o).attr('selected', 'selected');
			}

			color_scheme_picker.append( o );
		});

	}

});
jQuery( document ).ready( function($) {
	$('#_customize-input-caweb_add_alert_banner').click( add_alert_banner);
	$('.caweb-toggle-alert').click( toggle_alert );
	$('.caweb-remove-alert').click( remove_alert );
	$('li[id^="customize-control-caweb_alert_banner_"] input').on( 'input', capture_change_event );
	$('li[id^="customize-control-caweb_alert_banner_"] textarea').on( 'input', capture_change_event );
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
		var new_li = $(this).parent().next().clone();
		var alert_toggle = $(new_li).find('#caweb-toggle-alert');
		var alert_status = $(new_li).find('input[name^="alert-status-"]');
		var alert_remove = $(new_li).find('.caweb-remove-alert');

		$(new_li).attr('id', '');

		$(alert_toggle).on( 'click', toggle_alert );
		$(alert_remove).on( 'click', remove_alert );

		$(alert_status).attr('data-toggle', 'toggle');
		$(alert_status).attr('data-size', 'sm');

		$(alert_list).append( $(new_li) );

		$(alert_status).bootstrapToggle({
			onstyle: 'success',
		});

		//wp.editor.initialize("alertmessage-" + alertCount, caweb_admin_args.tinymce_settings);
		
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