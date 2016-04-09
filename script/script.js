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
			"<br> Thumbnail: <br><img src=\"images/"+stationImg+"\" height=\"100\" width=\"100\" class=\"clickimg\" onclick=\"changeSize()\"/> <br>"+
			"<div class=\"ui-btn ui-input-btn ui-shadow\">Google Maps<input type=\"button\" data-corners=\"false\" data-enhanced=\"true\" value=\"Google Maps\" onclick=\"maps(" + 
			latitude + "," + longitude + "," + index + ")\"></input></div><div id=\"map_canvas" + index + 
			"\" style=\"height:400px; width:400px;\"></div></p>").appendTo("#set");
		
		});
		$('[data-role=collapsible]').collapsible();
		function changeSize(){
			console.log("click worked");
			$(this).animate({height: "500px"}, "slow");
		}
	}
	});
	
	$.getJSON('member.json',function(data)
	{
		console.log("json");
		var output = "";
		for (var i in data.members)
		{
			
			/*output += "<a href=\"#memberInfo\" data-rel=\"popup\"><img src=\"images/" + data.members[i].Spicture + "\" width=\"50\" height=\"50\" alt=\"\"/hspace=\"20\"></a><div data-role=\"popup\" id=\"memberInfo\"><p>name: "+data.members[i].name+"<p></div>";*/
			
		}
		$("#s1").attr('src', "images/"+data.members[0].Spicture) ;
		$("#s2").attr('src', "images/"+data.members[1].Spicture) ;

		document.getElementById("pic").innerHTML += output ;
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
    
	
	
	
	
	
