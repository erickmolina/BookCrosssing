angular.module('myApp', []).controller('MapCtrl', function ($scope,$http) {
	
	if(!localStorage.iduser || !localStorage.nameuser){
		window.location.href="index.html";
	}
	function mostrarUbicacion(){
		navigator.geolocation.getCurrentPosition( lecturaGPS , errorGPS , {enableHighAccuracy:true} ) ; 
	}
  
	function lecturaGPS(ubicacion){
	  
	  var miubicacion = new google.maps.LatLng(ubicacion.coords.latitude, ubicacion.coords.longitude);
	  
	   $scope.map.setCenter(miubicacion);
	  
	}
  
	function errorGPS(){
	  alert("Error GPS");
	}
	
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(9.93,-84.07),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: true,
		zoomControl: true,
		scaleControl: true,
		navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL},
	}
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    $scope.markers = [];
	
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (info){
        var marker = new google.maps.Marker({
            map: $scope.map,
			icon:"img/marker_icon.png",
            position: new google.maps.LatLng(info.LLatitud, info.LLongitud),
            title: info.NombreLibro
        });
        marker.content = '<div class="infoWindowContent">' +"Genero: "+ info.Categoria + '</div>';
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);      
    } 
	$http({
		method: 'GET', 
		url:' http://bookcrossing-electivamoviles.rhcloud.com/getFreeBooks',
		params: {books : "all"}}).
		success(function(data, status, headers, config) {
			console.log(data);
			for (i = 0; i < data.length; i++){
				createMarker(data[i]);
			}
			mostrarUbicacion();
		}).
		error(function(data, status, headers, config) {
			console.log(data);	
		});

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
});