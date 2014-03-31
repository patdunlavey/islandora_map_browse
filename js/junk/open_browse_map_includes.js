Drupal.behaviors.islandora_solr_config = function (context) {
    var map;
    initialize();

};

function initialize() {

    //Here is where the variables are passed to the javascript
    var centre = Drupal.settings.islandora_solr_config_settings.centre;
    var centreLocation = getPosition(centre);
    var pins = Drupal.settings.islandora_solr_config_settings_pins;
    var raw = Drupal.settings.islandora_solr_config_settings_raw;

    var mapOptions = {
        //center: new google.maps.LatLng(coordinatesLat, coordinatesLong),
        center: centreLocation,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
			      mapOptions);



    function getPosition(loc){
        var commaPos = loc.indexOf(',');
        var coordinatesLat = parseFloat(loc.substring(0, commaPos));
        var coordinatesLong = parseFloat(loc.substring(commaPos + 1, loc.length));
        var myLatlng = new google.maps.LatLng(coordinatesLat, coordinatesLong);
        
        return myLatlng;
    }


    var Manager;
    var doc;
    
    (function ($) {
	$(function () {
		Manager = new AjaxSolr.Manager({
			solrUrl: 'http://islandorasev-dev.usask.ca:8080/solr/'
		    });
		Manager.addWidget(new AjaxSolr.ResultWidget({
		id: 'result',
		    target: '#map_canvas',
		    }));
		Manager.init();
		Manager.store.addByValue('q', '*:*')
		Manager.store.addByValue('fq', '{!geofilt}');
		Manager.store.addByValue('sfield', 'mods_coordinates_p');
		Manager.store.addByValue('pt', '52.11679,-106.63452');
		Manager.store.addByValue('d', '500');
		Manager.store.addByValue('rows', '100');
		//q=*:*&fq={!geofilt}&sfield=mods_coordinates_p&pt=52.11679,-106.63452&d=50
		Manager.doRequest();
	    });
    })(jQuery);

}