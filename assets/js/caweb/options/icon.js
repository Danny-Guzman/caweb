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
  
