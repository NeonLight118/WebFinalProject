$(document).ready(function(){
	$.ajax({
		type:"GET",
		url:"projectXML13.xml",
		dataType:"xml",
		success: function(xml){
			$(xml).find('stationBeanList').each(function(index, element){

				var id = $(this).find('id').text();
				var city = $(this).find('stationName').attr('city');
				var stationName = $(this).find('stationName').text();
				var totalDocks = $(this).find('totalDocks').text();
				var latitude = $(this).find('latitude').text();
				var longitude = $(this).find('longitude').text();
				var statusValue = $(this).find('statusValue').text();
				var statusKey = $(this).find('statusKey').text();
				var availableBikes = $(this).find('availableBikes').text();
				var stationImg = $(this).find('stationImg').text();
				console.log("xml");
				$("<div data-role=\"collapsible\"></div>").html("<h3>"+stationName+"</h3><p>City: " + city + 
					"<br>ID: "+id+"<br> total Docks: "+totalDocks+"<br> Latitude: "+latitude+"<br> Longitude: "+longitude+
					"<br> Status Value: "+statusValue+"<br> Status Key: "+statusKey+"<br> Available Bikes: "+availableBikes+
					"<br> Thumbnail: <br><img src=\"images/"+stationImg+"\" height=\"100\" width=\"100\" class=\"clickimg\" /> <br>"+
					"<div class=\"ui-btn ui-input-btn ui-shadow\">Google Maps<input type=\"button\" data-corners=\"false\" data-enhanced=\"true\" value=\"Google Maps\" onclick=\"maps(" + 
					latitude + "," + longitude + "," + index + ")\"></input></div><div id=\"map_canvas" + index + 
					"\" style=\"height:400px; width:400px;\"></div></p>").appendTo("#set");
		
			});
			$('[data-role=collapsible]').collapsible();
		}
	});
	
	$("#set").on("click", "img.clickimg", function(){
		if ($(this).attr("height") < 200){
			$(this).attr("height", "500");
			$(this).attr("width", "500");
		}else{
			$(this).attr("height", "100");
			$(this).attr("width", "100");
		}
		
		});

		$('[data-role=collapsible]').collapsible();

	
	$.getJSON('member.json',function(data)
	{

		for (var i in data.members)
		{

			$('#sList').append(
			'<li class="ui-block-b">' +
			'<a href="#myPopup' + i + '" data-rel="popup" data-position-to="window" data-transition="fade"> <img id="s' + i + '" width="50" height="50" src="images/'+data.members[i].Spicture+'"></a>'+
			'</li>');

			$('body').append(

      '<div data-role="popup" id="myPopup' + i + '" data-overlay-theme="b" data-theme="a" data-tolerance="15,15" class="ui-content">' +
      		'<a href="#" data-role="button" data-icon="delete" data-iconpos="notext" data-rel="back" data-theme="a" class="ui-btn-right"></a>' +
			'Name: ' + data.members[i].name +
			"<br>Student Login Name : " + data.members[i].Slogin +
			"<br>Student Number :" + data.members[i].Snumber +
			'</a></div>');
			$('#myPopup' +i).popup();
			
		}

	});
});	

	function maps(lat,lon, index) 
	{
		console.log("maps");

			var LatLng = new google.maps.LatLng(lat,lon);
			drawMap(LatLng);
			
			function drawMap(latlng) {
        	var myOptions = {
            zoom: 20,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        	};

        	var map = new google.maps.Map(document.getElementById("map_canvas" + index), myOptions);

        	// Add an overlay to the map of current lat/lng
        	var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"

        });
    }
	}
