jQuery(document).ready(function() {

  if( ! args.ca_google_trans_enabled ){
    return;
  }
  var google_map_api_key = "&key=AIzaSyCtq3i8ME-Ab_slI2D8te0Uh2PuAQVqZuE";

  var google_map_url = "https://maps.googleapis.com/maps/api/geocode/json?";

  var newLoc;

  var displayCities = $('.located-city-name');

  navigator.geolocation.getCurrentPosition(successFunc);

  
  $('.geo-lookup').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);

    if(keycode == '13'){
      if( ! $(this).hasClass('collapsed') ){
        //$(this).focus();
      }else{
        //$('#locationSettings #locationZipCode').focus();
      }
    }
  });

  $('#locationSettings .close').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);

    if(keycode == '13'){
      //$('.geo-lookup').focus();
    }
  });



  $('.geo-lookup').on('click', function(e) {

    e.preventDefault();

    var currentCookie = getCookie("cagov__geo");

    if (currentCookie) {

      displayCities.html('Enter ZIP');

      errorCase();

      return;

    }

    errorCase();

  });

  function successFunc(pos) {

    newLoc = pos.coords.latitude + "," + pos.coords.longitude;

    displayCities.html('Geo Locating...');

    var ajax = $.get(google_map_url + "latlng=" + newLoc +

      google_map_api_key);

    ajax.done(dataSuccess);

  }

  function errorCase() {

    var windowWidth = $(window).width();

    // our mobile breakpoint

    if (windowWidth < 767) {

      $('html, body').animate({

        scrollTop: 0

      }, 450);

    }

    // Show a zipcode input
    $('#locationSettings').collapse('show');
    
    var $input = $("#locationSettings").find('input');

    var $btn = $("#locationSettings").find('button');

    var $close_btn = $("#locationSettings").find('button.close');

    // and we prepare our input for user events

    if( ! $('#locationSettings').hasClass('show') ){
      $input.focus();
    }else{
      $('.geo-lookup').focus();
    }
    
    $input.keypress(function(e) {

      if (e.which == 13) {

        lookByZIP.call(this, e);

        return false; //<---- Add this line

      }

    });

    $btn.on('click', function(e) {

      e.preventDefault();

      lookByZIP.call($input, e);

    });

    $close_btn.on('click', function(e) {
      $('.geo-lookup').focus();
    });
    
  }

  function lookByZIP(e) {

    var zip = $(this).val();

    displayCities.html('Geo Locating...');

    var ajax = $.get(google_map_url + "address=" + zip + google_map_api_key);

    ajax.done(dataSuccess);

    ajax.fail(function() {

      displayCities.html('Not Found');

    })

  }

  function dataSuccess(data) {

    var address_components = data.results[0];

    var city;

    var state;

    if( undefined !== address_components ){
      address_components = address_components.address_components;
    }else{
      console.log('Geolocator error: ' + data.error_message);
      return;
    }
    for (var i = 0; i < address_components.length; i++) {

      var types = address_components[i].types;

      if (-1 != types.indexOf('locality') && -1 != types.indexOf(

          'political') && city !== "") {

        city = address_components[i].short_name;

      }

      if (-1 != types.indexOf('political') && -1 != types.indexOf(

          'administrative_area_level_1') && state !== "") {

        state = address_components[i].short_name;

      }

    }

    displayCities.html(city + ", " + state);

  }

  function getCookie(sKey) {

    if (!sKey) {

      return null;

    }

    return decodeURIComponent(document.cookie.replace(new RegExp(

        "(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(

          /[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"),

      "$1")) || null;

  }

  function hasCookie(sKey) {

    if (!sKey) {

      return false;

    }

    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(

      /[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);

  }

} );
